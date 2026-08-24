import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

// A messy, hand-sketched circle (2.5 overlapping loops) drawn around a
// word/element to mark emphasis — mirrors the "Salary 200000" reference.
export const ScribbleCircle: React.FC<{
	width: number;
	height: number;
	delay?: number;
	durationInFrames?: number;
	color?: string;
	strokeWidth?: number;
	style?: React.CSSProperties;
}> = ({width, height, delay = 0, durationInFrames = 30, color = colors.burgundy, strokeWidth = 4, style}) => {
	const frame = useCurrentFrame();
	const local = Math.max(0, frame - delay);
	const progress = interpolate(local, [0, durationInFrames], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const rx = width / 2;
	const ry = height / 2;
	const cx = rx;
	const cy = ry;

	// Two-and-a-half imperfect loops, each slightly offset, to feel drawn by hand.
	const loop = (offset: number, scale: number) =>
		`M ${cx - rx * scale} ${cy + offset}
		 C ${cx - rx * scale} ${cy - ry * scale * 1.15}, ${cx + rx * scale * 0.3} ${cy - ry * scale * 1.2}, ${cx + rx * scale} ${cy - offset * 0.6}
		 C ${cx + rx * scale * 1.05} ${cy + ry * scale * 0.9}, ${cx - rx * scale * 0.2} ${cy + ry * scale * 1.15}, ${cx - rx * scale * 0.9} ${cy + offset * 0.3}`;

	const paths = [loop(6, 1), loop(-4, 1.06), loop(10, 0.96)];

	return (
		<svg width={width} height={height} style={{position: 'absolute', overflow: 'visible', ...style}}>
			{paths.map((d, i) => {
				const segStart = i / paths.length;
				const segEnd = (i + 1) / paths.length;
				const segProgress = interpolate(progress, [segStart, segEnd], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				return (
					<path
						key={i}
						d={d}
						fill="none"
						stroke={color}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						pathLength={1}
						style={{strokeDasharray: `${segProgress} 1`}}
						opacity={0.85}
					/>
				);
			})}
		</svg>
	);
};
