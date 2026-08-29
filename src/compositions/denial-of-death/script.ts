// Timing derived from the provided narration SRT, converted to frames at 30fps.
// Each scene's line `start`/`end` are frame offsets relative to that scene's own Sequence.

export type ScriptLine = {
	text: string;
	start: number;
	end: number;
	highlight?: string[];
};

export type SceneId =
	| 'hook'
	| 'deathBook'
	| 'awareness'
	| 'invention'
	| 'chase'
	| 'legacy'
	| 'immortality'
	| 'paradox'
	| 'live';

export type SceneMeta = {
	id: SceneId;
	from: number;
	durationInFrames: number;
	lines: ScriptLine[];
};

export const FPS = 30;

export const scenes: SceneMeta[] = [
	{
		id: 'hook',
		from: 0,
		durationInFrames: 140,
		lines: [
			{text: 'اغلب قراراتك بالحياة قد يكون سببها', start: 8, end: 81},
			{text: 'شيء انت اصلا ما تفكر بيه', start: 86, end: 129, highlight: ['تفكر']},
		],
	},
	{
		id: 'deathBook',
		from: 140,
		durationInFrames: 103,
		lines: [
			{text: 'وهو الموت', start: 0, end: 24, highlight: ['الموت']},
			{text: 'ارنست بيكر', start: 28, end: 52},
			{text: 'كتاب انكار الموت', start: 58, end: 93, highlight: ['الموت']},
		],
	},
	{
		id: 'awareness',
		from: 243,
		durationInFrames: 209,
		lines: [
			{text: 'يقول ان الانسان', start: 0, end: 24},
			{text: 'يعرف انه سيموت', start: 29, end: 61, highlight: ['سيموت']},
			{text: 'لكنه لا يستطيع ان يعيش', start: 72, end: 120, highlight: ['يعيش']},
			{text: 'وهو يفكر', start: 125, end: 149},
			{text: 'بهذه الحقيقة', start: 150, end: 177},
			{text: 'كل يوم', start: 181, end: 205, highlight: ['يوم']},
		],
	},
	{
		id: 'invention',
		from: 452,
		durationInFrames: 144,
		lines: [
			{text: 'لذلك اخترع لنفسه', start: 0, end: 46},
			{text: 'طريقة اخرى للنجاة', start: 51, end: 94, highlight: ['للنجاة']},
			{text: 'ان يترك اثرا', start: 104, end: 134, highlight: ['اثرا']},
		],
	},
	{
		id: 'chase',
		from: 596,
		durationInFrames: 138,
		lines: [
			{text: 'لذلك انت تريد تنجح', start: 1, end: 39, highlight: ['تنجح']},
			{text: 'تريد تشتهر', start: 44, end: 68, highlight: ['تشتهر']},
			{text: 'تريد تنجز', start: 70, end: 92, highlight: ['تنجز']},
			{text: 'وتريد تكون اسرة', start: 92, end: 126, highlight: ['اسرة']},
		],
	},
	{
		id: 'legacy',
		from: 734,
		durationInFrames: 124,
		lines: [
			{text: 'بالاحرى تريد شي يبقى', start: 0, end: 58, highlight: ['يبقى']},
			{text: 'ويقول للعالم', start: 63, end: 88},
			{text: 'انه انت جنت', start: 94, end: 120, highlight: ['جنت']},
		],
	},
	{
		id: 'immortality',
		from: 858,
		durationInFrames: 231,
		lines: [
			{text: 'هنا بيكر يشوف', start: 0, end: 40},
			{text: 'انه هواي من الاشياء اللي نطاردها', start: 44, end: 102, highlight: ['نطاردها']},
			{text: 'هي محاولة لصناعة', start: 117, end: 165},
			{text: 'نوع من الخلود الرمزي', start: 172, end: 218, highlight: ['الخلود', 'الرمزي']},
		],
	},
	{
		id: 'paradox',
		from: 1089,
		durationInFrames: 191,
		lines: [
			{text: 'لكن المفارقة احيانا', start: 0, end: 60, highlight: ['المفارقة']},
			{text: 'تنشغل كثيرا', start: 65, end: 97},
			{text: 'بمحاولة ان تبقى', start: 105, end: 153},
			{text: 'بعد الموت', start: 153, end: 177, highlight: ['الموت']},
		],
	},
	{
		id: 'live',
		from: 1280,
		durationInFrames: 170,
		lines: [{text: 'فتنسى ان تعيش قبله', start: 0, end: 63, highlight: ['تعيش']}],
	},
];

export const TOTAL_DURATION = scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);
