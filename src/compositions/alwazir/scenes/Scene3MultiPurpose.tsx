import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';
import {ProductHero} from '../components/ProductHero';
import {ArabicTitle} from '../components/ArabicTitle';

const mulberry32 = (a: number) => () => {
	let t = (a += 0x6d2b79f5);
	t = Math.imul(t ^ (t >>> 15), t | 1);
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const Bubbles: React.FC = () => {
	const frame = useCurrentFrame();
	const bubbles = useMemo(() => {
		const rand = mulberry32(88);
		return new Array(20).fill(0).map(() => ({
			x: rand() * 100,
			startY: 110 + rand() * 40,
			size: 18 + rand() * 46,
			speed: 10 + rand() * 16,
			delay: rand() * 60,
		}));
	}, []);

	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			{bubbles.map((b, i) => {
				const t = Math.max(0, frame - b.delay);
				const y = b.startY - (t * b.speed) / 30 * 4;
				const opacity = interpolate(y, [-10, 10, 90, 110], [0, 0.85, 0.85, 0]);
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${b.x}%`,
							top: `${y}%`,
							width: b.size,
							height: b.size,
							borderRadius: '50%',
							opacity,
							background:
								'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.05) 100%)',
							border: '1px solid rgba(255,255,255,0.6)',
							boxShadow: '0 0 12px rgba(255,255,255,0.4)',
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

export const Scene3MultiPurpose: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const headlineOut = interpolate(frame, [70, 96], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const secondIn = interpolate(frame, [96, 122], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const productSpring = spring({
		frame,
		fps,
		config: {damping: 20, stiffness: 100},
		durationInFrames: 40,
	});
	const productScale = interpolate(productSpring, [0, 1], [0.85, 1]);

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(120% 100% at 50% 20%, #ffffff 0%, ${colors.bgLight} 60%, #e9f3ec 100%)`,
				overflow: 'hidden',
			}}
		>
			<Bubbles />

			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingTop: 140}}>
				<div style={{transform: `scale(${productScale})`}}>
					<ProductHero width={340} float floatAmplitude={6} />
				</div>
			</AbsoluteFill>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'flex-start',
					paddingTop: 170,
				}}
			>
				<div style={{opacity: headlineOut, transform: `translateY(${(1 - headlineOut) * -20}px)`}}>
					<ArabicTitle
						text="متعدد الاستعمالات"
						delay={14}
						fontSize={68}
						color={colors.green}
						weight={900}
					/>
				</div>
			</AbsoluteFill>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'flex-end',
					paddingBottom: 200,
				}}
			>
				<div style={{opacity: secondIn, transform: `translateY(${(1 - secondIn) * 24}px)`}}>
					<ArabicTitle
						text="مسحوق الوزير المطور"
						fontSize={54}
						color={colors.red}
						weight={900}
					/>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
