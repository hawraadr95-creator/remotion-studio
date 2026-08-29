import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';
import {HumanFigure} from '../components/HumanFigure';
import {smoothWindow} from '../components/utils';

const STAIRS = [
	{x: 300, y: 1780, w: 140},
	{x: 380, y: 1700, w: 140},
	{x: 460, y: 1620, w: 140},
	{x: 540, y: 1540, w: 140},
	{x: 620, y: 1460, w: 140},
];

const OBJECTS = [
	{fromX: 200, fromY: 1200, toX: 430, toY: 1360, delay: 668, shape: 'doc'},
	{fromX: 900, fromY: 1150, toX: 660, toY: 1340, delay: 674, shape: 'badge'},
	{fromX: 260, fromY: 1500, toX: 500, toY: 1250, delay: 680, shape: 'check'},
] as const;

const ObjectChip: React.FC<{shape: (typeof OBJECTS)[number]['shape']}> = ({shape}) => {
	if (shape === 'doc') {
		return (
			<svg width={54} height={54} viewBox="0 0 40 40">
				<rect x={8} y={4} width={24} height={32} rx={2} stroke={colors.ink} strokeWidth={2.2} fill={colors.paper} />
				<line x1={13} y1={14} x2={27} y2={14} stroke={colors.graphite} strokeWidth={1.8} />
				<line x1={13} y1={20} x2={27} y2={20} stroke={colors.graphite} strokeWidth={1.8} />
				<line x1={13} y1={26} x2={22} y2={26} stroke={colors.graphite} strokeWidth={1.8} />
			</svg>
		);
	}
	if (shape === 'badge') {
		return (
			<svg width={54} height={54} viewBox="0 0 40 40">
				<circle cx={20} cy={16} r={12} stroke={colors.accent} strokeWidth={2.2} fill={colors.paper} />
				<path d="M15 26l-3 10 8-4 8 4-3-10" stroke={colors.accent} strokeWidth={2.2} fill="none" strokeLinejoin="round" />
			</svg>
		);
	}
	return (
		<svg width={54} height={54} viewBox="0 0 40 40">
			<circle cx={20} cy={20} r={16} stroke={colors.ink} strokeWidth={2.2} fill={colors.paper} />
			<path d="M13 20l5 5 10-11" stroke={colors.ink} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const Scene5Montage: React.FC<{frame: number}> = ({frame}) => {
	const stairsOpacity = smoothWindow(frame, 596, 648, 12);
	const spotlightOpacity = smoothWindow(frame, 638, 706, 12);
	const objectsOpacity = smoothWindow(frame, 664, 734, 12);
	const familyOpacity = interpolate(frame, [690, 712], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<div style={{position: 'absolute', inset: 0}}>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: familyOpacity,
					background: `radial-gradient(circle at 50% 62%, rgba(168,42,30,0.08) 0%, rgba(238,234,225,0) 60%)`,
				}}
			/>

			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: stairsOpacity}}>
				{STAIRS.map((s, i) => {
					const draw = interpolate(frame, [598 + i * 8, 598 + i * 8 + 16], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					return (
						<rect
							key={i}
							x={s.x - (s.w / 2) * draw}
							y={s.y}
							width={s.w * draw}
							height={10}
							fill={colors.charcoal}
							opacity={0.85}
						/>
					);
				})}
			</svg>

			<div style={{position: 'absolute', inset: 0, opacity: spotlightOpacity}}>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: 900,
						width: 900,
						height: 900,
						background: 'conic-gradient(from 200deg at 50% 0%, rgba(24,22,20,0) 0deg, rgba(168,42,30,0.16) 55deg, rgba(24,22,20,0) 110deg)',
						transform: 'translateX(-50%)',
					}}
				/>
				{[0, 1, 2].map((i) => {
					const pulse = (frame - 640 - i * 10) % 46;
					const s = interpolate(pulse, [0, 46], [0.4, 1.3], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
					const o = interpolate(pulse, [0, 20, 46], [0, 0.5, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: '50%',
								top: 1300,
								width: 260,
								height: 340,
								border: `1.5px solid ${colors.ink}`,
								transform: `translate(-50%, -50%) scale(${s})`,
								opacity: frame < 640 ? 0 : o,
							}}
						/>
					);
				})}
			</div>

			<div style={{position: 'absolute', inset: 0, opacity: objectsOpacity}}>
				{OBJECTS.map((o, i) => {
					const p = interpolate(frame, [o.delay, o.delay + 22], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: interpolate(p, [0, 1], [o.fromX, o.toX]),
								top: interpolate(p, [0, 1], [o.fromY, o.toY]),
								opacity: p,
								transform: `scale(${interpolate(p, [0, 1], [0.5, 1])})`,
							}}
						>
							<ObjectChip shape={o.shape} />
						</div>
					);
				})}
			</div>

			<div style={{position: 'absolute', left: 400, top: 1560, opacity: familyOpacity}}>
				<HumanFigure size={150} opacity={0.85} pose={{armsRaise: 0}} />
			</div>
			<div style={{position: 'absolute', left: 700, top: 1600, opacity: familyOpacity}}>
				<HumanFigure size={120} opacity={0.7} pose={{armsRaise: 0}} flip />
			</div>
		</div>
	);
};
