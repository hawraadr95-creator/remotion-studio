"""Generate the Arabic female voiceover for the IVF explainer with Google Cloud Text-to-Speech,
one clip per caption chunk, then write:
  public/ivf/voiceover.mp3                     – the full narration
  src/compositions/ivf/vo-timings.json         – exact start/end (seconds) of each caption chunk

The composition reads vo-timings.json, so captions and scene lengths follow the real voice.

Usage:
  python3 scripts/make_ivf_voiceover.py [voice_name] [speaking_rate]
  e.g. python3 scripts/make_ivf_voiceover.py ar-XA-Wavenet-D 0.92

The API key is injected by the session proxy for texttospeech.googleapis.com,
so a placeholder key is sent here.
"""
import base64, json, os, re, subprocess, sys, tempfile, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT_TS = os.path.join(ROOT, 'src/compositions/ivf/script.ts')
OUT_MP3 = os.path.join(ROOT, 'public/ivf/voiceover.mp3')
OUT_JSON = os.path.join(ROOT, 'src/compositions/ivf/vo-timings.json')

voice = sys.argv[1] if len(sys.argv) > 1 else 'ar-XA-Wavenet-D'
rate = float(sys.argv[2]) if len(sys.argv) > 2 else 0.92
key = os.environ.get('GOOGLE_TTS_KEY', 'placeholder')

# --- parse segments/captions from script.ts (keeps one source of truth) ---
src = open(SCRIPT_TS, encoding='utf-8').read()
segments = []
for m in re.finditer(r"id:\s*'(\w+)',\s*seconds:\s*([\d.]+),\s*captions:\s*\[(.*?)\]", src, re.S):
    caps = re.findall(r"'([^']*)'", m.group(3))
    segments.append({'id': m.group(1), 'seconds': float(m.group(2)), 'captions': caps})
assert segments, 'no segments parsed'


def spoken(text: str) -> str:
    # read Latin abbreviations naturally
    t = text.replace('(IVF)', 'آي في إف').replace('(IUI)', 'آي يو آي').replace('(ICSI)', 'إكسي')
    return t.replace('(', '').replace(')', '')


def synth(text: str, path: str):
    body = {
        'input': {'text': spoken(text)},
        'voice': {'languageCode': 'ar-XA', 'name': voice},
        'audioConfig': {'audioEncoding': 'LINEAR16', 'sampleRateHertz': 44100, 'speakingRate': rate, 'pitch': 0},
    }
    req = urllib.request.Request(
        f'https://texttospeech.googleapis.com/v1/text:synthesize?key={key}',
        data=json.dumps(body).encode(),
        headers={'Content-Type': 'application/json'},
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        audio = base64.b64decode(json.loads(r.read())['audioContent'])
    open(path, 'wb').write(audio)


def duration(path: str) -> float:
    out = subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path])
    return float(out.strip())


tmp = tempfile.mkdtemp()
GAP_CHUNK = 0.25   # pause between chunks inside a scene
LEAD = 0.35        # silence at the start of each scene
TAIL = 0.45        # breathing room at end of each scene

timeline = []
concat = []
t = 0.0
k = 0
for s in segments:
    seg_start = t
    cursor = t + LEAD
    chunks = []
    for c in s['captions']:
        wav = os.path.join(tmp, f'{k:03d}.wav')
        synth(c, wav)
        d = duration(wav)
        chunks.append({'text': c, 'start': round(cursor, 3), 'end': round(cursor + d, 3), 'file': wav})
        cursor += d + GAP_CHUNK
        k += 1
    seg_len = max(s['seconds'], cursor - GAP_CHUNK + TAIL - seg_start)
    timeline.append({'id': s['id'], 'start': round(seg_start, 3), 'seconds': round(seg_len, 3),
                     'chunks': [{kk: v for kk, v in ch.items() if kk != 'file'} for ch in chunks]})
    for ch in chunks:
        concat.append((ch['start'], ch['file']))
    t = seg_start + seg_len

total = t
# --- place clips on a silent bed with ffmpeg adelay ---
inputs, filters, labels = [], [], []
for i, (start, f) in enumerate(concat):
    inputs += ['-i', f]
    ms = int(start * 1000)
    filters.append(f'[{i}:a]adelay={ms}|{ms}[a{i}]')
    labels.append(f'[a{i}]')
filters.append(f"{''.join(labels)}amix=inputs={len(labels)}:normalize=0,apad=whole_dur={total:.3f}[out]")
subprocess.check_call(['ffmpeg', '-loglevel', 'error', '-y', *inputs, '-filter_complex', ';'.join(filters),
                       '-map', '[out]', '-ac', '2', '-b:a', '192k', OUT_MP3])

json.dump({'voice': voice, 'rate': rate, 'total': round(total, 3), 'segments': timeline},
          open(OUT_JSON, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'voiceover: {OUT_MP3} ({total:.1f}s), timings: {OUT_JSON}')
