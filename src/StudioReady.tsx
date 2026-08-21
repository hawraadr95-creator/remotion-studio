import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const StudioReady: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 200,
		},
	});

	const scale = interpolate(entrance, [0, 1], [0.8, 1]);
	const opacity = interpolate(entrance, [0, 1], [0, 1]);
	const translateY = interpolate(entrance, [0, 1], [40, 0]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0b0b0f',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					opacity,
					transform: `translateY(${translateY}px) scale(${scale})`,
					fontFamily: 'Helvetica, Arial, sans-serif',
					fontSize: 72,
					fontWeight: 700,
					color: '#ffffff',
					textAlign: 'center',
					padding: '0 80px',
				}}
			>
				Remotion Studio Ready
			</div>
		</AbsoluteFill>
	);
};
