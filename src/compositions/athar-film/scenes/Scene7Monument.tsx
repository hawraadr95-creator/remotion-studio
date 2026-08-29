import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';
import {getFigureState} from '../figureState';

const SYMBOLS = ['★', '◆', '●', '▲', '■', '◇'];

export const Scene7Monument: React.FC<{frame: number}> = ({frame}) => {
	const figure = getFigureState(frame);
	const orbitRadius = interpolate(frame, [858, 1010], [70, 250], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const orbitOpacity = interpolate(frame, [858, 878, 995, 1030], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const monumentOpacity = interpolate(frame, [995, 1060], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const monumentScale = interpolate(frame, [995, 1085], [0.55, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const cx = figure.x;
	const cy = figure.y - 260;

	return (
		<div style={{position: 'absolute', inset: 0}}>
			<div style={{position: 'absolute', inset: 0, opacity: orbitOpacity}}>
				<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
					<circle cx={cx} cy={cy} r={orbitRadius} stroke={colors.grayLine} strokeWidth={1.4} fill="none" strokeDasharray="3 8" />
				</svg>
				{SYMBOLS.map((sym, i) => {
					const angle = (frame - 858) * 0.028 + (i / SYMBOLS.length) * Math.PI * 2;
					const sx = cx + Math.cos(angle) * orbitRadius;
					const sy = cy + Math.sin(angle) * orbitRadius * 0.62;
					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: sx,
								top: sy,
								transform: 'translate(-50%, -50%)',
								fontSize: 30,
								color: i % 3 === 0 ? colors.accent : colors.graphite,
							}}
						>
							{sym}
						</div>
					);
				})}
			</div>

			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: 1720,
					transform: `translate(-50%, -100%) scale(${monumentScale})`,
					transformOrigin: '50% 100%',
					opacity: monumentOpacity,
				}}
			>
				<svg width={520} height={1400} viewBox="0 0 520 1400">
					<defs>
						<linearGradient id="monumentGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={colors.graphite} />
							<stop offset="70%" stopColor={colors.ink} />
						</linearGradient>
					</defs>
					<path
						d="M260 20 C 200 20 170 90 170 170 L120 1380 L400 1380 L350 170 C 350 90 320 20 260 20 Z"
						fill="url(#monumentGrad)"
					/>
					<line x1={260} y1={220} x2={260} y2={1360} stroke="rgba(238,234,225,0.08)" strokeWidth={3} />
					<line x1={200} y1={260} x2={182} y2={1360} stroke="rgba(238,234,225,0.05)" strokeWidth={2} />
					<line x1={320} y1={260} x2={338} y2={1360} stroke="rgba(238,234,225,0.05)" strokeWidth={2} />
				</svg>
			</div>
		</div>
	);
};
