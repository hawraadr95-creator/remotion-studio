"""Synthesise a calm, royalty-free ambient piano/pad bed for the IVF explainer.
Usage: python3 scripts/make_ivf_music.py public/ivf/music.wav 92
"""
import sys, wave
import numpy as np

out = sys.argv[1]
dur = float(sys.argv[2]) if len(sys.argv) > 2 else 92.0
sr = 44100
n = int(sr * dur)
t = np.arange(n) / sr
rng = np.random.default_rng(7)

def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)

# Dmaj7 – Bm9 – Gmaj7 – A(add9)/C#  (warm, hopeful), 8 s per chord
prog = [
    [50, 57, 61, 64, 66],
    [47, 54, 57, 61, 62],
    [43, 50, 54, 57, 62],
    [49, 57, 59, 61, 64],
]
bar = 8.0
pad = np.zeros(n)
for ci in range(int(np.ceil(dur / bar))):
    chord = prog[ci % len(prog)]
    s0 = ci * bar
    seg = (t >= s0 - 1.5) & (t < s0 + bar + 1.5)
    tt = t[seg] - s0
    env = np.clip((tt + 1.5) / 2.5, 0, 1) * np.clip((bar + 1.5 - tt) / 2.5, 0, 1)
    for m in chord:
        f = midi(m)
        for det in (-0.12, 0.0, 0.12):
            ff = f * 2 ** (det / 12)
            pad[seg] += env * (np.sin(2 * np.pi * ff * tt + rng.random() * 6) + 0.25 * np.sin(4 * np.pi * ff * tt)) / 18

# soft piano-like plucks (arpeggio), sparse
notes = np.zeros(n)
for ci in range(int(np.ceil(dur / bar))):
    chord = prog[ci % len(prog)]
    arp = [chord[2] + 12, chord[3] + 12, chord[4] + 12, chord[3] + 12]
    for k, m in enumerate(arp):
        st = ci * bar + k * 2.0 + 0.25
        if st >= dur:
            continue
        i0 = int(st * sr)
        L = min(int(3.5 * sr), n - i0)
        tt = np.arange(L) / sr
        f = midi(m)
        env = np.exp(-tt * 1.6) * np.clip(tt / 0.01, 0, 1)
        tone = np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(4 * np.pi * f * tt) * np.exp(-tt * 3) + 0.12 * np.sin(6 * np.pi * f * tt) * np.exp(-tt * 5)
        notes[i0:i0 + L] += 0.16 * env * tone

# low warm drone
drone = 0.05 * np.sin(2 * np.pi * midi(38) * t) * (0.7 + 0.3 * np.sin(2 * np.pi * t / 16))

dry = pad * 0.9 + notes + drone

# simple lowpass (one-pole) to soften
def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / sr)
    y = np.empty_like(x)
    acc = 0.0
    # vectorised via cumulative filter approximation in blocks
    from itertools import accumulate
    y = np.fromiter(accumulate(x, lambda p, v: a * p + (1 - a) * v), dtype=float, count=len(x))
    return y

dry = lowpass(dry, 4500)

# reverb: FFT convolution with exponentially decaying noise IR
ir_len = int(3.2 * sr)
it = np.arange(ir_len) / sr
ir = rng.standard_normal(ir_len) * np.exp(-it * 2.2)
ir = lowpass(ir, 3000)
ir /= np.sqrt(np.sum(ir ** 2))
N = 1
while N < n + ir_len:
    N *= 2
wet = np.fft.irfft(np.fft.rfft(dry, N) * np.fft.rfft(ir, N), N)[:n]
mix = 0.65 * dry + 0.55 * wet

# fades + normalise
fade = np.clip(t / 2.0, 0, 1) * np.clip((dur - t) / 4.0, 0, 1)
mix *= fade
mix /= np.max(np.abs(mix)) + 1e-9
mix *= 0.7
stereo = np.stack([mix, np.roll(mix, int(0.012 * sr))], axis=1)
pcm = (stereo * 32767).astype(np.int16)
with wave.open(out, 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(sr)
    w.writeframes(pcm.tobytes())
print('wrote', out, dur, 's')
