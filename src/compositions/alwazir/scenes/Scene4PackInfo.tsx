import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';
import {ProductHero} from '../components/ProductHero';
import {ArabicTitle} from '../components/ArabicTitle';
import {FeatureBadge} from '../components/FeatureBadge';

const OrbitDots: React.FC<{radius: number; count?: number}> = ({radius, count = 8}) => {
	const frame = useCurrentFrame();
	const rotation = frame * 0.6;

	return (
		<>
			{new Array(count).fill(0).map((_, i) => {
				const angle = (360 / count) * i + rotation;
				const rad = (angle * Math.PI) / 180;
				const x = Math.cos(rad) * radius;
				const y = Math.sin(rad) * radius * 0.42;
				const depth = interpolate(Math.sin(rad), [-1, 1], [0.35, 1]);
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							width: 7 * depth,
							height: 7 * depth,
							borderRadius: '50%',
							background: i % 2 === 0 ? colors.red : colors.green,
							opacity: depth,
							transform: `translate(${x}px, ${y}px)`,
						}}
					/>
				);
			})}
		</>
	);
};

export const Scene4PackInfo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const riseSpring = spring({
		frame,
		fps,
		config: {damping: 20, stiffness: 110},
		durationInFrames: 34,
	});
	const productY = interpolate(riseSpring, [0, 1], [40, -20]);
	const opacity = interpolate(riseSpring, [0, 1], [0, 1]);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(180deg, ${colors.bgLighter} 0%, ${colors.bgLight} 100%)`,
			}}
		>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div
					style={{
						position: 'relative',
						transform: `translateY(${productY}px)`,
						opacity,
					}}
				>
					<div style={{position: 'absolute', inset: -60}}>
						<OrbitDots radius={280} count={10} />
					</div>
					<ProductHero width={400} float floatAmplitude={8} />
				</div>
			</AbsoluteFill>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'flex-end',
					paddingBottom: 180,
					gap: 28,
				}}
			>
				<FeatureBadge text="4 × 4 كغم" delay={28} fontSize={46} />
				<ArabicTitle
					text="مسحوق الوزير المطور"
					delay={44}
					fontSize={32}
					color={colors.gray}
					weight={700}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
