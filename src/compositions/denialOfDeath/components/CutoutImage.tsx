import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {paperShadow} from './PaperShadow';

// A "cut-out" illustration mounted on the collage: slides/settles into
// frame with a slight rotation, like a paper piece being placed by hand.
export const CutoutImage: React.FC<{
	width: number;
	height: number;
	delay?: number;
	rotate?: number;
	fromRotate?: number;
	fromX?: number;
	fromY?: number;
	elevation?: number;
	style?: React.CSSProperties;
	children: React.ReactNode;
}> = ({
	width,
	height,
	delay = 0,
	rotate = 0,
	fromRotate,
	fromX = 0,
	fromY = 60,
	elevation = 2,
	style,
	children,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = Math.max(0, frame - delay);

	const s = spring({frame: local, fps, config: {damping: 16, mass: 0.8, stiffness: 110}, durationInFrames: 34});
	const opacity = interpolate(s, [0, 1], [0, 1]);
	const x = interpolate(s, [0, 1], [fromX, 0]);
	const y = interpolate(s, [0, 1], [fromY, 0]);
	const startRotate = fromRotate ?? rotate + (fromX >= 0 ? 6 : -6);
	const r = interpolate(s, [0, 1], [startRotate, rotate]);

	return (
		<div
			style={{
				width,
				height,
				opacity,
				transform: `translate(${x}px, ${y}px) rotate(${r}deg)`,
				filter: paperShadow(elevation),
				...style,
			}}
		>
			{children}
		</div>
	);
};
