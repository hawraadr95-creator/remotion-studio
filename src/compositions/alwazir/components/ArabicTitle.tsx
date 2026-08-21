import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fontFamily} from '../theme';

type ArabicTitleProps = {
	text: string;
	delay?: number;
	fontSize?: number;
	color?: string;
	weight?: number;
	align?: 'center' | 'right' | 'left';
	letterSpacing?: number;
	textShadow?: string;
	maxWidth?: number;
};

export const ArabicTitle: React.FC<ArabicTitleProps> = ({
	text,
	delay = 0,
	fontSize = 64,
	color = colors.ink,
	weight = 800,
	align = 'center',
	letterSpacing = 0,
	textShadow,
	maxWidth,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - delay;

	const entrance = spring({
		frame: local,
		fps,
		config: {damping: 26, mass: 0.7, stiffness: 140},
		durationInFrames: 24,
	});

	const opacity = interpolate(entrance, [0, 1], [0, 1]);
	const translateY = interpolate(entrance, [0, 1], [26, 0]);
	const blur = interpolate(entrance, [0, 1], [6, 0]);

	return (
		<div
			dir="rtl"
			style={{
				direction: 'rtl',
				unicodeBidi: 'plaintext',
				fontFamily,
				fontWeight: weight,
				fontSize,
				color,
				textAlign: align,
				letterSpacing,
				lineHeight: 1.25,
				opacity,
				transform: `translateY(${translateY}px)`,
				filter: `blur(${blur}px)`,
				textShadow,
				maxWidth,
				whiteSpace: 'pre-wrap',
			}}
		>
			{text}
		</div>
	);
};
