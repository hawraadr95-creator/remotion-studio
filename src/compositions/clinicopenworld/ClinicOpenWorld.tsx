import React from 'react';
import {
	AbsoluteFill,
	Easing,
	Img,
	Sequence,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {loadFont as loadLalezar} from '@remotion/google-fonts/Lalezar';
import {loadFont as loadCairo} from '@remotion/google-fonts/Cairo';

const {fontFamily: gameFont} = loadLalezar('normal', {subsets: ['arabic', 'latin']});
const {fontFamily: uiFont} = loadCairo('normal', {weights: ['700', '900'], subsets: ['arabic', 'latin']});

const C = {
	yellow: '#ffd23f',
	green: '#58e06b',
	blue: '#4aa8ff',
	pink: '#ff3d8b',
	orange: '#ff9f43',
	purple: '#3a1460',
	white: '#ffffff',
	ink: '#0a0a0a',
};

const PHONE = '07855900287';

/* ---------------- timeline ---------------- */

const T = {
	establish: [0, 100],
	character: [100, 190],
	reception: [190, 380],
	wheel: [380, 520],
	scan: [520, 690],
	passed: [690, 860],
} as const;

export const CLINIC_OPEN_WORLD_DURATION = T.passed[1];

/* ---------------- helpers ---------------- */

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const usePop = (delay: number, damping = 12) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return spring({frame: frame - delay, fps, config: {damping, stiffness: 170, mass: 0.8}});
};

const outline = (w: number) =>
	[
		`${w}px ${w}px 0 ${C.ink}`,
		`-${w}px ${w}px 0 ${C.ink}`,
		`${w}px -${w}px 0 ${C.ink}`,
		`-${w}px -${w}px 0 ${C.ink}`,
		`0 ${w}px 0 ${C.ink}`,
		`0 -${w}px 0 ${C.ink}`,
		`${w}px 0 0 ${C.ink}`,
		`-${w}px 0 0 ${C.ink}`,
	].join(', ');

const G: React.FC<{
	size: number;
	color?: string;
	stroke?: number;
	style?: React.CSSProperties;
	children: React.ReactNode;
}> = ({size, color = C.white, stroke = 4, style, children}) => (
	<div dir="rtl" style={{fontFamily: gameFont, fontSize: size, color, lineHeight: 1.15, textShadow: outline(stroke), ...style}}>
		{children}
	</div>
);

// Painted / comic poster grade over a real photo
const World: React.FC<{src: string; position: string; from: number; to: number; dur: number; dim?: number}> = ({
	src,
	position,
	from,
	to,
	dur,
	dim = 0,
}) => {
	const frame = useCurrentFrame();
	const z = interpolate(frame, [0, dur], [from, to], {easing: Easing.inOut(Easing.quad)});
	return (
		<AbsoluteFill style={{overflow: 'hidden', background: C.ink}}>
			<Img
				src={staticFile(src)}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: position,
					transform: `scale(${z})`,
					filter: 'contrast(1.3) saturate(1.5) brightness(1.03)',
				}}
			/>
			<AbsoluteFill style={{background: `linear-gradient(165deg, ${C.orange}50, transparent 45%, ${C.pink}50)`, mixBlendMode: 'overlay'}} />
			<AbsoluteFill
				style={{
					backgroundImage: 'radial-gradient(rgba(0,0,0,0.22) 1.3px, transparent 1.5px)',
					backgroundSize: '7px 7px',
					mixBlendMode: 'multiply',
				}}
			/>
			<AbsoluteFill style={{boxShadow: 'inset 0 0 220px rgba(0,0,0,0.6)'}} />
			{dim > 0 && <AbsoluteFill style={{background: `rgba(0,0,0,${dim})`}} />}
		</AbsoluteFill>
	);
};

const Letterbox: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const h = interpolate(frame, [0, 12, dur - 12, dur], [0, 190, 190, 0], clamp);
	return (
		<>
			<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: h, background: C.ink}} />
			<div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: h, background: C.ink}} />
		</>
	);
};

const Flash: React.FC<{at: number}> = ({at}) => {
	const frame = useCurrentFrame();
	const o = interpolate(frame, [at - 2, at, at + 8], [0, 0.9, 0], clamp);
	return <AbsoluteFill style={{background: C.white, opacity: o}} />;
};

/* ---------------- HUD ---------------- */

const MiniMap: React.FC = () => {
	const frame = useCurrentFrame();
	const rot = interpolate(frame, [0, 700], [0, 120]);
	const pulse = 1 + 0.2 * Math.sin(frame / 5);
	return (
		<div style={{width: 300, height: 300, borderRadius: '50%', border: `8px solid ${C.ink}`, overflow: 'hidden', position: 'relative', background: '#26402f', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>
			<div style={{position: 'absolute', inset: -150, transform: `rotate(${rot}deg)`}}>
				{[...Array(8)].map((_, i) => (
					<div key={`h${i}`} style={{position: 'absolute', left: 0, right: 0, top: 30 + i * 80, height: i % 3 === 0 ? 20 : 9, background: '#d4dcd7'}} />
				))}
				{[...Array(8)].map((_, i) => (
					<div key={`v${i}`} style={{position: 'absolute', top: 0, bottom: 0, left: 40 + i * 85, width: i % 2 ? 9 : 16, background: '#d4dcd7'}} />
				))}
				<div style={{position: 'absolute', left: 340, top: 250, width: 120, height: 80, background: '#3d7a52'}} />
				{/* destination blip */}
				<div style={{position: 'absolute', left: 440, top: 410, width: 36, height: 36, borderRadius: '50%', background: C.yellow, border: `4px solid ${C.ink}`}} />
			</div>
			{/* player arrow */}
			<div style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) scale(${pulse})`}}>
				<svg width="48" height="48" viewBox="0 0 24 24">
					<path d="M12 2 L20 21 L12 16 L4 21 Z" fill={C.pink} stroke="white" strokeWidth="2" strokeLinejoin="round" />
				</svg>
			</div>
			<div style={{position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', fontFamily: uiFont, fontWeight: 900, fontSize: 26, color: 'white', textShadow: outline(2)}}>N</div>
		</div>
	);
};

const HUD: React.FC = () => {
	const frame = useCurrentFrame();
	const start = T.reception[0];
	const show = usePop(start, 16);
	if (frame < start || frame >= T.passed[0]) return null;

	const minutes = interpolate(frame, [start, T.passed[0]], [9 * 60, 16 * 60 + 30], clamp);
	const clock = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(Math.floor((minutes % 60) / 10) * 10).padStart(2, '0')}`;
	const patients = Math.round(interpolate(frame, [start + 80, T.passed[0]], [0, 24], clamp));
	const stars = interpolate(frame, [start + 40, T.passed[0] - 20], [1, 5], clamp);

	return (
		<AbsoluteFill style={{opacity: show}}>
			{/* top-right stack */}
			<div style={{position: 'absolute', top: 70, right: 46, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, transform: `translateX(${(1 - show) * 400}px)`}}>
				<G size={52} style={{direction: 'ltr'}}>{clock}</G>
				<G size={74} color={C.green} stroke={5} style={{display: 'flex', gap: 14}}>
					<span>مراجعة</span>
					<span style={{direction: 'ltr', unicodeBidi: 'isolate'}}>{patients}</span>
				</G>
				<div style={{display: 'flex', gap: 6, direction: 'ltr'}}>
					{[...Array(5)].map((_, i) => (
						<span key={i} style={{fontSize: 54, color: i < Math.floor(stars) ? C.yellow : 'rgba(255,255,255,0.35)', textShadow: outline(3)}}>
							★
						</span>
					))}
				</div>
			</div>

			{/* bottom-left minimap + bars */}
			<div style={{position: 'absolute', bottom: 70, left: 46, transform: `translateX(${(1 - show) * -400}px)`}}>
				<MiniMap />
				<div style={{display: 'flex', gap: 8, marginTop: 10, width: 300}}>
					<div style={{flex: 1, height: 16, background: 'rgba(0,0,0,0.6)', border: `3px solid ${C.ink}`}}>
						<div style={{width: '100%', height: '100%', background: C.green}} />
					</div>
					<div style={{flex: 1, height: 16, background: 'rgba(0,0,0,0.6)', border: `3px solid ${C.ink}`}}>
						<div style={{width: `${interpolate(frame, [start, T.passed[0]], [100, 70], clamp)}%`, height: '100%', background: C.blue}} />
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

/* ---------------- on-screen text ---------------- */

// Objective line, bottom-center
const Objective: React.FC<{from: number; to: number; pre: string; target: string}> = ({from, to, pre, target}) => {
	const frame = useCurrentFrame();
	const o = interpolate(frame, [from, from + 8, to - 8, to], [0, 1, 1, 0], clamp);
	if (frame < from || frame > to) return null;
	return (
		<div style={{position: 'absolute', bottom: 480, left: 60, right: 60, textAlign: 'center', opacity: o}}>
			<div dir="rtl" style={{fontFamily: uiFont, fontWeight: 900, fontSize: 52, color: C.white, textShadow: outline(3)}}>
				{pre} <span style={{color: C.yellow}}>{target}</span>
			</div>
		</div>
	);
};

// Character dialogue subtitle
const Line: React.FC<{from: number; to: number; who: string; color: string; text: string}> = ({from, to, who, color, text}) => {
	const frame = useCurrentFrame();
	const o = interpolate(frame, [from, from + 6, to - 6, to], [0, 1, 1, 0], clamp);
	if (frame < from || frame > to) return null;
	return (
		<div style={{position: 'absolute', bottom: 480, left: 60, right: 60, textAlign: 'center', opacity: o}}>
			<div dir="rtl" style={{fontFamily: uiFont, fontWeight: 800, fontSize: 48, color: C.white, textShadow: outline(3), lineHeight: 1.4}}>
				<span style={{color}}>{who}:</span> {text}
			</div>
		</div>
	);
};

// Help box top-left
const HelpBox: React.FC<{from: number; to: number; text: string}> = ({from, to, text}) => {
	const frame = useCurrentFrame();
	const o = interpolate(frame, [from, from + 8, to - 8, to], [0, 1, 1, 0], clamp);
	if (frame < from || frame > to) return null;
	return (
		<div dir="rtl" style={{position: 'absolute', top: 70, left: 46, width: 560, background: 'rgba(0,0,0,0.78)', borderRadius: 10, padding: '22px 28px', opacity: o}}>
			<div style={{fontFamily: uiFont, fontWeight: 700, fontSize: 38, color: C.white, lineHeight: 1.45}}>{text}</div>
		</div>
	);
};

const Reward: React.FC<{at: number; text: string}> = ({at, text}) => {
	const frame = useCurrentFrame();
	const d = frame - at;
	if (d < 0 || d > 40) return null;
	return (
		<G size={84} color={C.green} stroke={5} style={{position: 'absolute', right: 46, top: 330 - d * 1.5, opacity: interpolate(d, [0, 5, 30, 40], [0, 1, 1, 0]), direction: 'ltr', unicodeBidi: 'isolate'}}>
			{text}
		</G>
	);
};

/* ---------------- scenes ---------------- */

const SceneEstablish: React.FC = () => {
	const loc = usePop(30, 14);
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill>
			<World src="clinic/reception.jpg" position="center 30%" from={1.35} to={1.08} dur={100} />
			<Letterbox dur={100} />
			<div style={{position: 'absolute', right: 60, bottom: 250, textAlign: 'right', opacity: loc, transform: `translateX(${(1 - loc) * 120}px)`}}>
				<G size={110} color={C.white} stroke={6}>الديوانية</G>
				<G size={52} color={C.yellow} stroke={4}>شارع الأطباء · مجمع المرجان الطبي</G>
			</div>
			<div style={{position: 'absolute', left: 60, top: 230, opacity: interpolate(frame, [10, 22], [0, 1], clamp)}}>
				<G size={44} color={C.white} stroke={3} style={{direction: 'ltr'}}>09:00 AM</G>
			</div>
		</AbsoluteFill>
	);
};

const SceneCharacter: React.FC = () => {
	const frame = useCurrentFrame();
	const card = usePop(10, 10);
	const sub = usePop(22, 14);
	// freeze-frame feel: quick zoom-punch then hold
	const punch = interpolate(frame, [0, 6, 90], [1.45, 1.25, 1.3], {...clamp, easing: Easing.out(Easing.quad)});
	return (
		<AbsoluteFill>
			<World src="clinic/doctor.jpg" position="30% 35%" from={punch} to={punch} dur={90} />
			<AbsoluteFill style={{background: `linear-gradient(transparent 50%, rgba(0,0,0,0.75))`}} />
			<div style={{position: 'absolute', left: 60, right: 60, bottom: 260}}>
				<div style={{transform: `scale(${card}) rotate(-3deg)`, transformOrigin: 'right center'}}>
					<G size={140} color={C.yellow} stroke={7}>د. مروج العوادي</G>
				</div>
				<G size={56} stroke={4} style={{opacity: sub, marginTop: 8}}>أخصائية النسائية والتوليد والعقم</G>
				<G size={44} color={C.pink} stroke={3} style={{opacity: sub, marginTop: 6}}>البورد العراقي · F.I.C.O.G</G>
			</div>
		</AbsoluteFill>
	);
};

const MissionTitle: React.FC<{dur: number}> = ({dur}) => {
	const frame = useCurrentFrame();
	const o = interpolate(frame, [0, 8, dur - 10, dur], [0, 1, 1, 0], clamp);
	const s = usePop(0, 12);
	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: o}}>
			<div style={{textAlign: 'center', transform: `scale(${0.8 + 0.2 * s})`}}>
				<G size={150} color={C.yellow} stroke={7} style={{textAlign: 'center'}}>يوم في العيادة</G>
			</div>
		</AbsoluteFill>
	);
};

const SceneReception: React.FC = () => (
	<AbsoluteFill>
		<World src="clinic/reception.jpg" position="center 35%" from={1.0} to={1.14} dur={190} />
		<Sequence durationInFrames={50}>
			<MissionTitle dur={50} />
		</Sequence>
		<HelpBox from={55} to={135} text="استقبلي المراجعات واحجزي مواعيدهن. كل مراجعة سعيدة ترفع تقييم العيادة ★" />
		<Objective from={55} to={100} pre="اذهبي إلى" target="مكتب الاستقبال" />
		<Line from={102} to={142} who="المراجِعة" color={C.pink} text="عندي موعد مع الدكتورة، أول زيارة إلي." />
		<Line from={144} to={188} who="د. مروج" color={C.yellow} text="هلا بيج، تفضلي استريحي وماكو أي قلق." />
		<Reward at={110} text="+1" />
	</AbsoluteFill>
);

const SERVICES = [
	{icon: '🤰', name: 'متابعة الحمل'},
	{icon: '👶', name: 'التوليد'},
	{icon: '🖥️', name: 'فحص السونار'},
	{icon: '🌱', name: 'علاج العقم'},
	{icon: '🩺', name: 'الأمراض النسائية'},
	{icon: '✨', name: 'التجميل النسائي'},
];

const SceneWheel: React.FC = () => {
	const frame = useCurrentFrame();
	const open = usePop(4, 14);
	const step = Math.floor(interpolate(frame, [18, 85], [0, 8], {...clamp, easing: Easing.out(Easing.cubic)}));
	const sel = step % SERVICES.length; // lands on index 2 (السونار)
	const R = 330;
	const close = interpolate(frame, [125, 140], [1, 0], clamp);
	const chosen = frame >= 88;
	return (
		<AbsoluteFill>
			<World src="clinic/reception.jpg" position="center 35%" from={1.14} to={1.16} dur={140} dim={0.15} />
			{/* slow-mo desaturated overlay */}
			<AbsoluteFill style={{backdropFilter: 'grayscale(0.7) blur(5px)', background: 'rgba(10,10,25,0.45)', opacity: open * close}} />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: close}}>
				<div style={{position: 'relative', width: 2 * R + 220, height: 2 * R + 220, transform: `scale(${open})`}}>
					{/* ring */}
					<div style={{position: 'absolute', inset: 110 - 90, borderRadius: '50%', border: '150px solid rgba(0,0,0,0.6)'}} />
					{/* highlighted wedge */}
					<div
						style={{
							position: 'absolute',
							inset: 20,
							borderRadius: '50%',
							background: `conic-gradient(from ${sel * 60 - 30}deg, ${chosen ? C.yellow : 'rgba(255,255,255,0.85)'} 0deg 60deg, transparent 60deg)`,
							WebkitMaskImage: 'radial-gradient(circle, transparent 48%, black 48.5%, black 69%, transparent 69.5%)',
							maskImage: 'radial-gradient(circle, transparent 48%, black 48.5%, black 69%, transparent 69.5%)',
							opacity: 0.85,
						}}
					/>
					{SERVICES.map((s, i) => {
						const a = (i * 60 - 90) * (Math.PI / 180);
						const x = R + 110 + Math.cos(a) * (R - 40);
						const y = R + 110 + Math.sin(a) * (R - 40);
						const active = i === sel;
						return (
							<div key={s.name} style={{position: 'absolute', left: x - 70, top: y - 70, width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: active ? 92 : 72, filter: active ? 'none' : 'grayscale(0.4)', transition: 'none'}}>
								{s.icon}
							</div>
						);
					})}
					{/* centre label */}
					<div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 380, textAlign: 'center'}}>
						<G size={34} color="rgba(255,255,255,0.8)" stroke={2} style={{textAlign: 'center'}}>اختاري الخدمة</G>
						<G size={70} color={chosen ? C.yellow : C.white} stroke={4} style={{textAlign: 'center'}}>{SERVICES[sel].name}</G>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

const ScanProgress: React.FC<{at: number; dur: number}> = ({at, dur}) => {
	const frame = useCurrentFrame();
	const v = interpolate(frame, [at, at + dur], [0, 100], clamp);
	const o = interpolate(frame, [at - 6, at, at + dur + 6, at + dur + 14], [0, 1, 1, 0], clamp);
	return (
		<div style={{position: 'absolute', left: 190, right: 190, top: 330, opacity: o}}>
			<G size={44} stroke={3} style={{textAlign: 'center', marginBottom: 10}}>جاري الفحص...</G>
			<div style={{height: 30, border: `5px solid ${C.ink}`, background: 'rgba(0,0,0,0.6)'}}>
				<div style={{width: `${v}%`, marginLeft: 'auto', height: '100%', background: `linear-gradient(270deg, ${C.green}, ${C.yellow})`}} />
			</div>
		</div>
	);
};

const SceneScan: React.FC = () => (
	<AbsoluteFill>
		<World src="clinic/ultrasound.jpg" position="center 62%" from={1.05} to={1.28} dur={170} />
		<Objective from={6} to={50} pre="افحصي" target="صحة الأم والجنين" />
		<ScanProgress at={30} dur={50} />
		<Line from={92} to={130} who="د. مروج" color={C.yellow} text="الحمد لله، الجنين بصحة ممتازة ونبضه قوي." />
		<Line from={132} to={168} who="المراجِعة" color={C.pink} text="فرحتيني دكتورة، الله يحفظج!" />
		<Reward at={96} text="+★" />
	</AbsoluteFill>
);

const ScenePassed: React.FC = () => {
	const frame = useCurrentFrame();
	const banner = usePop(8, 9);
	const r1 = usePop(34, 14);
	const r2 = usePop(46, 14);
	const r3 = usePop(58, 14);
	const cta = usePop(85, 10);
	const desat = interpolate(frame, [0, 10], [0, 1], clamp);
	const pulse = 1 + 0.03 * Math.sin(frame / 5);
	return (
		<AbsoluteFill>
			<World src="clinic/doctor.jpg" position="30% 35%" from={1.3} to={1.4} dur={170} />
			<AbsoluteFill style={{backdropFilter: `grayscale(${0.6 * desat})`, background: `rgba(0,0,0,${0.5 * desat})`}} />

			<div style={{position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<div style={{transform: `scale(${banner})`}}>
					<G size={170} color={C.yellow} stroke={8} style={{textAlign: 'center'}}>المهمة اكتملت</G>
				</div>
				<div style={{height: 6, width: 700 * banner, background: C.yellow, boxShadow: outline(2), margin: '10px 0 40px'}} />
				{[
					{t: 'ثقة المراجعات', p: r1},
					{t: 'راحة وخصوصية تامة', p: r2},
					{t: 'تقييم خمس نجوم', p: r3},
				].map(({t, p}) => (
					<G key={t} size={64} color={C.white} stroke={4} style={{opacity: p, transform: `translateY(${(1 - p) * 30}px)`, display: 'flex', gap: 16, marginBottom: 8}}>
						<span style={{color: C.green, direction: 'ltr', unicodeBidi: 'isolate'}}>+</span>
						<span>{t}</span>
					</G>
				))}
			</div>

			<div style={{position: 'absolute', bottom: 200, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${cta})`}}>
				<div style={{background: C.pink, border: `7px solid ${C.ink}`, boxShadow: `10px 12px 0 ${C.ink}`, padding: '16px 60px', transform: `scale(${pulse})`}}>
					<G size={78} stroke={4} style={{textAlign: 'center'}}>احجزي موعدك الآن</G>
				</div>
				<G size={110} stroke={6} style={{direction: 'ltr', marginTop: 26, letterSpacing: 4}}>{PHONE}</G>
			</div>
		</AbsoluteFill>
	);
};

/* ---------------- root ---------------- */

const seq = (r: readonly [number, number]) => ({from: r[0], durationInFrames: r[1] - r[0]});

export const ClinicOpenWorld: React.FC = () => (
	<AbsoluteFill style={{background: C.ink}}>
		<Sequence {...seq(T.establish)}>
			<SceneEstablish />
		</Sequence>
		<Sequence {...seq(T.character)}>
			<SceneCharacter />
		</Sequence>
		<Sequence {...seq(T.reception)}>
			<SceneReception />
		</Sequence>
		<Sequence {...seq(T.wheel)}>
			<SceneWheel />
		</Sequence>
		<Sequence {...seq(T.scan)}>
			<SceneScan />
		</Sequence>
		<Sequence {...seq(T.passed)}>
			<ScenePassed />
		</Sequence>
		<HUD />
		{[T.character[0], T.reception[0], T.scan[0], T.passed[0]].map((t) => (
			<Flash key={t} at={t} />
		))}
	</AbsoluteFill>
);
