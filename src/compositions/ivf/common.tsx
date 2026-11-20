import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadTajawal} from '@remotion/google-fonts/Tajawal';
import {captionTimings, TIMELINE} from './script';

const {fontFamily: tajawal} = loadTajawal('normal', {weights: ['400', '500', '700', '800'], subsets: ['arabic', 'latin']});

export const font = tajawal;

export const K = {
	bg: '#140d0b',
	bg2: '#24160f',
	gold: '#d9b26f',
	goldLight: '#f3dcae',
	beige: '#efe2cf',
	cream: '#fbf5ec',
	rose: '#e9a3b4',
	roseDeep: '#c76f89',
	white: '#ffffff',
	text: '#fbf5ec',
	muted: 'rgba(251,245,236,0.7)',
};

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const useRise = (delay = 0, damping = 200) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return spring({frame: frame - delay, fps, config: {damping, stiffness: 90, mass: 1}});
};

/* Warm cinematic background with drifting bokeh */
export const Bokeh: React.FC<{seed?: string; count?: number; tint?: string}> = ({seed = 'b', count = 26, tint = K.gold}) => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{background: `radial-gradient(120% 80% at 50% 35%, ${K.bg2} 0%, ${K.bg} 70%)`, overflow: 'hidden'}}>
			{[...Array(count)].map((_, i) => {
				const r = (k: string) => random(`${seed}-${i}-${k}`);
				const size = 30 + r('s') * 170;
				const x = r('x') * 1080;
				const y = (r('y') * 2100 - frame * (0.15 + r('v') * 0.5)) % 2100;
				const col = r('c') > 0.6 ? K.rose : tint;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x - size / 2,
							top: (y < -200 ? y + 2100 : y) - size / 2,
							width: size,
							height: size,
							borderRadius: '50%',
							background: `radial-gradient(circle, ${col}55 0%, ${col}22 45%, transparent 70%)`,
							filter: `blur(${2 + r('b') * 6}px)`,
							opacity: 0.35 + 0.35 * Math.sin(frame / 40 + i),
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

/* Scene wrapper with soft cinematic in/out (fade + blur + gentle scale) */
export const SceneShell: React.FC<{dur: number; children: React.ReactNode; fadeIn?: number; fadeOut?: number}> = ({
	dur,
	children,
	fadeIn = 14,
	fadeOut = 14,
}) => {
	const frame = useCurrentFrame();
	const o = interpolate(frame, [0, fadeIn, dur - fadeOut, dur], [0, 1, 1, 0], clamp);
	const blur = interpolate(frame, [0, fadeIn, dur - fadeOut, dur], [12, 0, 0, 12], clamp);
	const s = interpolate(frame, [0, dur], [1.02, 1.0], {easing: Easing.out(Easing.quad)});
	return <AbsoluteFill style={{opacity: o, filter: blur > 0.2 ? `blur(${blur}px)` : undefined, transform: `scale(${s})`}}>{children}</AbsoluteFill>;
};

/* Step heading at the top: small gold index + title */
export const StepTitle: React.FC<{index?: string; title: string; subtitle?: string}> = ({index, title, subtitle}) => {
	const p = useRise(6);
	const line = useRise(14);
	return (
		<div dir="rtl" style={{position: 'absolute', top: 170, left: 80, right: 80, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
			{index && (
				<div style={{fontFamily: font, fontWeight: 500, fontSize: 34, letterSpacing: 6, color: K.gold, marginBottom: 6}}>{index}</div>
			)}
			<div style={{fontFamily: font, fontWeight: 800, fontSize: 78, color: K.cream, lineHeight: 1.2, textShadow: '0 4px 30px rgba(0,0,0,0.5)'}}>{title}</div>
			<div style={{height: 3, width: 220 * line, margin: '22px auto 0', background: `linear-gradient(90deg, transparent, ${K.gold}, transparent)`}} />
			{subtitle && (
				<div style={{fontFamily: font, fontWeight: 500, fontSize: 38, color: K.muted, marginTop: 16, opacity: line}}>{subtitle}</div>
			)}
		</div>
	);
};

/* Callout label with a thin gold leader line pointing at (x,y) */
export const Callout: React.FC<{x: number; y: number; text: string; side: 'left' | 'right'; at: number; dy?: number}> = ({x, y, text, side, at, dy = -120}) => {
	const frame = useCurrentFrame();
	const p = interpolate(frame, [at, at + 18], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const len = 150;
	const ex = side === 'left' ? x - len : x + len;
	const ey = y + dy;
	return (
		<>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
				<circle cx={x} cy={y} r={10 * p} fill="none" stroke={K.goldLight} strokeWidth={3} />
				<circle cx={x} cy={y} r={4 * p} fill={K.goldLight} />
				<polyline
					points={`${x},${y} ${x + (ex - x) * 0.4},${ey} ${ex},${ey}`}
					fill="none"
					stroke={K.gold}
					strokeWidth={2.5}
					strokeDasharray={600}
					strokeDashoffset={600 * (1 - p)}
				/>
			</svg>
			<div
				dir="rtl"
				style={{
					position: 'absolute',
					top: ey - 34,
					...(side === 'left' ? {right: 1080 - ex + 16} : {left: ex + 16}),
					fontFamily: font,
					fontWeight: 700,
					fontSize: 38,
					color: K.cream,
					background: 'rgba(20,13,11,0.6)',
					border: `1.5px solid ${K.gold}88`,
					borderRadius: 14,
					padding: '8px 20px',
					opacity: p,
					whiteSpace: 'nowrap',
					backdropFilter: 'blur(6px)',
				}}
			>
				{text}
			</div>
		</>
	);
};

/* Global synced captions (lower third) */
export const Captions: React.FC = () => {
	const frame = useCurrentFrame();
	const all = TIMELINE.flatMap(captionTimings);
	const cur = all.find((c) => frame >= c.from && frame < c.to);
	if (!cur) return null;
	const o = interpolate(frame, [cur.from, cur.from + 6, cur.to - 5, cur.to], [0, 1, 1, 0], clamp);
	const y = interpolate(frame, [cur.from, cur.from + 8], [14, 0], clamp);
	return (
		<div style={{position: 'absolute', left: 70, right: 70, bottom: 250, display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${y}px)`}}>
			<div
				dir="rtl"
				style={{
					fontFamily: font,
					fontWeight: 700,
					fontSize: 50,
					lineHeight: 1.55,
					color: K.white,
					textAlign: 'center',
					background: 'rgba(15,10,8,0.55)',
					borderRadius: 22,
					padding: '16px 34px',
					backdropFilter: 'blur(10px)',
					boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
				}}
			>
				{cur.text}
			</div>
		</div>
	);
};

/* Subtle film grain + vignette + light leak, over everything */
export const FilmFinish: React.FC = () => {
	const frame = useCurrentFrame();
	const leak = 0.18 + 0.1 * Math.sin(frame / 45);
	return (
		<>
			<AbsoluteFill
				style={{
					background: `radial-gradient(60% 40% at ${20 + 10 * Math.sin(frame / 90)}% 10%, rgba(255,200,140,${leak}) 0%, transparent 70%)`,
					mixBlendMode: 'screen',
					pointerEvents: 'none',
				}}
			/>
			<AbsoluteFill style={{boxShadow: 'inset 0 0 260px rgba(0,0,0,0.65)', pointerEvents: 'none'}} />
		</>
	);
};

/* Small brand mark */
export const Brand: React.FC = () => (
	<div dir="rtl" style={{position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center', fontFamily: font, fontWeight: 500, fontSize: 30, letterSpacing: 2, color: `${K.goldLight}cc`}}>
		عيادة د. مروج العوادي · النسائية والتوليد والعقم
	</div>
);
