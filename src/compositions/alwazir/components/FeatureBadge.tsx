import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fontFamily} from '../theme';

type FeatureBadgeProps = {
	text: string;
	delay?: number;
	fontSize?: number;
};

export const FeatureBadge: React.FC<FeatureBadgeProps> = ({
	text,
	delay = 0,
	fontSize = 40,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - delay;

	const entrance = spring({
		frame: local,
		fps,
		config: {damping: 14, mass: 0.6, stiffness: 170},
		durationInFrames: 22,
	});

	const scale = interpolate(entrance, [0, 1], [0.7, 1]);
	const opacity = interpolate(entrance, [0, 1], [0, 1]);

	return (
		<div
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				opacity,
				transform: `scale(${scale})`,
				padding: '14px 40px',
				borderRadius: 999,
				border: `3px solid ${colors.red}`,
				background: 'rgba(255,255,255,0.92)',
				boxShadow: '0 10px 30px rgba(227,6,19,0.18)',
			}}
		>
			<span
				dir="rtl"
				style={{
					fontFamily,
					fontWeight: 800,
					fontSize,
					color: colors.red,
					direction: 'rtl',
				}}
			>
				{text}
			</span>
		</div>
	);
};
