// Scene map built from the actual narration timing (captions extracted from
// the source recording), not from arbitrary equal slices. Times are in
// seconds; frame() converts to frames at FPS.
import {FPS} from './theme';

export const frame = (seconds: number) => Math.round(seconds * FPS);

// Converts an absolute narration timestamp into a frame number relative to
// a scene's own start (scenes render inside a <Sequence>, so useCurrentFrame
// is already local to the scene).
export const rel = (sceneStartSeconds: number, atSeconds: number) => frame(atSeconds - sceneStartSeconds);

// Narration line-by-line timing, as captured from the synced caption export.
export const LINES = {
	hook1: {from: 0.0, to: 2.6}, // اغلب قراراتك بالحياة قد يكون سببها
	hook2: {from: 3.0, to: 4.3}, // شيء انت اصلا ما تفكر بيه
	deathWord: {from: 5.0, to: 6.6}, // وهو الموت. ارنست بيكر
	bookTitle: {from: 7.0, to: 8.2}, // بكتابة إنكار الموت
	knows1: {from: 8.5, to: 9.7}, // يقول ان الانسان يعرف
	knows2: {from: 10.0, to: 10.9}, // انه سيموت
	cant1: {from: 11.0, to: 12.3}, // لكنه لا يستطيع ان يعيش
	cant2: {from: 12.5, to: 13.2}, // وهو يفكر
	cant3: {from: 13.5, to: 14.2}, // بهذه الحقيقة
	cant4: {from: 14.5, to: 15.4}, // كل يوم
	invent1: {from: 16.0, to: 16.9}, // لذلك اخترع لنفسه
	invent2: {from: 17.0, to: 18.4}, // طريقة اخرى للنجاة
	invent3: {from: 19.0, to: 19.9}, // ان يترك اثرا
	want0: {from: 20.5, to: 21.4}, // لذلك انت تريد تنجح
	want1: {from: 22.0, to: 22.9}, // تريد تشتهر
	want2: {from: 23.0, to: 23.9}, // تريد تنجز
	want3: {from: 24.0, to: 25.0}, // تريد تكون اسرة
	rather: {from: 25.5, to: 25.9}, // بالاحرى
	remain1: {from: 26.0, to: 26.9}, // تريد شي يبقى
	remain2: {from: 27.0, to: 27.9}, // ويقول للعالم
	remain3: {from: 28.0, to: 28.9}, // انه انت كنت
	beckerHere: {from: 29.0, to: 29.9}, // هنا بيكر
	sees: {from: 30.0, to: 32.4}, // يشوف انه هواي من الاشياء اللي نطاردها
	attempt: {from: 33.0, to: 34.4}, // هي محاولة لصناعة
	symbolic: {from: 35.0, to: 36.4}, // نوع من الخلود الرمزي
	paradox: {from: 36.5, to: 38.4}, // لكن المفارقة احيانا
	busy: {from: 39.0, to: 39.9}, // تنشغل كثيرا
	trying: {from: 40.0, to: 40.9}, // بمحاولة
	stay: {from: 41.0, to: 41.9}, // ان تبقى
	afterDeath: {from: 42.0, to: 43.0}, // بعد الموت
	forget: {from: 43.0, to: 44.6}, // فتنسى ان تعيش قبله
} as const;

export const TOTAL_SECONDS = 45.1;
export const TOTAL_FRAMES = frame(TOTAL_SECONDS);

// Scene boundaries — driven by sentence changes and pauses in the narration,
// not by even division.
export const SCENE_BOUNDS = {
	hook: {from: 0.0, to: 4.6},
	deathReveal: {from: 4.6, to: 7.6},
	knows: {from: 7.6, to: 10.8},
	cantLive: {from: 10.8, to: 15.7},
	inventedTrace: {from: 15.7, to: 20.3},
	wantList: {from: 20.3, to: 26.3},
	remainHere: {from: 26.3, to: 29.7},
	symbolicImmortality: {from: 29.7, to: 36.3},
	paradox: {from: 36.3, to: TOTAL_SECONDS},
} as const;
