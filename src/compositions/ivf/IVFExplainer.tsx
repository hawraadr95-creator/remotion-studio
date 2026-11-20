import React from 'react';
import * as THREE from 'three';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Bokeh, Brand, Callout, Captions, FilmFinish, K, SceneShell, StepTitle, clamp, font, useRise} from './common';
import {Dust, Embryo, Glass, Oocyte, Ovary, FOLLICLES, Sperm, Stage, SwimmingSperm, folliclePos} from './three';
import {IVF_DURATION, TIMELINE, seg} from './script';

export {IVF_DURATION};

export type IVFProps = {voiceover?: string | null; music?: string | null};

/* ------------------------------------------------------------------ */
/* 1. Hook                                                             */
/* ------------------------------------------------------------------ */

const SPERM_PATHS = [
	{a: [-1.6, -3.2, 0.3], b: [-1.4, -1.2, 0.5], c: [-0.75, -0.6, 0.6]},
	{a: [1.7, -3.0, 0.0], b: [1.3, -1.5, 0.3], c: [0.78, -0.55, 0.5]},
	{a: [-2.0, 2.8, -0.4], b: [-1.8, 1.4, 0.2], c: [-0.95, 0.75, 0.4]},
	{a: [2.1, 2.2, -0.2], b: [1.6, 1.0, 0.4], c: [0.95, 0.55, 0.5]},
	{a: [0.2, -3.4, 0.6], b: [0.5, -2.0, 0.8], c: [0.2, -1.05, 0.7]},
	{a: [-2.4, -0.6, 0.2], b: [-1.7, -0.2, 0.5], c: [-1.15, -0.05, 0.5]},
];

const SceneHook: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const q = useRise(70);
	const camZ = interpolate(frame, [0, dur], [10, 8.2], {easing: Easing.inOut(Easing.quad)});
	return (
		<SceneShell dur={dur} fadeIn={1}>
			<Bokeh seed="hook" />
			<Stage z={camZ}>
				<Dust seed="h" />
				<Oocyte position={[0, 0.15, 0]} cumulus />
				{SPERM_PATHS.map((p, i) => (
					<SwimmingSperm key={i} {...p} from={i * 6} to={dur - 10 + i * 4} seed={`s${i}`} />
				))}
			</Stage>
			<div dir="rtl" style={{position: 'absolute', top: 210, left: 70, right: 70, textAlign: 'center', opacity: q, transform: `translateY(${(1 - q) * 30}px)`}}>
				<div style={{fontFamily: font, fontWeight: 800, fontSize: 70, color: K.cream, lineHeight: 1.3, textShadow: '0 6px 30px rgba(0,0,0,0.6)'}}>
					رحلة <span style={{color: K.gold}}>أطفال الأنابيب</span>
				</div>
				<div style={{fontFamily: font, fontWeight: 500, fontSize: 36, color: K.muted, letterSpacing: 3, marginTop: 6}}>IVF · In Vitro Fertilization</div>
			</div>
		</SceneShell>
	);
};

/* ------------------------------------------------------------------ */
/* 2. What is IVF (+ IVF vs IUI)                                       */
/* ------------------------------------------------------------------ */

const FlowCard: React.FC<{n: string; title: string; note: string; at: number; icon: React.ReactNode}> = ({n, title, note, at, icon}) => {
	const p = useRise(at);
	return (
		<div
			dir="rtl"
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 30,
				background: 'linear-gradient(135deg, rgba(255,246,232,0.12), rgba(255,246,232,0.04))',
				border: `1.5px solid ${K.gold}66`,
				borderRadius: 30,
				padding: '26px 34px',
				marginBottom: 22,
				opacity: p,
				transform: `translateY(${(1 - p) * 40}px)`,
				backdropFilter: 'blur(10px)',
			}}
		>
			<div style={{width: 110, height: 110, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(circle at 35% 30%, ${K.goldLight}, ${K.gold})`, boxShadow: `0 0 40px ${K.gold}55`}}>
				{icon}
			</div>
			<div>
				<div style={{fontFamily: font, fontWeight: 500, fontSize: 30, color: K.gold}}>{n}</div>
				<div style={{fontFamily: font, fontWeight: 800, fontSize: 50, color: K.cream}}>{title}</div>
				<div style={{fontFamily: font, fontWeight: 500, fontSize: 34, color: K.muted}}>{note}</div>
			</div>
		</div>
	);
};

const IconEgg = () => (
	<svg width="64" height="64" viewBox="0 0 64 64">
		<circle cx="32" cy="32" r="24" fill="none" stroke="#3a2416" strokeWidth="4" />
		<circle cx="32" cy="32" r="15" fill="#3a2416" opacity="0.85" />
	</svg>
);
const IconDish = () => (
	<svg width="64" height="64" viewBox="0 0 64 64">
		<ellipse cx="32" cy="38" rx="26" ry="10" fill="none" stroke="#3a2416" strokeWidth="4" />
		<path d="M6 38 v-8 a26 10 0 0 1 52 0 v8" fill="none" stroke="#3a2416" strokeWidth="4" />
		<circle cx="32" cy="31" r="6" fill="#3a2416" />
	</svg>
);
const IconUterus = () => (
	<svg width="64" height="64" viewBox="0 0 64 64">
		<path d="M10 18 q6 -8 14 -2 q8 6 16 0 q8 -6 14 2 q-6 2 -10 8 q-4 10 -6 20 v8 h-12 v-8 q-2 -10 -6 -20 q-4 -6 -10 -8z" fill="none" stroke="#3a2416" strokeWidth="4" strokeLinejoin="round" />
		<circle cx="32" cy="26" r="4" fill="#3a2416" />
	</svg>
);

const SceneWhat: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const swap = 175; // frames: flow → comparison
	const flowO = interpolate(frame, [swap - 12, swap], [1, 0], clamp);
	const cmp = useRise(swap + 4);
	return (
		<SceneShell dur={dur}>
			<Bokeh seed="what" />
			<StepTitle index="ما هو؟" title="أطفال الأنابيب (IVF)" subtitle="الإخصاب خارج الجسم" />
			<div style={{position: 'absolute', top: 560, left: 80, right: 80, opacity: flowO}}>
				<FlowCard n="١" title="سحب البويضات" note="من المبيض" at={20} icon={<IconEgg />} />
				<FlowCard n="٢" title="الإخصاب في المختبر" note="بيئة مخبرية دقيقة" at={50} icon={<IconDish />} />
				<FlowCard n="٣" title="نقل الجنين إلى الرحم" note="بهدف حدوث الحمل" at={80} icon={<IconUterus />} />
			</div>
			{frame >= swap - 2 && (
				<div dir="rtl" style={{position: 'absolute', top: 600, left: 70, right: 70, display: 'flex', gap: 26, opacity: cmp, transform: `translateY(${(1 - cmp) * 40}px)`}}>
					{[
						{tag: 'IVF', name: 'أطفال الأنابيب', where: 'الإخصاب في المختبر', hi: true},
						{tag: 'IUI', name: 'التلقيح داخل الرحم', where: 'الإخصاب داخل الجسم', hi: false},
					].map((c) => (
						<div
							key={c.tag}
							style={{
								flex: 1,
								borderRadius: 30,
								padding: '40px 26px',
								textAlign: 'center',
								background: c.hi ? 'linear-gradient(160deg, rgba(217,178,111,0.28), rgba(217,178,111,0.08))' : 'rgba(255,246,232,0.06)',
								border: `2px solid ${c.hi ? K.gold : 'rgba(255,246,232,0.25)'}`,
							}}
						>
							<div style={{fontFamily: font, fontWeight: 800, fontSize: 72, color: c.hi ? K.gold : K.beige, letterSpacing: 2}}>{c.tag}</div>
							<div style={{fontFamily: font, fontWeight: 800, fontSize: 44, color: K.cream, marginTop: 8}}>{c.name}</div>
							<div style={{height: 2, background: `${K.gold}55`, margin: '22px 20px'}} />
							<div style={{fontFamily: font, fontWeight: 500, fontSize: 38, color: K.muted}}>{c.where}</div>
						</div>
					))}
				</div>
			)}
		</SceneShell>
	);
};

/* ------------------------------------------------------------------ */
/* 3. Ovarian stimulation                                              */
/* ------------------------------------------------------------------ */

const DayCounter: React.FC<{from: number; to: number; d0: number; d1: number; label?: string}> = ({from, to, d0, d1, label = 'اليوم'}) => {
	const frame = useCurrentFrame();
	const d = Math.round(interpolate(frame, [from, to], [d0, d1], clamp));
	const p = useRise(from - 10);
	return (
		<div dir="rtl" style={{position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: p}}>
			<div style={{fontFamily: font, fontWeight: 700, fontSize: 40, color: K.cream, border: `1.5px solid ${K.gold}88`, borderRadius: 999, padding: '8px 34px', background: 'rgba(20,13,11,0.5)'}}>
				{label} <span style={{color: K.gold}}>{d.toLocaleString('ar-EG')}</span>
			</div>
		</div>
	);
};

const SceneStim: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const rotY = interpolate(frame, [0, dur], [-0.35, 0.25]);
	const growth = (i: number) => {
		const f = FOLLICLES[i];
		return interpolate(frame, [30 + f.delay, 200 + f.delay * 0.5], [0.04, f.max], {...clamp, easing: Easing.out(Easing.quad)});
	};
	return (
		<SceneShell dur={dur}>
			<Bokeh seed="stim" tint={K.rose} />
			<Stage z={10.5}>
				<Dust seed="st" />
				<Ovary growth={growth} rotY={rotY} position={[0, -0.05, 0]} />
			</Stage>
			<StepTitle index="المرحلة ١" title="تنشيط المبايض" />
			<DayCounter from={30} to={230} d0={1} d1={10} />
			<Callout x={600} y={830} text="حويصلات تنمو" side="left" at={110} dy={-170} />
			<Callout x={460} y={1060} text="متابعة بالسونار" side="right" at={170} dy={190} />
		</SceneShell>
	);
};

/* ------------------------------------------------------------------ */
/* 4. Egg retrieval                                                    */
/* ------------------------------------------------------------------ */

const SceneRetrieval: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const rotY = 0.1;
	const pos: [number, number, number] = [0.15, 0.1, 0];
	const targets = [2, 0, 3];
	const step = 60;
	const start = 30;
	const idx = Math.min(Math.floor(Math.max(frame - start, 0) / step), targets.length - 1);
	const local = Math.max(frame - start, 0) - idx * step;
	const target = folliclePos(targets[idx], rotY, pos);
	const base = new THREE.Vector3(1.0, -2.6, 0.7);
	const dirN = target.clone().sub(base).normalize();
	const reach = interpolate(local, [0, 18, 40, 56], [0.55, 1, 1, 0.75], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const entering = interpolate(frame, [0, start], [0, 1], clamp);
	const tip = base.clone().lerp(target, reach * entering);
	const collapsed = (i: number) => {
		const k = targets.indexOf(i);
		if (k < 0) return FOLLICLES[i].max;
		const t0 = start + k * step + 20;
		return interpolate(frame, [t0, t0 + 18], [FOLLICLES[i].max, 0.0], clamp);
	};
	// egg travelling down the needle
	const travel = interpolate(local, [24, 54], [0, 1], clamp);
	const eggP = target.clone().lerp(base, travel * 0.8);
	return (
		<SceneShell dur={dur}>
			<Bokeh seed="ret" tint={K.rose} />
			<Stage z={10.5}>
				<Dust seed="rt" />
				<Ovary growth={collapsed} rotY={rotY} position={pos} />
				<Glass from={base.clone().addScaledVector(dirN, -2)} to={tip} r0={0.06} r1={0.04} metal />
				{travel > 0 && travel < 1 && (
					<mesh position={eggP}>
						<sphereGeometry args={[0.06, 16, 16]} />
						<meshStandardMaterial color="#fff4de" emissive="#ffd38a" emissiveIntensity={0.9} />
					</mesh>
				)}
			</Stage>
			<StepTitle index="المرحلة ٢" title="سحب البويضات" />
			<Callout x={805} y={1250} text="إبرة دقيقة موجّهة بالسونار" side="left" at={50} dy={70} />
			<Callout x={460} y={790} text="تحت التخدير أو التسكين" side="right" at={120} dy={-200} />
		</SceneShell>
	);
};

/* ------------------------------------------------------------------ */
/* 5. Fertilisation: conventional IVF → ICSI                           */
/* ------------------------------------------------------------------ */

const MicroscopeRing: React.FC = () => (
	<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 46%, transparent 44%, rgba(10,6,5,0.85) 47%, rgba(10,6,5,0.98) 60%)', pointerEvents: 'none'}} />
);

const SceneFert: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const split = 120;
	const convO = interpolate(frame, [split - 14, split], [1, 0], clamp);
	const icsiO = interpolate(frame, [split - 4, split + 10], [0, 1], clamp);
	// ICSI choreography (local to split)
	const l = frame - split;
	const needleX = interpolate(l, [10, 60, 100, 140], [3.2, 0.25, 0.25, 3.2], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const spermInside = l > 92;
	const spermX = spermInside ? interpolate(l, [92, 130], [0.25, 0.05], clamp) : needleX + 0.12;
	return (
		<SceneShell dur={dur}>
			<Bokeh seed="fert" />
			{convO > 0 && (
				<AbsoluteFill style={{opacity: convO}}>
					<Stage z={9}>
						<Dust seed="fc" />
						<Oocyte position={[0, 0.05, 0]} cumulus />
						{SPERM_PATHS.slice(0, 5).map((p, i) => (
							<SwimmingSperm key={i} {...p} from={-10 + i * 5} to={110 + i * 3} seed={`f${i}`} />
						))}
					</Stage>
					<div dir="rtl" style={{position: 'absolute', top: 1380, left: 0, right: 0, textAlign: 'center', fontFamily: font, fontWeight: 700, fontSize: 40, color: K.gold}}>
						الإخصاب التقليدي
					</div>
				</AbsoluteFill>
			)}
			{icsiO > 0 && (
				<AbsoluteFill style={{opacity: icsiO}}>
					<Stage z={10}>
						<group position={[0, 0.05, 0]}>
							<Oocyte cumulus={false} rotate={-0.6} />
							{/* holding pipette (left) */}
							<Glass from={new THREE.Vector3(-4, 0, 0)} to={new THREE.Vector3(-1.22, 0, 0)} r0={0.42} r1={0.4} />
							{/* injection needle (right) */}
							<Glass from={new THREE.Vector3(needleX + 3, 0.0, 1.25)} to={new THREE.Vector3(needleX, 0, 1.25)} r0={0.12} r1={0.035} metal />
							<Sperm head={new THREE.Vector3(spermX, 0, 1.28)} dir={new THREE.Vector3(-1, 0, 0)} phase={spermInside ? 0 : frame * 0.4} size={0.85} />
						</group>
					</Stage>
					<MicroscopeRing />
					<div dir="rtl" style={{position: 'absolute', top: 1380, left: 0, right: 0, textAlign: 'center', fontFamily: font, fontWeight: 700, fontSize: 40, color: K.gold}}>
						الحقن المجهري · ICSI
					</div>
					<Callout x={130} y={945} text="ماصة التثبيت" side="right" at={split + 30} dy={240} />
					<Callout x={880} y={945} text="إبرة الحقن" side="left" at={split + 50} dy={-250} />
				</AbsoluteFill>
			)}
			<StepTitle index="المرحلة ٣" title="الإخصاب في المختبر" />
		</SceneShell>
	);
};

/* ------------------------------------------------------------------ */
/* 6. Embryo development                                               */
/* ------------------------------------------------------------------ */

const STAGE_LABELS = [
	{at: 0, day: 'اليوم ١', name: 'خلية واحدة (البويضة المخصبة)'},
	{at: 1, day: 'اليوم ٢', name: 'خليتان ← ٤ خلايا'},
	{at: 3, day: 'اليوم ٣', name: '٨ خلايا تقريبًا'},
	{at: 4, day: 'اليوم ٤', name: 'التوتية (Morula)'},
	{at: 5, day: 'اليوم ٥–٦', name: 'الكيسة الأريمية (Blastocyst)'},
];

const SceneEmbryo: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const progress = interpolate(frame, [30, 70, 110, 150, 200, 250], [0, 1, 2, 3, 4, 5], {...clamp, easing: Easing.inOut(Easing.quad)});
	const label = [...STAGE_LABELS].reverse().find((s) => progress >= s.at - 0.15) ?? STAGE_LABELS[0];
	return (
		<SceneShell dur={dur}>
			<Bokeh seed="emb" />
			<Stage z={interpolate(frame, [0, dur], [7.4, 6.8])}>
				<Dust seed="em" />
				<Embryo progress={progress} position={[0, 0.05, 0]} />
			</Stage>
			<MicroscopeRing />
			<StepTitle index="المرحلة ٤" title="تطوّر الأجنة" />
			<div dir="rtl" key={label.day} style={{position: 'absolute', top: 1330, left: 0, right: 0, textAlign: 'center'}}>
				<div style={{fontFamily: font, fontWeight: 800, fontSize: 46, color: K.gold}}>{label.day}</div>
				<div style={{fontFamily: font, fontWeight: 600, fontSize: 38, color: K.cream}}>{label.name}</div>
			</div>
			{progress > 4.8 && <Callout x={460} y={790} text="كتلة الخلايا الداخلية" side="right" at={258} dy={-200} />}
		</SceneShell>
	);
};

/* ------------------------------------------------------------------ */
/* 7. Embryo transfer — anatomical cross-section                       */
/* ------------------------------------------------------------------ */

const SceneTransfer: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const draw = interpolate(frame, [5, 45], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	// catheter: enters from below through cervix to ~mid/upper cavity
	const cath = interpolate(frame, [50, 110, 170, 230], [0, 1, 1, 0], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const tipY = 1640 - cath * (1640 - 900);
	const released = frame > 140;
	const emb = interpolate(frame, [140, 170], [0, 1], clamp);
	const glow = 0.6 + 0.4 * Math.sin(frame / 8);
	const camS = interpolate(frame, [0, dur], [1, 1.08]);
	return (
		<SceneShell dur={dur}>
			<Bokeh seed="tr" tint={K.rose} />
			<AbsoluteFill style={{transform: `scale(${camS})`}}>
				<svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
					<defs>
						<radialGradient id="myo" cx="50%" cy="40%" r="60%">
							<stop offset="0%" stopColor="#f2b7b0" />
							<stop offset="60%" stopColor="#d98a8a" />
							<stop offset="100%" stopColor="#a85a62" />
						</radialGradient>
						<radialGradient id="endo" cx="50%" cy="35%" r="70%">
							<stop offset="0%" stopColor="#ffe3dc" />
							<stop offset="100%" stopColor="#f0a9a6" />
						</radialGradient>
						<linearGradient id="tube" x1="0" x2="1">
							<stop offset="0%" stopColor="#e9a39c" />
							<stop offset="100%" stopColor="#c97a7d" />
						</linearGradient>
						<radialGradient id="ovy" cx="40%" cy="35%" r="70%">
							<stop offset="0%" stopColor="#f7d3c4" />
							<stop offset="100%" stopColor="#c98d84" />
						</radialGradient>
						<filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
							<feGaussianBlur stdDeviation="1.2" />
						</filter>
						<filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
							<feGaussianBlur stdDeviation="14" />
						</filter>
					</defs>
					<g opacity={draw} transform={`translate(0 ${(1 - draw) * 40})`}>
						{/* fallopian tubes */}
						<path d="M392 760 C 300 700, 230 690, 170 740 C 140 765, 130 800, 150 830" stroke="url(#tube)" strokeWidth="34" fill="none" strokeLinecap="round" />
						<path d="M688 760 C 780 700, 850 690, 910 740 C 940 765, 950 800, 930 830" stroke="url(#tube)" strokeWidth="34" fill="none" strokeLinecap="round" />
						{/* fimbriae */}
						{[0, 1, 2, 3].map((i) => (
							<path key={`fl${i}`} d={`M150 830 q ${-20 + i * 10} 30 ${-10 + i * 14} 50`} stroke="#d98f8c" strokeWidth="10" fill="none" strokeLinecap="round" />
						))}
						{[0, 1, 2, 3].map((i) => (
							<path key={`fr${i}`} d={`M930 830 q ${20 - i * 10} 30 ${10 - i * 14} 50`} stroke="#d98f8c" strokeWidth="10" fill="none" strokeLinecap="round" />
						))}
						{/* ovaries */}
						<ellipse cx="215" cy="905" rx="70" ry="48" fill="url(#ovy)" />
						<ellipse cx="865" cy="905" rx="70" ry="48" fill="url(#ovy)" />
						{/* uterus body + cervix (myometrium) */}
						<path
							d="M380 720 C 380 640, 700 640, 700 720 C 712 860, 680 1010, 618 1110 C 600 1140, 596 1180, 596 1220 L 596 1420 C 596 1450, 484 1450, 484 1420 L 484 1220 C 484 1180, 480 1140, 462 1110 C 400 1010, 368 860, 380 720 Z"
							fill="url(#myo)"
						/>
						{/* endometrial cavity (triangular in coronal section) */}
						<path d="M430 750 C 470 735, 610 735, 650 750 C 640 860, 600 960, 552 1060 L 548 1110 L 532 1110 L 528 1060 C 480 960, 440 860, 430 750 Z" fill="url(#endo)" filter="url(#soft)" />
						{/* endometrium lining highlight */}
						<path d="M430 750 C 470 735, 610 735, 650 750" stroke="#fff1ec" strokeWidth="4" fill="none" opacity="0.7" />
						{/* cervical canal */}
						<path d="M540 1110 L 540 1440" stroke="#f6c9c3" strokeWidth="14" strokeLinecap="round" />
						{/* vaginal outline hint */}
						<path d="M470 1440 C 455 1520, 450 1600, 445 1700 M610 1440 C 625 1520, 630 1600, 635 1700" stroke="#c97a7d" strokeWidth="10" fill="none" opacity="0.6" />
					</g>
					{/* catheter */}
					{cath > 0 && (
						<g>
							<line x1="540" y1="1900" x2="540" y2={tipY} stroke="#fdfaf5" strokeWidth="9" strokeLinecap="round" opacity="0.95" />
							<line x1="540" y1="1900" x2="540" y2={tipY} stroke="#c9d6e0" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
						</g>
					)}
					{/* embryo */}
					{released && (
						<g opacity={emb}>
							<circle cx="540" cy="880" r={40 * glow} fill="#ffd89a" filter="url(#glow)" opacity="0.8" />
							<circle cx="540" cy="880" r="13" fill="#fff6e4" stroke={K.gold} strokeWidth="3" />
						</g>
					)}
				</svg>
			</AbsoluteFill>
			<StepTitle index="المرحلة ٥" title="إرجاع الجنين" />
			<Callout x={600} y={800} text="تجويف الرحم" side="right" at={45} dy={-150} />
			<Callout x={540} y={1300} text="قسطرة رفيعة" side="left" at={90} dy={60} />
			<Callout x={548} y={1180} text="عنق الرحم" side="right" at={70} dy={40} />
		</SceneShell>
	);
};

/* ------------------------------------------------------------------ */
/* 8. Myth vs fact                                                     */
/* ------------------------------------------------------------------ */

const SceneMyth: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const a = useRise(10);
	const strike = interpolate(frame, [70, 95], [0, 1], clamp);
	const b = useRise(100);
	return (
		<SceneShell dur={dur}>
			<Bokeh seed="myth" />
			<StepTitle title="تصحيح مفهوم شائع" />
			<div dir="rtl" style={{position: 'absolute', top: 560, left: 80, right: 80}}>
				<div style={{opacity: a, transform: `translateY(${(1 - a) * 30}px)`, borderRadius: 30, padding: '34px 40px', background: 'rgba(233,163,180,0.1)', border: `2px solid ${K.rose}88`, marginBottom: 30}}>
					<div style={{fontFamily: font, fontWeight: 700, fontSize: 38, color: K.rose}}>✕ معلومة خاطئة</div>
					<div style={{position: 'relative', display: 'inline-block', fontFamily: font, fontWeight: 800, fontSize: 56, color: K.cream, marginTop: 8}}>
						الطفل ينمو داخل أنبوب
						<div style={{position: 'absolute', right: 0, top: '55%', height: 5, width: `${strike * 100}%`, background: K.rose, borderRadius: 3}} />
					</div>
				</div>
				<div style={{opacity: b, transform: `translateY(${(1 - b) * 30}px)`, borderRadius: 30, padding: '34px 40px', background: 'rgba(217,178,111,0.14)', border: `2px solid ${K.gold}`}}>
					<div style={{fontFamily: font, fontWeight: 700, fontSize: 38, color: K.gold}}>✓ الحقيقة</div>
					<div style={{fontFamily: font, fontWeight: 700, fontSize: 46, color: K.cream, marginTop: 8, lineHeight: 1.5}}>
						الإخصاب والأيام الأولى فقط في المختبر، ثم يستمر الحمل داخل الرحم
					</div>
				</div>
			</div>
		</SceneShell>
	);
};

/* ------------------------------------------------------------------ */
/* 9. Success factors (no guarantees)                                  */
/* ------------------------------------------------------------------ */

const SceneFactors: React.FC<{dur: number}> = ({dur}) => {
	const items = ['العمر', 'سبب تأخر الإنجاب', 'جودة البويضات والأجنة', 'الحالة الصحية العامة'];
	const note = useRise(150);
	return (
		<SceneShell dur={dur}>
			<Bokeh seed="fac" tint={K.rose} />
			<StepTitle title="فرص النجاح تختلف" subtitle="من حالة إلى أخرى، حسب عوامل منها:" />
			<div dir="rtl" style={{position: 'absolute', top: 600, left: 90, right: 90, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
				{items.map((t, i) => (
					<FactorChip key={t} text={t} at={24 + i * 22} />
				))}
			</div>
			<div dir="rtl" style={{position: 'absolute', top: 1030, left: 90, right: 90, textAlign: 'center', opacity: note, transform: `translateY(${(1 - note) * 30}px)`}}>
				<div style={{display: 'inline-block', fontFamily: font, fontWeight: 700, fontSize: 42, color: K.cream, padding: '22px 36px', borderRadius: 24, border: `2px solid ${K.gold}`, background: 'rgba(217,178,111,0.12)'}}>
					لا توجد نتيجة مضمونة، والتقييم الطبي يحدد الخطة الأنسب
				</div>
			</div>
		</SceneShell>
	);
};

const FactorChip: React.FC<{text: string; at: number}> = ({text, at}) => {
	const p = useRise(at);
	return (
		<div style={{opacity: p, transform: `scale(${0.9 + 0.1 * p})`, borderRadius: 26, padding: '34px 20px', textAlign: 'center', background: 'linear-gradient(160deg, rgba(255,246,232,0.14), rgba(255,246,232,0.04))', border: `1.5px solid ${K.gold}66`}}>
			<div style={{width: 14, height: 14, borderRadius: '50%', background: K.gold, margin: '0 auto 14px', boxShadow: `0 0 20px ${K.gold}`}} />
			<div style={{fontFamily: font, fontWeight: 800, fontSize: 44, color: K.cream, lineHeight: 1.3}}>{text}</div>
		</div>
	);
};

/* ------------------------------------------------------------------ */
/* 10. Ending — hope                                                   */
/* ------------------------------------------------------------------ */

const SceneEnd: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const q1 = useRise(10);
	const q2 = useRise(40);
	const cta = useRise(90);
	const sun = interpolate(frame, [0, dur], [0.6, 1]);
	return (
		<SceneShell dur={dur} fadeOut={1}>
			<AbsoluteFill style={{background: `radial-gradient(90% 60% at 50% 42%, #5a3a24 0%, ${K.bg} 75%)`}} />
			<AbsoluteFill style={{background: `radial-gradient(40% 25% at 50% 40%, rgba(255,214,150,${0.55 * sun}) 0%, transparent 70%)`}} />
			<Bokeh seed="end" count={34} />
			<Stage z={7}>
				<Dust seed="en" count={300} color="#ffd9a0" />
				<group position={[0, 0.85, 0]} scale={0.55}>
					<Embryo progress={5} />
				</group>
			</Stage>
			<div dir="rtl" style={{position: 'absolute', top: 1040, left: 70, right: 70, textAlign: 'center'}}>
				<div style={{fontFamily: font, fontWeight: 800, fontSize: 70, color: K.cream, lineHeight: 1.35, opacity: q1, transform: `translateY(${(1 - q1) * 30}px)`}}>
					كل رحلة علاج تبدأ <span style={{color: K.gold}}>بالأمل</span>
				</div>
				<div style={{fontFamily: font, fontWeight: 600, fontSize: 52, color: K.beige, lineHeight: 1.4, marginTop: 10, opacity: q2, transform: `translateY(${(1 - q2) * 30}px)`}}>
					والتقييم الصحيح هو أول خطوة
				</div>
			</div>
			<div dir="rtl" style={{position: 'absolute', bottom: 120, left: 60, right: 60, textAlign: 'center', opacity: cta}}>
				<div style={{height: 2, width: 260, margin: '0 auto 26px', background: `linear-gradient(90deg, transparent, ${K.gold}, transparent)`}} />
				<div style={{fontFamily: font, fontWeight: 800, fontSize: 50, color: K.goldLight}}>د. مروج هاتف العوادي</div>
				<div style={{fontFamily: font, fontWeight: 500, fontSize: 34, color: K.muted, marginTop: 4}}>أخصائية النسائية والتوليد والعقم · الديوانية</div>
				<div style={{fontFamily: font, fontWeight: 800, fontSize: 56, color: K.cream, marginTop: 14, direction: 'ltr', letterSpacing: 3}}>07855900287</div>
				<div style={{fontFamily: font, fontWeight: 400, fontSize: 24, color: 'rgba(251,245,236,0.5)', marginTop: 18}}>
					محتوى توعوي لا يغني عن استشارة الطبيب · المراجع: NHS · HFEA · ASRM
				</div>
			</div>
		</SceneShell>
	);
};

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* ------------------------------------------------------------------ */

const SCENES: Record<string, React.FC<{dur: number}>> = {
	hook: SceneHook,
	what: SceneWhat,
	stim: SceneStim,
	retrieval: SceneRetrieval,
	fert: SceneFert,
	embryo: SceneEmbryo,
	transfer: SceneTransfer,
	myth: SceneMyth,
	factors: SceneFactors,
	end: SceneEnd,
};

export const IVFExplainer: React.FC<IVFProps> = ({voiceover, music}) => {
	const frame = useCurrentFrame();
	const endS = seg('end');
	const musicVol = interpolate(frame, [0, 30, endS.from + endS.dur - 45, endS.from + endS.dur], [0, 1, 1, 0], clamp);
	return (
		<AbsoluteFill style={{background: K.bg}}>
			{TIMELINE.map((s) => {
				const Comp = SCENES[s.id];
				// overlap scenes slightly for cross-dissolves
				const pad = 8;
				return (
					<Sequence key={s.id} from={Math.max(0, s.from - pad)} durationInFrames={s.dur + pad * 2} name={s.id}>
						<Comp dur={s.dur + pad * 2} />
					</Sequence>
				);
			})}
			{frame < endS.from && <Brand />}
			<Captions />
			<FilmFinish />
			{music && <Audio src={staticFile(music)} volume={() => (voiceover ? 0.22 : 0.5) * musicVol} />}
			{voiceover && <Audio src={staticFile(voiceover)} volume={1} />}
		</AbsoluteFill>
	);
};
