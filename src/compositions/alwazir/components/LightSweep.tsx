import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

type LightSweepProps = {
	startFrame?: number;
	durationInFrames?: number;
	angle?: number;
	width?: number;
	opacity?: number;
};

export const LightSweep: React.FC<LightSweepProps> = ({
	startFrame = 0,
	durationInFrames = 40,
	angle = 18,
	width = 26,
	opacity = 0.5,
}) => {
	const frame = useCurrentFrame();
	const local = frame - startFrame;

	const progress = interpolate(local, [0, durationInFrames], [-30, 130], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
			<div
				style={{
					position: 'absolute',
					top: '-20%',
					left: `${progress}%`,
					width: `${width}%`,
					height: '140%',
					transform: `rotate(${angle}deg)`,
					background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${opacity}) 50%, rgba(255,255,255,0) 100%)`,
					mixBlendMode: 'screen',
				}}
			/>
		</AbsoluteFill>
	);
};
