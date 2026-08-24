import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../theme';

// Ink-cursive annotation text — used for margin notes, emphasis words, and
// intimate asides. Writes on with a soft rise + reveal rather than a plain
// fade.
export const HandwrittenText: React.FC<{
	text: string;
	delay?: number;
	fontSize?: number;
	color?: string;
	rotate?: number;
	style?: React.CSSProperties;
}> = ({text, delay = 0, fontSize = 54, color = colors.ink, rotate = -2, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = Math.max(0, frame - delay);
	const s = spring({frame: local, fps, config: {damping: 14, mass: 0.6, stiffness: 120}, durationInFrames: 22});
	const opacity = interpolate(s, [0, 1], [0, 1]);
	const y = interpolate(s, [0, 1], [22, 0]);
	const clip = interpolate(s, [0, 1], [0, 100]);

	return (
		<div
			style={{
				fontFamily: fonts.hand,
				fontSize,
				color,
				direction: 'rtl',
				transform: `translateY(${y}px) rotate(${rotate}deg)`,
				opacity,
				clipPath: `inset(0 0 0 ${100 - clip}%)`,
				whiteSpace: 'nowrap',
				...style,
			}}
		>
			{text}
		</div>
	);
};
