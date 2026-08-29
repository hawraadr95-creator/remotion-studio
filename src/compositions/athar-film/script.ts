// Master timeline derived directly from the narration SRT (30fps).
// Scene boundaries fall exactly on line-start frames so every visual beat
// lands on a spoken cue. Frames are GLOBAL (this film has no per-scene
// Sequence reset — one continuous timeline, one continuous figure).

export type SceneId =
	| 'paths'
	| 'book'
	| 'clockRoom'
	| 'trail'
	| 'montage'
	| 'traces'
	| 'monument'
	| 'obsession'
	| 'payoff';

export const scenes: {id: SceneId; from: number; to: number}[] = [
	{id: 'paths', from: 0, to: 140},
	{id: 'book', from: 140, to: 243},
	{id: 'clockRoom', from: 243, to: 452},
	{id: 'trail', from: 452, to: 596},
	{id: 'montage', from: 596, to: 734},
	{id: 'traces', from: 734, to: 858},
	{id: 'monument', from: 858, to: 1089},
	{id: 'obsession', from: 1089, to: 1280},
	{id: 'payoff', from: 1280, to: 1450},
];

export const TOTAL_DURATION = scenes[scenes.length - 1].to;

// Narration-line frame markers (from the SRT), used to time visual cues —
// not rendered as running captions.
export const lines = {
	l1_decisions: {start: 8, end: 81},
	l2_dontThink: {start: 86, end: 129},
	l3_death: {start: 140, end: 164},
	l4_becker: {start: 168, end: 192},
	l5_bookTitle: {start: 198, end: 233},
	l6_humanKnows: {start: 243, end: 267},
	l7_willDie: {start: 272, end: 304},
	l8_cantLive: {start: 315, end: 363},
	l9_thinking: {start: 368, end: 392},
	l10_thisTruth: {start: 393, end: 420},
	l11_everyDay: {start: 424, end: 448},
	l12_invented: {start: 452, end: 498},
	l13_anotherWay: {start: 503, end: 546},
	l14_leaveTrace: {start: 556, end: 586},
	l15_succeed: {start: 597, end: 635},
	l16_famous: {start: 640, end: 664},
	l17_achieve: {start: 666, end: 688},
	l18_family: {start: 688, end: 722},
	l19_rather: {start: 734, end: 758},
	l20_remains: {start: 762, end: 792},
	l21_tellWorld: {start: 797, end: 822},
	l22_youExisted: {start: 828, end: 854},
	l23_beckerSees: {start: 858, end: 898},
	l24_muchWeChase: {start: 902, end: 960},
	l25_attemptToCreate: {start: 975, end: 1023},
	l26_symbolicImmortality: {start: 1030, end: 1076},
	l27_paradox: {start: 1089, end: 1149},
	l28_tooBusy: {start: 1154, end: 1186},
	l29_trying: {start: 1194, end: 1218},
	l30_toRemain: {start: 1222, end: 1242},
	l31_afterDeath: {start: 1242, end: 1266},
	l32_forgetToLive: {start: 1280, end: 1343},
} as const;

export type KeywordEvent = {
	word: string;
	from: number;
	to: number;
	y?: number;
	size?: number;
};

// Sparse, high-impact keyword typography — NOT a running caption track.
export const keywords: KeywordEvent[] = [
	{word: 'الموت', from: lines.l3_death.start, to: lines.l3_death.start + 46, y: 900, size: 128},
	{word: 'أثر', from: lines.l14_leaveTrace.start + 8, to: 600, y: 1640, size: 118},
	{word: 'تنجح', from: lines.l15_succeed.start, to: lines.l15_succeed.start + 40, y: 1180, size: 64},
	{word: 'تشتهر', from: lines.l16_famous.start, to: lines.l16_famous.start + 24, y: 980, size: 60},
	{word: 'تنجز', from: lines.l17_achieve.start, to: lines.l17_achieve.start + 20, y: 1000, size: 58},
	{word: 'أسرة', from: lines.l18_family.start, to: lines.l18_family.start + 40, y: 970, size: 64},
	{word: 'كنت هنا', from: lines.l22_youExisted.start + 20, to: 858, y: 1500, size: 70},
	{word: 'الخلود الرمزي', from: lines.l26_symbolicImmortality.start, to: lines.l26_symbolicImmortality.start + 90, y: 1620, size: 74},
	{word: 'المفارقة', from: lines.l27_paradox.start, to: lines.l27_paradox.start + 56, y: 420, size: 56},
	{word: 'أن تبقى', from: lines.l30_toRemain.start, to: lines.l32_forgetToLive.start + 22, y: 1700, size: 84},
	{word: 'أن تعيش', from: lines.l32_forgetToLive.start + 6, to: TOTAL_DURATION, y: 900, size: 104},
];
