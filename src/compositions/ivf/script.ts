// Narration script + timeline for the IVF explainer.
// Each segment = one scene. Captions are split into chunks and timed by word count.
// When a recorded voiceover is added, adjust `seconds` (or set chunk timings) to match it.

export const FPS = 30;

export type Segment = {
	id: string;
	seconds: number;
	captions: string[];
};

export const SEGMENTS: Segment[] = [
	{
		id: 'hook',
		seconds: 6,
		captions: ['هل تعرفين كيف يمكن أن يبدأ الحمل', 'خارج جسم المرأة؟'],
	},
	{
		id: 'what',
		seconds: 11,
		captions: [
			'أطفال الأنابيب (IVF) إجراء طبي تُخصَّب فيه البويضة في المختبر،',
			'ثم يُنقل الجنين إلى الرحم.',
			'وهو يختلف عن التلقيح داخل الرحم (IUI)،',
			'الذي يتم فيه الإخصاب داخل الجسم.',
		],
	},
	{
		id: 'stim',
		seconds: 9.5,
		captions: ['أولًا: تنشيط المبايض بأدوية هرمونية لعدة أيام', 'لتنمو عدة حويصلات،', 'مع متابعة بالسونار وتحاليل الدم.'],
	},
	{
		id: 'retrieval',
		seconds: 8.5,
		captions: ['ثانيًا: سحب البويضات بإبرة دقيقة موجّهة بالسونار،', 'تحت التخدير أو التسكين المناسب.'],
	},
	{
		id: 'fert',
		seconds: 11,
		captions: [
			'ثالثًا: الإخصاب في المختبر.',
			'وعند الحاجة، يُحقن حيوان منوي واحد داخل كل بويضة ناضجة',
			'بتقنية الحقن المجهري (ICSI).',
		],
	},
	{
		id: 'embryo',
		seconds: 11,
		captions: [
			'رابعًا: تُراقَب الأجنة وهي تنقسم يومًا بعد يوم،',
			'حتى تصل إلى مرحلة الكيسة الأريمية',
			'في اليوم الخامس أو السادس.',
		],
	},
	{
		id: 'transfer',
		seconds: 10,
		captions: [
			'خامسًا: يُرجَع الجنين إلى تجويف الرحم بقسطرة رفيعة،',
			'وغالبًا دون تخدير.',
			'ثم يُجرى اختبار الحمل بعد نحو أسبوعين.',
		],
	},
	{
		id: 'myth',
		seconds: 8,
		captions: ['من الشائع خطأً أن الطفل ينمو في أنبوب،', 'والحقيقة أن الحمل يستمر داخل الرحم بعد نقل الجنين.'],
	},
	{
		id: 'factors',
		seconds: 8,
		captions: ['تختلف فرص النجاح حسب العمر وسبب العقم', 'وجودة البويضات والأجنة،', 'لذلك لا يمكن ضمان النتيجة.'],
	},
	{
		id: 'end',
		seconds: 7,
		captions: ['كل رحلة علاج تبدأ بالأمل،', 'والتقييم الصحيح هو أول خطوة.'],
	},
];

export type TimedSegment = Segment & {from: number; dur: number};

export const TIMELINE: TimedSegment[] = (() => {
	let t = 0;
	return SEGMENTS.map((s) => {
		const dur = Math.round(s.seconds * FPS);
		const seg = {...s, from: t, dur};
		t += dur;
		return seg;
	});
})();

export const IVF_DURATION = TIMELINE.reduce((a, s) => a + s.dur, 0);

export const seg = (id: string) => {
	const s = TIMELINE.find((x) => x.id === id);
	if (!s) throw new Error(`segment ${id}`);
	return s;
};

// Split segment duration across caption chunks proportionally to word count.
export const captionTimings = (s: TimedSegment) => {
	const lead = 6; // frames before first caption
	const tail = 8;
	const avail = s.dur - lead - tail;
	const words = s.captions.map((c) => c.split(/\s+/).length);
	const total = words.reduce((a, b) => a + b, 0);
	let t = s.from + lead;
	return s.captions.map((text, i) => {
		const d = Math.round((words[i] / total) * avail);
		const item = {text, from: t, to: t + d};
		t += d;
		return item;
	});
};
