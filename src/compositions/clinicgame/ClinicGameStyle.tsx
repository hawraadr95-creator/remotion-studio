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
const {fontFamily: bodyFont} = loadCairo('normal', {
	weights: ['700', '900'],
	subsets: ['arabic', 'latin'],
});

// Sunset "open-world" palette (original, not tied to any game brand)
const C = {
	pink: '#ff3d8b',
	orange: '#ff9f43',
	purple: '#3a1460',
	deep: '#14051f',
	teal: '#2de2c8',
	yellow: '#ffd23f',
	green: '#4cff7a',
	white: '#ffffff',
	ink: '#0a0a0a',
};

const DOCTOR = {
	name: 'د. مروج العوادي',
	title: 'أخصائية النسائية والتوليد والعقم',
	phone: '07855900287',
	city: 'الديوانية',
	address: 'شارع الأطباء - مجمع المرجان الطبي',
};

const SERVICES = [
	'رعاية الحوامل',
	'الولادة الطبيعية والقيصرية',
	'علاج العقم',
	'الجراحة النسائية',
	'التجميل النسائي',
];

/* ---------- shared bits ---------- */

const outline = (w: number, color = C.ink) =>
	[
		`${w}px ${w}px 0 ${color}`,
		`-${w}px ${w}px 0 ${color}`,
		`${w}px -${w}px 0 ${color}`,
		`-${w}px -${w}px 0 ${color}`,
		`0 ${w}px 0 ${color}`,
		`0 -${w}px 0 ${color}`,
		`${w}px 0 0 ${color}`,
		`-${w}px 0 0 ${color}`,
		`${w + 6}px ${w + 8}px 0 ${color}`,
	].join(', ');

const GameText: React.FC<{
	children: React.ReactNode;
	size: number;
	color?: string;
	stroke?: number;
	style?: React.CSSProperties;
}> = ({children, size, color = C.white, stroke = 5, style}) => (
	<div
		dir="rtl"
		style={{
			fontFamily: gameFont,
			fontSize: size,
			color,
			lineHeight: 1.15,
			textShadow: outline(stroke),
			textAlign: 'center',
			...style,
		}}
	>
		{children}
	</div>
);

// Comic / painted-poster look on a photo
const ComicPhoto: React.FC<{
	src: string;
	style?: React.CSSProperties;
	position?: string;
	zoom?: number;
}> = ({src, style, position = 'center', zoom = 1}) => (
	<div style={{position: 'relative', overflow: 'hidden', ...style}}>
		<Img
			src={staticFile(src)}
			style={{
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				objectPosition: position,
				transform: `scale(${zoom})`,
				filter: 'contrast(1.35) saturate(1.55) brightness(1.05)',
			}}
		/>
		{/* warm sunset grade */}
		<AbsoluteFill
			style={{
				background: `linear-gradient(160deg, ${C.orange}55, transparent 45%, ${C.pink}55)`,
				mixBlendMode: 'overlay',
			}}
		/>
		{/* halftone dots */}
		<AbsoluteFill
			style={{
				backgroundImage: 'radial-gradient(rgba(0,0,0,0.28) 1.4px, transparent 1.6px)',
				backgroundSize: '7px 7px',
				mixBlendMode: 'multiply',
			}}
		/>
	</div>
);

const SunsetBg: React.FC = () => {
	const frame = useCurrentFrame();
	const shift = interpolate(frame, [0, 600], [0, 30]);
	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(${180 + shift}deg, ${C.purple} 0%, ${C.pink} 55%, ${C.orange} 100%)`,
			}}
		>
			{/* sun */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: 1180,
					width: 760,
					height: 760,
					marginLeft: -380,
					borderRadius: '50%',
					background: `linear-gradient(${C.yellow}, ${C.orange})`,
					opacity: 0.55,
					filter: 'blur(2px)',
				}}
			/>
			{/* stripes */}
			<AbsoluteFill
				style={{
					backgroundImage:
						'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 3px, transparent 3px 9px)',
				}}
			/>
		</AbsoluteFill>
	);
};

const Flash: React.FC<{at: number}> = ({at}) => {
	const frame = useCurrentFrame();
	const o = interpolate(frame, [at - 2, at, at + 8], [0, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return <AbsoluteFill style={{background: C.white, opacity: o, pointerEvents: 'none'}} />;
};

const usePop = (delay = 0, damping = 12) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return spring({frame: frame - delay, fps, config: {damping, stiffness: 170, mass: 0.8}});
};

const Panel: React.FC<{
	src: string;
	x: number;
	y: number;
	w: number;
	h: number;
	rot: number;
	delay: number;
	from: 'left' | 'right' | 'top' | 'bottom';
	position?: string;
}> = ({src, x, y, w, h, rot, delay, from, position}) => {
	const p = usePop(delay, 14);
	const frame = useCurrentFrame();
	const off = (1 - p) * 1400;
	const dx = from === 'left' ? -off : from === 'right' ? off : 0;
	const dy = from === 'top' ? -off : from === 'bottom' ? off : 0;
	const drift = interpolate(frame, [0, 150], [1.05, 1.15]);
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width: w,
				height: h,
				transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`,
				border: `10px solid ${C.ink}`,
				boxShadow: `14px 16px 0 ${C.ink}`,
				background: C.ink,
			}}
		>
			<ComicPhoto src={src} position={position} zoom={drift} style={{width: '100%', height: '100%'}} />
		</div>
	);
};

/* ---------- scenes ---------- */

// 1) Cover / loading screen collage
const SceneCover: React.FC = () => {
	const frame = useCurrentFrame();
	const titlePop = usePop(28, 9);
	const subPop = usePop(40, 12);
	const load = interpolate(frame, [10, 140], [0, 100], {extrapolateRight: 'clamp'});
	return (
		<AbsoluteFill>
			<SunsetBg />
			<Panel src="clinic/reception.jpg" x={40} y={120} w={560} h={720} rot={-5} delay={0} from="left" position="center 30%" />
			<Panel src="clinic/ultrasound.jpg" x={600} y={200} w={440} h={600} rot={4} delay={6} from="right" position="center 70%" />
			<Panel src="clinic/doctor.jpg" x={150} y={760} w={780} h={780} rot={-2} delay={12} from="bottom" position="40% 30%" />

			<div style={{position: 'absolute', top: 1500, left: 0, right: 0}}>
				<GameText
					size={150}
					color={C.yellow}
					stroke={7}
					style={{transform: `scale(${titlePop}) rotate(-3deg)`}}
				>
					{DOCTOR.name}
				</GameText>
				<GameText size={56} stroke={4} style={{marginTop: 4, opacity: subPop, transform: `translateY(${(1 - subPop) * 40}px)`}}>
					{DOCTOR.title}
				</GameText>
			</div>

			{/* loading bar */}
			<div style={{position: 'absolute', bottom: 70, left: 120, right: 120}}>
				<div style={{fontFamily: bodyFont, fontWeight: 900, color: C.white, fontSize: 30, textAlign: 'left', marginBottom: 8, letterSpacing: 4}}>
					LOADING... {Math.round(load)}%
				</div>
				<div style={{height: 18, border: `4px solid ${C.ink}`, background: 'rgba(0,0,0,0.4)'}}>
					<div style={{width: `${load}%`, height: '100%', background: C.green}} />
				</div>
			</div>
		</AbsoluteFill>
	);
};

// 2) Character select / stats
const StatBar: React.FC<{label: string; value: number; delay: number}> = ({label, value, delay}) => {
	const frame = useCurrentFrame();
	const fill = interpolate(frame, [delay, delay + 25], [0, value], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const p = usePop(delay - 4, 14);
	return (
		<div dir="rtl" style={{marginBottom: 26, opacity: p, transform: `translateX(${(1 - p) * 200}px)`}}>
			<div style={{display: 'flex', justifyContent: 'space-between', fontFamily: gameFont, fontSize: 50, color: C.white, textShadow: outline(3)}}>
				<span>{label}</span>
				<span style={{color: C.yellow}}>{Math.round(fill)}%</span>
			</div>
			<div style={{height: 30, border: `5px solid ${C.ink}`, background: 'rgba(0,0,0,0.5)', marginTop: 6}}>
				<div style={{width: `${fill}%`, height: '100%', background: `linear-gradient(90deg, ${C.teal}, ${C.green})`, marginRight: 0, marginLeft: 'auto'}} />
			</div>
		</div>
	);
};

const SceneCharacter: React.FC = () => {
	const frame = useCurrentFrame();
	const zoom = interpolate(frame, [0, 150], [1.15, 1.3]);
	const tag = usePop(8, 10);
	return (
		<AbsoluteFill style={{background: C.deep}}>
			<ComicPhoto src="clinic/doctor.jpg" position="45% 25%" zoom={zoom} style={{position: 'absolute', inset: 0, height: 1250}} />
			<AbsoluteFill style={{background: `linear-gradient(transparent 40%, ${C.deep} 66%)`}} />

			<div style={{position: 'absolute', top: 90, right: 60, transform: `scale(${tag}) rotate(3deg)`, transformOrigin: 'right top'}}>
				<div style={{background: C.pink, border: `6px solid ${C.ink}`, boxShadow: `10px 10px 0 ${C.ink}`, padding: '10px 34px'}}>
					<GameText size={58} stroke={3}>اختيار الشخصية</GameText>
				</div>
			</div>

			<div style={{position: 'absolute', top: 1110, left: 80, right: 80}}>
				<GameText size={110} color={C.yellow} stroke={6} style={{marginBottom: 30}}>
					{DOCTOR.name}
				</GameText>
				<StatBar label="الخبرة" value={100} delay={20} />
				<StatBar label="الدقة الجراحية" value={100} delay={32} />
				<StatBar label="الاهتمام بالمراجعة" value={100} delay={44} />
				<StatBar label="الخصوصية" value={100} delay={56} />
			</div>
		</AbsoluteFill>
	);
};

// 3) New mission + objectives
const SceneMission: React.FC = () => {
	const frame = useCurrentFrame();
	const head = usePop(0, 9);
	const zoom = interpolate(frame, [0, 165], [1.05, 1.18]);
	return (
		<AbsoluteFill>
			<ComicPhoto src="clinic/reception.jpg" position="center 35%" zoom={zoom} style={{position: 'absolute', inset: 0}} />
			<AbsoluteFill style={{background: 'rgba(10,3,20,0.55)'}} />

			<div style={{position: 'absolute', top: 160, left: 0, right: 0, transform: `scale(${head})`}}>
				<GameText size={70} color={C.teal} stroke={4}>مهمة جديدة</GameText>
				<GameText size={120} color={C.yellow} stroke={6}>صحة الأم والطفل</GameText>
			</div>

			<div dir="rtl" style={{position: 'absolute', top: 640, left: 90, right: 90, background: 'rgba(0,0,0,0.65)', border: `6px solid ${C.ink}`, boxShadow: `12px 12px 0 ${C.ink}`, padding: '40px 50px'}}>
				<div style={{fontFamily: gameFont, fontSize: 54, color: C.pink, textShadow: outline(3), marginBottom: 20}}>الأهداف:</div>
				{SERVICES.map((s, i) => {
					const d = 22 + i * 18;
					const p = usePop(d, 14);
					const done = frame > d + 12;
					return (
						<div key={s} style={{display: 'flex', alignItems: 'center', gap: 26, marginBottom: 24, opacity: p, transform: `translateX(${(1 - p) * -120}px)`}}>
							<div style={{width: 64, height: 64, flexShrink: 0, border: `5px solid ${C.white}`, background: done ? C.green : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, color: C.ink, fontWeight: 900, transform: `scale(${done ? 1 : 0.85})`}}>
								{done ? '✓' : ''}
							</div>
							<div style={{fontFamily: bodyFont, fontWeight: 900, fontSize: 52, color: done ? C.white : '#bbb'}}>{s}</div>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

// 4) Location with original round mini-map
const MiniMap: React.FC = () => {
	const frame = useCurrentFrame();
	const pulse = 1 + 0.25 * Math.sin(frame / 5);
	const rot = interpolate(frame, [0, 120], [0, 25]);
	return (
		<div style={{width: 380, height: 380, borderRadius: '50%', border: `10px solid ${C.ink}`, overflow: 'hidden', position: 'relative', background: '#1f3a2e', boxShadow: `10px 12px 0 ${C.ink}`}}>
			<div style={{position: 'absolute', inset: -100, transform: `rotate(${rot}deg)`}}>
				{[...Array(7)].map((_, i) => (
					<div key={`h${i}`} style={{position: 'absolute', left: 0, right: 0, top: 40 + i * 85, height: i % 3 === 0 ? 22 : 10, background: '#cfd8d3'}} />
				))}
				{[...Array(7)].map((_, i) => (
					<div key={`v${i}`} style={{position: 'absolute', top: 0, bottom: 0, left: 60 + i * 90, width: i % 2 ? 10 : 18, background: '#cfd8d3'}} />
				))}
				<div style={{position: 'absolute', left: 300, top: 330, width: 120, height: 90, background: C.teal, opacity: 0.6}} />
			</div>
			{/* pin */}
			<div style={{position: 'absolute', left: '50%', top: '50%', width: 60, height: 60, marginLeft: -30, marginTop: -30, borderRadius: '50%', background: C.pink, border: `6px solid ${C.white}`, transform: `scale(${pulse})`}} />
			<div style={{position: 'absolute', left: '50%', top: '50%', marginLeft: -10, marginTop: -10, width: 20, height: 20, background: C.white, borderRadius: '50%'}} />
		</div>
	);
};

const SceneLocation: React.FC = () => {
	const frame = useCurrentFrame();
	const zoom = interpolate(frame, [0, 120], [1.25, 1.05]);
	const mapP = usePop(10, 12);
	const txt = usePop(22, 12);
	return (
		<AbsoluteFill style={{background: C.deep}}>
			<ComicPhoto src="clinic/ultrasound.jpg" position="center 65%" zoom={zoom} style={{position: 'absolute', inset: 0}} />
			<AbsoluteFill style={{background: `linear-gradient(${C.deep}cc, transparent 35%, transparent 55%, ${C.deep}ee)`}} />

			<div style={{position: 'absolute', top: 110, left: 70, transform: `scale(${mapP})`, transformOrigin: 'left top'}}>
				<MiniMap />
			</div>

			<div style={{position: 'absolute', bottom: 220, left: 50, right: 50, opacity: txt, transform: `translateY(${(1 - txt) * 80}px)`}}>
				<GameText size={70} color={C.teal} stroke={4}>الموقع</GameText>
				<GameText size={130} color={C.yellow} stroke={6}>{DOCTOR.city}</GameText>
				<GameText size={58} stroke={4}>{DOCTOR.address}</GameText>
			</div>
		</AbsoluteFill>
	);
};

// 5) Mission complete + CTA
const SceneComplete: React.FC = () => {
	const frame = useCurrentFrame();
	const banner = usePop(0, 8);
	const reward = Math.round(interpolate(frame, [20, 60], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
	const cta = usePop(60, 10);
	const blink = Math.floor(frame / 12) % 2 === 0 ? 1 : 0.75;
	return (
		<AbsoluteFill>
			<SunsetBg />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 260}}>
				<div style={{transform: `scale(${banner}) rotate(-4deg)`}}>
					<GameText size={170} color={C.yellow} stroke={8}>المهمة اكتملت</GameText>
				</div>
				<GameText size={84} color={C.green} stroke={5} style={{marginTop: 30, opacity: frame > 18 ? 1 : 0}}>
					راحة وأمان <span dir="ltr" style={{unicodeBidi: 'isolate'}}>+{reward}%</span>
				</GameText>

				<div style={{marginTop: 70, width: 560, height: 560, border: `12px solid ${C.ink}`, boxShadow: `16px 18px 0 ${C.ink}`, transform: `scale(${usePop(30, 12)}) rotate(3deg)`}}>
					<ComicPhoto src="clinic/doctor.jpg" position="40% 30%" zoom={1.15} style={{width: '100%', height: '100%'}} />
				</div>

				<div style={{marginTop: 80, transform: `scale(${cta})`}}>
					<div style={{background: C.pink, border: `8px solid ${C.ink}`, boxShadow: `12px 14px 0 ${C.ink}`, padding: '18px 60px', opacity: blink}}>
						<GameText size={80} stroke={4}>احجزي موعدك الآن</GameText>
					</div>
					<GameText size={110} color={C.white} stroke={6} style={{marginTop: 30, letterSpacing: 4, direction: 'ltr'}}>
						{DOCTOR.phone}
					</GameText>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

/* ---------- timeline ---------- */

export const CLINIC_GAME_DURATION = 690;

export const ClinicGameStyle: React.FC = () => (
	<AbsoluteFill style={{background: C.deep}}>
		<Sequence durationInFrames={150}>
			<SceneCover />
		</Sequence>
		<Sequence from={150} durationInFrames={150}>
			<SceneCharacter />
		</Sequence>
		<Sequence from={300} durationInFrames={165}>
			<SceneMission />
		</Sequence>
		<Sequence from={465} durationInFrames={105}>
			<SceneLocation />
		</Sequence>
		<Sequence from={570} durationInFrames={120}>
			<SceneComplete />
		</Sequence>
		{[150, 300, 465, 570].map((t) => (
			<Flash key={t} at={t} />
		))}
		{/* film grain vignette */}
		<AbsoluteFill style={{boxShadow: 'inset 0 0 220px rgba(0,0,0,0.6)', pointerEvents: 'none'}} />
	</AbsoluteFill>
);
