import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

// Wraps a scene's whole canvas to give it a slow push/pan across its
// lifetime, so scenes read as a camera moving over a larger editorial board
// rather than static cards.
export const CameraMove: React.FC<{
	children: React.ReactNode;
	durationInFrames: number;
	fromScale?: number;
	toScale?: number;
	fromX?: number;
	toX?: number;
	fromY?: number;
	toY?: number;
}> = ({children, durationInFrames, fromScale = 1, toScale = 1.06, fromX = 0, toX = 0, fromY = 0, toY = 0}) => {
	const frame = useCurrentFrame();
	const scale = interpolate(frame, [0, durationInFrames], [fromScale, toScale], {extrapolateRight: 'clamp'});
	const x = interpolate(frame, [0, durationInFrames], [fromX, toX], {extrapolateRight: 'clamp'});
	const y = interpolate(frame, [0, durationInFrames], [fromY, toY], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{transform: `scale(${scale}) translate(${x}px, ${y}px)`, transformOrigin: '50% 50%'}}>
			{children}
		</AbsoluteFill>
	);
};
