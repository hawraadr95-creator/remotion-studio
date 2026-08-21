import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

type SceneTransitionProps = {
	startFrame: number;
	durationInFrames?: number;
};

const mulberry32 = (a: number) => () => {
	let t = (a += 0x6d2b79f5);
	t = Math.imul(t ^ (t >>> 15), t | 1);
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// A fast diagonal wipe inspired by sweeping powder/foam, used to cut cleanly
// between scenes without a plain crossfade.
export const SceneTransition: React.FC<SceneTransitionProps> = ({
	startFrame,
	durationInFrames = 18,
}) => {
	const frame = useCurrentFrame();
	const local = frame - startFrame;

	const bubbles = useMemo(() => {
		const rand = mulberry32(42);
		return new Array(38).fill(0).map(() => ({
			x: rand() * 100,
			y: rand() * 100,
			size: 6 + rand() * 30,
		}));
	}, []);

	if (local < -10 || local > durationInFrames + 10) {
		return null;
	}

	const x = interpolate(
		local,
		[0, durationInFrames * 0.5, durationInFrames],
		[-115, 0, 115],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	const opacity = interpolate(
		local,
		[0, 4, durationInFrames - 4, durationInFrames],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden', opacity}}>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: `${x}%`,
					width: '120%',
					height: '100%',
					background:
						'linear-gradient(115deg, #ffffff 0%, #ffffff 62%, #f2f4f3 100%)',
					clipPath: 'polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)',
				}}
			>
				{bubbles.map((b, i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${b.x}%`,
							top: `${b.y}%`,
							width: b.size,
							height: b.size,
							borderRadius: '50%',
							background:
								'radial-gradient(circle at 35% 30%, rgba(255,255,255,1), rgba(230,235,233,0.6) 70%, rgba(210,215,213,0.3) 100%)',
							boxShadow: 'inset 0 0 6px rgba(0,0,0,0.05)',
						}}
					/>
				))}
			</div>
		</AbsoluteFill>
	);
};
