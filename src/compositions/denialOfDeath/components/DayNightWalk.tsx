import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

// A cloaked figure walking a dotted horizon while a sun/moon disc cycles
// overhead -- "he thinks about it every day" as a repeating day/night beat.
export const DayNightWalk: React.FC = () => {
	const frame = useCurrentFrame();

	const walkX = interpolate(frame, [0, 210], [140, 900], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const bob = Math.sin(frame / 6) * 10;
	const cycle = (frame % 70) / 70;
	const isDay = cycle < 0.5;
	const cycleT = isDay ? cycle / 0.5 : (cycle - 0.5) / 0.5;
	const discY = 260 + Math.sin(cycleT * Math.PI) * -60;

	return (
		<svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
			<line x1={60} y1={980} x2={1020} y2={980} stroke={colors.inkSoft} strokeWidth={2} strokeDasharray="3 16" opacity={0.6} />

			<g transform={`translate(860, ${discY})`}>
				{isDay ? (
					<g opacity={0.85}>
						<circle r={44} fill="none" stroke={colors.gold} strokeWidth={3.5} />
						{new Array(8).fill(0).map((_, i) => {
							const a = (i * Math.PI) / 4;
							return (
								<line
									key={i}
									x1={Math.cos(a) * 54}
									y1={Math.sin(a) * 54}
									x2={Math.cos(a) * 68}
									y2={Math.sin(a) * 68}
									stroke={colors.gold}
									strokeWidth={3}
									strokeLinecap="round"
								/>
							);
						})}
					</g>
				) : (
					<path d="M20 -40 A44 44 0 1 0 20 40 A34 34 0 1 1 20 -40 Z" fill={colors.blueDim} opacity={0.75} />
				)}
			</g>

			<g transform={`translate(${walkX}, ${980 + bob * 0.15})`}>
				<path
					d="M -26 0 C -30 -70 -22 -128 -6 -158 C -12 -170 -12 -184 -2 -192 C 8 -200 24 -200 32 -190 C 40 -180 38 -168 30 -158 C 46 -128 54 -70 50 0 C 30 6 -8 6 -26 0 Z"
					fill={colors.ink}
					opacity={0.92}
					transform={`translate(0, ${bob * 0.4})`}
				/>
			</g>
		</svg>
	);
};
