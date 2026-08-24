import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

// A dashed, hand-sketched arrow that draws itself along a quadratic path.
export const HandDrawnArrow: React.FC<{
	from: [number, number];
	to: [number, number];
	curve?: number; // control-point bow
	delay?: number;
	durationInFrames?: number;
	color?: string;
	strokeWidth?: number;
}> = ({from, to, curve = 60, delay = 0, durationInFrames = 26, color = colors.inkSoft, strokeWidth = 3.5}) => {
	const frame = useCurrentFrame();
	const local = Math.max(0, frame - delay);
	const progress = interpolate(local, [0, durationInFrames], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const [x1, y1] = from;
	const [x2, y2] = to;
	const mx = (x1 + x2) / 2 - (y2 - y1) * (curve / 100);
	const my = (y1 + y2) / 2 + (x2 - x1) * (curve / 100);

	const pathId = `arrow-path-${x1}-${y1}-${x2}-${y2}`;
	const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;

	// Angle at the endpoint for the arrowhead.
	const angle = (Math.atan2(y2 - my, x2 - mx) * 180) / Math.PI;
	const headOpacity = interpolate(progress, [0.85, 1], [0, 1], {extrapolateLeft: 'clamp'});

	const left = Math.min(x1, x2, mx) - 30;
	const top = Math.min(y1, y2, my) - 30;
	const w = Math.max(x1, x2, mx) - left + 60;
	const h = Math.max(y1, y2, my) - top + 60;

	return (
		<svg
			width={w}
			height={h}
			style={{position: 'absolute', left, top, overflow: 'visible', opacity: progress > 0 ? 1 : 0}}
		>
			<g transform={`translate(${-left}, ${-top})`}>
				<path id={pathId} d={d} fill="none" />
				<path
					d={d}
					fill="none"
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeDasharray="9 8"
					pathLength={1}
					strokeDashoffset={1 - progress}
					style={{strokeDasharray: `${progress} 1`}}
				/>
				<g transform={`translate(${x2}, ${y2}) rotate(${angle})`} opacity={headOpacity}>
					<path d="M -14 -9 L 4 0 L -14 9" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
				</g>
			</g>
		</svg>
	);
};
