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
import {loadFont as loadCairo} from '@remotion/google-fonts/Cairo';

const {fontFamily} = loadCairo('normal', {weights: ['600', '700', '900'], subsets: ['arabic', 'latin']});

const C = {
	panel: 'rgba(255,255,255,0.94)',
	ink: '#1d2333',
	sub: '#5d6680',
	teal: '#19c3a6',
	tealDark: '#0e8f7a',
	pink: '#ff4f9a',
	gold: '#ffc23d',
	blue: '#3d8bff',
	green: '#35d16f',
	shadow: '0 14px 40px rgba(20,25,45,0.28)',
};

const PHONE = '07855900287';

/* ---------------- timeline ---------------- */

const T = {
	menu: [0, 120],
	reception: [120, 300],
	scan: [300, 480],
	surgery: [480, 630],
	summary: [630, 810],
} as const;

export const CLINIC_SIM_DURATION = T.summary[1];

/* ---------------- helpers ---------------- */

const usePop = (delay: number, damping = 13) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return spring({frame: frame - delay, fps, config: {damping, stiffness: 180, mass: 0.7}});
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Txt: React.FC<{
	size: number;
	color?: string;
	weight?: number;
	style?: React.CSSProperties;
	children: React.ReactNode;
}> = ({size, color = C.ink, weight = 800, style, children}) => (
	<div dir="rtl" style={{fontFamily, fontSize: size, color, fontWeight: weight, lineHeight: 1.3, ...style}}>
		{children}
	</div>
);

// Real photo with a gentle "game camera" feel: slow pan + tilt-shift blur bands
const GameCamera: React.FC<{src: string; position: string; from: number; to: number; dur: number}> = ({
	src,
	position,
	from,
	to,
	dur,
}) => {
	const frame = useCurrentFrame();
	const z = interpolate(frame, [0, dur], [from, to], {easing: Easing.inOut(Easing.quad)});
	const img = (
		<Img
			src={staticFile(src)}
			style={{
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				objectPosition: position,
				transform: `scale(${z})`,
				filter: 'saturate(1.25) contrast(1.08)',
			}}
		/>
	);
	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			{img}
			{/* tilt-shift: blurred copy masked to top & bottom */}
			<AbsoluteFill
				style={{
					filter: 'blur(9px)',
					WebkitMaskImage: 'linear-gradient(black 0%, transparent 28%, transparent 70%, black 100%)',
					maskImage: 'linear-gradient(black 0%, transparent 28%, transparent 70%, black 100%)',
				}}
			>
				{img}
			</AbsoluteFill>
			<AbsoluteFill style={{boxShadow: 'inset 0 0 200px rgba(0,0,0,0.45)'}} />
		</AbsoluteFill>
	);
};

// Original character marker: floating medical-cross badge
const Marker: React.FC<{x: number; y: number}> = ({x, y}) => {
	const frame = useCurrentFrame();
	const p = usePop(4, 10);
	const bob = Math.sin(frame / 8) * 10;
	return (
		<div style={{position: 'absolute', left: x - 45, top: y - 45 + bob, transform: `scale(${p})`}}>
			<div
				style={{
					width: 90,
					height: 90,
					borderRadius: 26,
					background: `linear-gradient(145deg, ${C.pink}, #ff86bd)`,
					transform: 'rotate(45deg)',
					boxShadow: `0 0 30px ${C.pink}, ${C.shadow}`,
					border: '5px solid white',
				}}
			/>
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 58, fontWeight: 900, fontFamily}}>
				+
			</div>
		</div>
	);
};

// Mouse cursor that moves between points and clicks
const Cursor: React.FC<{path: {f: number; x: number; y: number; click?: boolean}[]}> = ({path}) => {
	const frame = useCurrentFrame();
	const fs = path.map((p) => p.f);
	const x = interpolate(frame, fs, path.map((p) => p.x), {...clamp, easing: Easing.inOut(Easing.cubic)});
	const y = interpolate(frame, fs, path.map((p) => p.y), {...clamp, easing: Easing.inOut(Easing.cubic)});
	const clicks = path.filter((p) => p.click);
	let press = 1;
	let ripple: React.ReactNode = null;
	for (const c of clicks) {
		const d = frame - c.f;
		if (d >= 0 && d < 6) press = 0.82;
		if (d >= 0 && d < 16) {
			ripple = (
				<div
					style={{
						position: 'absolute',
						left: c.x - 60,
						top: c.y - 60,
						width: 120,
						height: 120,
						borderRadius: '50%',
						border: '6px solid white',
						opacity: 1 - d / 16,
						transform: `scale(${0.3 + d / 12})`,
					}}
				/>
			);
		}
	}
	return (
		<>
			{ripple}
			<svg
				width="80"
				height="80"
				viewBox="0 0 24 24"
				style={{position: 'absolute', left: x - 8, top: y - 4, transform: `scale(${press})`, transformOrigin: 'top left', filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.45))'}}
			>
				<path d="M3 2 L3 19 L8 14.5 L11.5 22 L14.5 20.7 L11 13.3 L17.5 13.3 Z" fill="white" stroke="#1d2333" strokeWidth="1.4" strokeLinejoin="round" />
			</svg>
		</>
	);
};

// Radial/list action menu next to the character
const ActionMenu: React.FC<{x: number; y: number; items: string[]; at: number; selected: number; selectAt: number}> = ({
	x,
	y,
	items,
	at,
	selected,
	selectAt,
}) => {
	const frame = useCurrentFrame();
	const p = usePop(at, 14);
	const gone = interpolate(frame, [selectAt + 8, selectAt + 16], [1, 0], clamp);
	return (
		<div style={{position: 'absolute', left: x, top: y, transform: `scale(${p * gone})`, transformOrigin: 'top right', opacity: frame < at ? 0 : gone}}>
			{items.map((it, i) => {
				const isSel = i === selected && frame >= selectAt;
				const ip = usePop(at + i * 3, 14);
				return (
					<div
						key={it}
						dir="rtl"
						style={{
							fontFamily,
							fontWeight: 800,
							fontSize: 44,
							color: isSel ? 'white' : C.ink,
							background: isSel ? C.teal : C.panel,
							borderRadius: 999,
							padding: '14px 44px',
							marginBottom: 16,
							boxShadow: C.shadow,
							transform: `translateX(${(1 - ip) * 80}px) scale(${isSel ? 1.06 : 1})`,
							opacity: ip,
							whiteSpace: 'nowrap',
						}}
					>
						◂ {it}
					</div>
				);
			})}
		</div>
	);
};

// Notification toast (top-left stack)
const Toast: React.FC<{at: number; icon: string; text: string; color?: string; y?: number}> = ({at, icon, text, color = C.green, y = 300}) => {
	const frame = useCurrentFrame();
	const p = usePop(at, 14);
	const out = interpolate(frame, [at + 60, at + 72], [0, 1], clamp);
	if (frame < at) return null;
	return (
		<div
			dir="rtl"
			style={{
				position: 'absolute',
				right: 40,
				top: y,
				display: 'flex',
				alignItems: 'center',
				gap: 20,
				background: C.panel,
				borderRadius: 28,
				padding: '18px 34px 18px 22px',
				boxShadow: C.shadow,
				borderRight: `12px solid ${color}`,
				transform: `translateX(${(1 - p) * 600 + out * 700}px)`,
			}}
		>
			<div style={{fontSize: 52}}>{icon}</div>
			<Txt size={42}>{text}</Txt>
		</div>
	);
};

// Floating reward pill rising from a point
const FloatReward: React.FC<{at: number; x: number; y: number; label: string; value: string; color?: string}> = ({at, x, y, label, value, color = C.green}) => {
	const frame = useCurrentFrame();
	const d = frame - at;
	if (d < 0 || d > 45) return null;
	return (
		<div style={{position: 'absolute', left: x - 300, width: 600, top: y - d * 3, display: 'flex', justifyContent: 'center', opacity: interpolate(d, [0, 6, 35, 45], [0, 1, 1, 0])}}>
			<div dir="rtl" style={{background: color, borderRadius: 999, padding: '10px 36px', boxShadow: C.shadow, border: '4px solid white', display: 'flex', gap: 14}}>
				<Txt size={52} weight={900} color="white">{label}</Txt>
				<Txt size={52} weight={900} color="white" style={{direction: 'ltr', unicodeBidi: 'isolate'}}>{value}</Txt>
			</div>
		</div>
	);
};

// In-world progress bar ("action in progress")
const ActionProgress: React.FC<{at: number; dur: number; label: string; x: number; y: number}> = ({at, dur, label, x, y}) => {
	const frame = useCurrentFrame();
	const p = usePop(at, 14);
	const v = interpolate(frame, [at + 6, at + 6 + dur], [0, 100], clamp);
	const out = interpolate(frame, [at + dur + 14, at + dur + 22], [1, 0], clamp);
	if (frame < at) return null;
	return (
		<div style={{position: 'absolute', left: x - 330, top: y, width: 660, background: C.panel, borderRadius: 30, padding: '22px 30px', boxShadow: C.shadow, transform: `scale(${p * out})`, opacity: out}}>
			<Txt size={40} style={{display: 'flex', justifyContent: 'space-between'}}>
				<span>{label}</span>
				<span style={{color: C.tealDark}}>{Math.round(v)}%</span>
			</Txt>
			<div style={{height: 26, borderRadius: 13, background: '#e4e8f0', marginTop: 10, overflow: 'hidden'}}>
				<div style={{width: `${v}%`, marginLeft: 'auto', height: '100%', background: `linear-gradient(270deg, ${C.teal}, ${C.blue})`}} />
			</div>
		</div>
	);
};

/* ---------------- persistent HUD ---------------- */

const Need: React.FC<{icon: string; label: string; value: number; color: string}> = ({icon, label, value, color}) => (
	<div style={{flex: 1}}>
		<Txt size={30} color={C.sub} weight={700} style={{display: 'flex', gap: 8, alignItems: 'center'}}>
			<span>{icon}</span>
			<span>{label}</span>
		</Txt>
		<div style={{height: 22, borderRadius: 11, background: '#e4e8f0', marginTop: 6, overflow: 'hidden'}}>
			<div style={{width: `${value}%`, marginLeft: 'auto', height: '100%', background: color, borderRadius: 11}} />
		</div>
	</div>
);

const HUD: React.FC = () => {
	const frame = useCurrentFrame();
	const show = usePop(T.reception[0] - 10, 16);
	if (frame < T.reception[0] - 10 || frame >= T.summary[0]) return null;

	// in-game clock: 9:00 → 17:00 across gameplay
	const minutes = interpolate(frame, [T.reception[0], T.summary[0]], [9 * 60, 17 * 60], clamp);
	const hh = Math.floor(minutes / 60);
	const mm = Math.floor(minutes % 60 / 10) * 10;
	const clock = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;

	const patients = Math.round(interpolate(frame, [T.reception[0] + 60, T.surgery[1]], [0, 24], clamp));
	const rating = interpolate(frame, [T.reception[0], T.surgery[1]], [4.2, 5], clamp).toFixed(1);
	const happy = interpolate(frame, [T.reception[0], T.scan[0] + 140, T.surgery[1]], [55, 85, 100], clamp);
	const energy = interpolate(frame, [T.reception[0], T.surgery[1]], [100, 80], clamp);

	const chip = (children: React.ReactNode) => (
		<div style={{background: C.panel, borderRadius: 999, padding: '10px 28px', boxShadow: C.shadow, display: 'flex', alignItems: 'center', gap: 12}}>{children}</div>
	);

	return (
		<AbsoluteFill style={{opacity: show}}>
			{/* top bar */}
			<div dir="rtl" style={{position: 'absolute', top: 60, left: 36, right: 36, display: 'flex', justifyContent: 'space-between', transform: `translateY(${(1 - show) * -150}px)`}}>
				{chip(<Txt size={38}>اليوم 1</Txt>)}
				{chip(
					<>
						<Txt size={38} style={{direction: 'ltr'}}>{clock}</Txt>
						<Txt size={30} color={C.tealDark} style={{direction: 'ltr'}}>▶▶</Txt>
					</>,
				)}
				{chip(
					<Txt size={38} style={{display: 'flex', gap: 10}}>
						<span style={{color: C.gold}}>★</span>
						<span style={{direction: 'ltr'}}>{rating}</span>
					</Txt>,
				)}
			</div>
			{/* patients counter */}
			<div dir="rtl" style={{position: 'absolute', top: 160, right: 36, transform: `translateY(${(1 - show) * -150}px)`}}>
				{chip(
					<Txt size={34} color={C.sub}>
						المراجعات اليوم: <span style={{color: C.ink, fontWeight: 900}}>{patients}</span>
					</Txt>,
				)}
			</div>
			{/* needs panel */}
			<div
				dir="rtl"
				style={{
					position: 'absolute',
					bottom: 50,
					left: 36,
					right: 36,
					background: C.panel,
					borderRadius: 36,
					padding: '24px 34px',
					boxShadow: C.shadow,
					display: 'flex',
					alignItems: 'center',
					gap: 30,
					transform: `translateY(${(1 - show) * 300}px)`,
				}}
			>
				<div style={{width: 120, height: 120, borderRadius: 30, overflow: 'hidden', border: `5px solid ${C.teal}`, flexShrink: 0}}>
					<Img src={staticFile('clinic/doctor.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '38% 35%', transform: 'scale(1.6)'}} />
				</div>
				<div style={{flex: 1}}>
					<Txt size={40} weight={900}>د. مروج العوادي</Txt>
					<div style={{display: 'flex', gap: 26, marginTop: 8}}>
						<Need icon="😊" label="رضا المراجعات" value={happy} color={C.green} />
						<Need icon="⚡" label="الطاقة" value={energy} color={C.gold} />
						<Need icon="✨" label="النظافة" value={100} color={C.blue} />
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

/* ---------------- scenes ---------------- */

const SceneMenu: React.FC = () => {
	const frame = useCurrentFrame();
	const card = usePop(6, 14);
	const title = usePop(14, 12);
	const btnPressed = frame >= 92 && frame < 100;
	return (
		<AbsoluteFill>
			<GameCamera src="clinic/reception.jpg" position="center 30%" from={1.2} to={1.1} dur={120} />
			<AbsoluteFill style={{background: 'rgba(15,20,40,0.45)', backdropFilter: 'blur(6px)'}} />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div style={{width: 880, background: C.panel, borderRadius: 50, padding: '60px 50px', boxShadow: C.shadow, transform: `scale(${card})`, textAlign: 'center'}}>
					<Txt size={40} color={C.tealDark} style={{textAlign: 'center'}}>محاكي العيادة</Txt>
					<Txt size={92} weight={900} style={{textAlign: 'center', transform: `scale(${title})`, marginTop: 4}}>
						عيادة د. مروج
					</Txt>
					<Txt size={38} color={C.sub} weight={700} style={{textAlign: 'center', marginBottom: 46}}>
						النسائية والتوليد والعقم · الديوانية
					</Txt>
					{['لعبة جديدة', 'متابعة', 'الإعدادات'].map((b, i) => {
						const bp = usePop(26 + i * 6, 14);
						const primary = i === 0;
						return (
							<div
								key={b}
								dir="rtl"
								style={{
									fontFamily,
									fontWeight: 900,
									fontSize: 50,
									margin: '0 auto 22px',
									width: 600,
									padding: '20px 0',
									borderRadius: 999,
									color: primary ? 'white' : C.sub,
									background: primary ? `linear-gradient(90deg, ${C.teal}, ${C.blue})` : '#eef1f6',
									transform: `scale(${bp * (primary && btnPressed ? 0.93 : 1)})`,
									opacity: primary ? 1 : 0.8,
									boxShadow: primary ? '0 10px 24px rgba(25,195,166,0.45)' : 'none',
								}}
							>
								{b}
							</div>
						);
					})}
				</div>
			</AbsoluteFill>
			<Cursor path={[{f: 40, x: 900, y: 1650}, {f: 85, x: 560, y: 1060}, {f: 92, x: 560, y: 1060, click: true}, {f: 120, x: 560, y: 1060}]} />
			<AbsoluteFill style={{background: 'white', opacity: interpolate(frame, [104, 112, 120], [0, 1, 0], clamp)}} />
		</AbsoluteFill>
	);
};

const SceneReception: React.FC = () => (
	<AbsoluteFill>
		<GameCamera src="clinic/reception.jpg" position="center 35%" from={1.0} to={1.12} dur={180} />
		<Marker x={620} y={700} />
		<Cursor path={[{f: 15, x: 300, y: 1400}, {f: 40, x: 640, y: 900}, {f: 46, x: 640, y: 900, click: true}, {f: 70, x: 640, y: 900}, {f: 82, x: 560, y: 1030}, {f: 88, x: 560, y: 1030, click: true}, {f: 180, x: 520, y: 1200}]} />
		<ActionMenu x={180} y={880} at={48} items={['استقبال مراجعة جديدة', 'حجز موعد', 'استشارة']} selected={0} selectAt={88} />
		<Toast at={100} icon="🤰" text="وصلت مراجعة جديدة!" color={C.pink} />
		<FloatReward at={104} x={620} y={620} label="مراجعة" value="+1" />
		<Toast at={130} icon="📅" text="تم تأكيد الموعد" y={420} />
	</AbsoluteFill>
);

const SceneScan: React.FC = () => (
	<AbsoluteFill>
		<GameCamera src="clinic/ultrasound.jpg" position="center 62%" from={1.05} to={1.25} dur={180} />
		<Marker x={560} y={820} />
		<Cursor path={[{f: 10, x: 800, y: 1400}, {f: 32, x: 560, y: 1060}, {f: 38, x: 560, y: 1060, click: true}, {f: 60, x: 560, y: 1060}, {f: 72, x: 520, y: 1150}, {f: 78, x: 520, y: 1150, click: true}, {f: 180, x: 760, y: 1500}]} />
		<ActionMenu x={130} y={960} at={40} items={['فحص سونار', 'متابعة الحمل', 'تقييم صحة الجنين']} selected={0} selectAt={78} />
		<ActionProgress at={92} dur={45} label="جاري فحص السونار..." x={540} y={420} />
		<Toast at={146} icon="💗" text="الأم والجنين بخير" />
		<FloatReward at={146} x={540} y={760} label="رضا ❤" value="+15" color={C.pink} />
	</AbsoluteFill>
);

const LevelUp: React.FC<{at: number}> = ({at}) => {
	const frame = useCurrentFrame();
	const p = usePop(at, 9);
	const out = interpolate(frame, [at + 70, at + 82], [1, 0], clamp);
	if (frame < at) return null;
	return (
		<div style={{position: 'absolute', left: 90, right: 90, top: 1060, transform: `scale(${p})`, opacity: out}}>
			<div style={{background: `linear-gradient(135deg, ${C.gold}, #ff9f43)`, borderRadius: 40, padding: '34px 40px', boxShadow: C.shadow, border: '6px solid white', textAlign: 'center'}}>
				<Txt size={46} color="white" style={{textAlign: 'center', textShadow: '0 3px 0 rgba(0,0,0,0.2)'}}>⬆ ارتقاء مهارة</Txt>
				<Txt size={78} weight={900} color="white" style={{textAlign: 'center', textShadow: '0 4px 0 rgba(0,0,0,0.25)'}}>الجراحة النسائية</Txt>
				<div style={{display: 'flex', justifyContent: 'center', gap: 14, marginTop: 14}}>
					{[...Array(10)].map((_, i) => (
						<div key={i} style={{width: 46, height: 46, borderRadius: 12, background: frame > at + 8 + i * 3 ? 'white' : 'rgba(255,255,255,0.35)', transform: `scale(${frame > at + 8 + i * 3 ? 1 : 0.8})`}} />
					))}
				</div>
				<Txt size={40} color="white" style={{textAlign: 'center', marginTop: 12}}>المستوى 10 · الحد الأعلى</Txt>
			</div>
		</div>
	);
};

const SceneSurgery: React.FC = () => (
	<AbsoluteFill>
		<GameCamera src="clinic/doctor.jpg" position="26% 40%" from={1.05} to={1.2} dur={150} />
		<Marker x={760} y={300} />
		<Toast at={8} icon="🏥" text="مهمة: عملية نسائية دقيقة" color={C.blue} />
		<ActionProgress at={20} dur={40} label="العملية جارية..." x={540} y={1330} />
		<LevelUp at={84} />
	</AbsoluteFill>
);

const StatRow: React.FC<{label: string; value: string; delay: number}> = ({label, value, delay}) => {
	const p = usePop(delay, 14);
	return (
		<div dir="rtl" style={{display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '2px solid #e6e9f0', opacity: p, transform: `translateX(${(1 - p) * -60}px)`}}>
			<Txt size={44} color={C.sub} weight={700}>{label}</Txt>
			<Txt size={44} weight={900} style={{direction: 'ltr'}}>{value}</Txt>
		</div>
	);
};

const SceneSummary: React.FC = () => {
	const frame = useCurrentFrame();
	const card = usePop(4, 14);
	const cta = usePop(95, 10);
	const pulse = 1 + 0.03 * Math.sin(frame / 5);
	return (
		<AbsoluteFill>
			<GameCamera src="clinic/reception.jpg" position="center 30%" from={1.1} to={1.2} dur={180} />
			<AbsoluteFill style={{background: 'rgba(15,20,40,0.5)', backdropFilter: 'blur(8px)'}} />
			<div style={{position: 'absolute', top: 150, left: 70, right: 70, background: C.panel, borderRadius: 50, padding: '50px 56px', boxShadow: C.shadow, transform: `scale(${card})`}}>
				<Txt size={42} color={C.tealDark} style={{textAlign: 'center'}}>انتهى اليوم 1</Txt>
				<Txt size={84} weight={900} style={{textAlign: 'center', marginBottom: 20}}>ملخص اليوم</Txt>
				<StatRow label="المراجعات" value="24" delay={20} />
				<StatRow label="فحوصات السونار" value="12" delay={28} />
				<StatRow label="رضا المراجعات" value="100%" delay={36} />
				<div dir="rtl" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0'}}>
					<Txt size={44} color={C.sub} weight={700}>التقييم</Txt>
					<div style={{display: 'flex', gap: 6}}>
						{[...Array(5)].map((_, i) => {
							const s = usePop(46 + i * 5, 9);
							return (
								<span key={i} style={{fontSize: 64, color: C.gold, transform: `scale(${s})`, display: 'inline-block'}}>
									★
								</span>
							);
						})}
					</div>
				</div>
				<div style={{marginTop: 16, background: '#e9fbf6', border: `3px dashed ${C.teal}`, borderRadius: 28, padding: '18px 24px', opacity: usePop(75, 14)}}>
					<Txt size={40} color={C.tealDark} style={{textAlign: 'center'}}>🏆 إنجاز جديد: ثقة المراجعات</Txt>
				</div>
			</div>

			<div style={{position: 'absolute', bottom: 150, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${cta})`}}>
				<div style={{background: `linear-gradient(90deg, ${C.pink}, #ff7a59)`, borderRadius: 999, padding: '26px 80px', boxShadow: '0 14px 34px rgba(255,79,154,0.5)', transform: `scale(${pulse})`}}>
					<Txt size={68} weight={900} color="white" style={{textAlign: 'center'}}>احجزي موعدك الآن</Txt>
				</div>
				<Txt size={92} weight={900} color="white" style={{direction: 'ltr', marginTop: 26, letterSpacing: 3, textShadow: '0 6px 20px rgba(0,0,0,0.5)'}}>
					{PHONE}
				</Txt>
				<Txt size={40} color="white" weight={700} style={{textShadow: '0 4px 14px rgba(0,0,0,0.6)'}}>
					الديوانية · شارع الأطباء · مجمع المرجان الطبي
				</Txt>
			</div>
		</AbsoluteFill>
	);
};

/* ---------------- root ---------------- */

const seq = (r: readonly [number, number]) => ({from: r[0], durationInFrames: r[1] - r[0]});

export const ClinicSimulator: React.FC = () => (
	<AbsoluteFill style={{background: '#0f1428'}}>
		<Sequence {...seq(T.menu)}>
			<SceneMenu />
		</Sequence>
		<Sequence {...seq(T.reception)}>
			<SceneReception />
		</Sequence>
		<Sequence {...seq(T.scan)}>
			<SceneScan />
		</Sequence>
		<Sequence {...seq(T.surgery)}>
			<SceneSurgery />
		</Sequence>
		<Sequence {...seq(T.summary)}>
			<SceneSummary />
		</Sequence>
		<HUD />
	</AbsoluteFill>
);
