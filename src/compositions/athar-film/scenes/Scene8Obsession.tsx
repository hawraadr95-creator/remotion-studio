import React, {useMemo} from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';

const DENSITY_MARKS = 16;

export const Scene8Obsession: React.FC<{frame: number}> = ({frame}) => {
	const monumentScale = interpolate(frame, [1089, 1280], [1, 1.85], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const clockOpacity = interpolate(frame, [1089, 1120], [0, 0.22], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const handAngle = (frame - 1089) * 2.6;
	const shadowLength = interpolate(frame, [1089, 1280], [80, 620], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const marks = useMemo(
		() =>
			Array.from({length: DENSITY_MARKS}).map((_, i) => ({
				x: 140 + ((i * 761) % 820),
				y: 250 + ((i * 337) % 1400),
				delay: 1095 + i * 10,
				r: (i % 5) + 6,
			})),
		[],
	);

	return (
		<div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: 1720,
					transform: `translate(-50%, -100%) scale(${monumentScale})`,
					transformOrigin: '50% 100%',
				}}
			>
				<svg width={520} height={1400} viewBox="0 0 520 1400">
					<defs>
						<linearGradient id="monumentGrad2" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={colors.graphite} />
							<stop offset="70%" stopColor={colors.ink} />
						</linearGradient>
					</defs>
					<path
						d="M260 20 C 200 20 170 90 170 170 L120 1380 L400 1380 L350 170 C 350 90 320 20 260 20 Z"
						fill="url(#monumentGrad2)"
					/>
				</svg>
			</div>

			<div
				style={{
					position: 'absolute',
					right: 90,
					top: 130,
					width: shadowLength,
					height: 3,
					background: colors.ink,
					opacity: 0.18,
					transform: 'rotate(38deg)',
					transformOrigin: 'right top',
				}}
			/>

			<div style={{position: 'absolute', right: 100, top: 130, width: 220, height: 220, opacity: clockOpacity}}>
				<svg width={220} height={220}>
					<circle cx={110} cy={110} r={100} stroke={colors.ink} strokeWidth={2} fill="none" />
					<line
						x1={110}
						y1={110}
						x2={110 + Math.cos(((handAngle - 90) * Math.PI) / 180) * 70}
						y2={110 + Math.sin(((handAngle - 90) * Math.PI) / 180) * 70}
						stroke={colors.ink}
						strokeWidth={3}
					/>
				</svg>
			</div>

			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				{marks.map((m, i) => {
					const reveal = interpolate(frame, [m.delay, m.delay + 10], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					return <circle key={i} cx={m.x} cy={m.y} r={m.r * reveal} fill={colors.graphite} opacity={0.14} />;
				})}
			</svg>
		</div>
	);
};
