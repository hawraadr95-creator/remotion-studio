import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

type ParticlesProps = {
	count?: number;
	color?: string;
	opacity?: number;
	seed?: number;
};

const mulberry32 = (a: number) => () => {
	let t = (a += 0x6d2b79f5);
	t = Math.imul(t ^ (t >>> 15), t | 1);
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const Particles: React.FC<ParticlesProps> = ({
	count = 26,
	color = '#ffffff',
	opacity = 0.55,
	seed = 7,
}) => {
	const frame = useCurrentFrame();

	const particles = useMemo(() => {
		const rand = mulberry32(seed);
		return new Array(count).fill(0).map((_, i) => ({
			x: rand() * 100,
			y: rand() * 100,
			size: 3 + rand() * 7,
			speed: 6 + rand() * 14,
			drift: (rand() - 0.5) * 40,
			phase: rand() * Math.PI * 2,
			delay: i * 2,
		}));
	}, [count, seed]);

	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			{particles.map((p, i) => {
				const t = frame - p.delay;
				const y = p.y - ((t * p.speed) / 30) * 3.2;
				const wrappedY = ((y % 130) + 130) % 130;
				const x = p.x + Math.sin(t / 40 + p.phase) * (p.drift / 10);
				const twinkle = interpolate(
					Math.sin(t / 18 + p.phase) as number,
					[-1, 1],
					[0.25, 1],
				);
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${x}%`,
							top: `${wrappedY}%`,
							width: p.size,
							height: p.size,
							borderRadius: '50%',
							background: color,
							opacity: opacity * twinkle,
							filter: 'blur(0.5px)',
							boxShadow: `0 0 ${p.size * 2}px ${color}`,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
