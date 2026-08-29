import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';

const START_X = 210;
const END_X = 850;
const BASE_Y = 1775;

const trailPath = `M${START_X},${BASE_Y} C${START_X + 140},${BASE_Y - 30} ${START_X + 260},${BASE_Y + 26} ${
	(START_X + END_X) / 2
},${BASE_Y} S${END_X - 160},${BASE_Y - 34} ${END_X},${BASE_Y}`;

export const Scene4Trail: React.FC<{frame: number}> = ({frame}) => {
	const progress = interpolate(frame, [456, 592], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<div style={{position: 'absolute', inset: 0}}>
			<div
				style={{
					position: 'absolute',
					left: 60,
					top: BASE_Y + 55,
					width: 960,
					height: 1,
					background: colors.grayLine,
				}}
			/>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<path
					d={trailPath}
					stroke={colors.ink}
					strokeWidth={3.5}
					strokeLinecap="round"
					fill="none"
					pathLength={1}
					strokeDasharray={1}
					strokeDashoffset={1 - progress}
					opacity={0.9}
				/>
				<path
					d={trailPath}
					stroke={colors.accent}
					strokeWidth={1.4}
					fill="none"
					pathLength={1}
					strokeDasharray={1}
					strokeDashoffset={1 - progress}
					opacity={0.35}
					transform="translate(0, 4)"
				/>
			</svg>
		</div>
	);
};
