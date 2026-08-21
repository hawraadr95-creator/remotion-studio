import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';
import {Particles} from '../components/Particles';
import {LightSweep} from '../components/LightSweep';
import {ProductHero} from '../components/ProductHero';
import {ArabicTitle} from '../components/ArabicTitle';

export const Scene1Reveal: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const reveal = spring({
		frame,
		fps,
		config: {damping: 18, mass: 0.9, stiffness: 90},
		durationInFrames: 46,
	});

	const scale = interpolate(reveal, [0, 1], [0.72, 1]);
	const opacity = interpolate(reveal, [0, 1], [0, 1]);
	const productY = interpolate(reveal, [0, 1], [70, 0]);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(160deg, ${colors.bgLighter} 0%, ${colors.bgLight} 100%)`,
			}}
		>
			<Particles count={22} color="#ffffff" opacity={0.5} seed={11} />
			<LightSweep startFrame={4} durationInFrames={50} opacity={0.45} />

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					paddingBottom: 260,
				}}
			>
				<div
					style={{
						transform: `translateY(${productY}px) scale(${scale})`,
						opacity,
					}}
				>
					<ProductHero width={430} float />
				</div>
			</AbsoluteFill>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'flex-end',
					paddingBottom: 130,
					gap: 16,
				}}
			>
				<ArabicTitle
					text="مسحوق الوزير المطور"
					delay={30}
					fontSize={62}
					color={colors.red}
					weight={900}
					textShadow="0 4px 18px rgba(227,6,19,0.18)"
				/>
				<ArabicTitle
					text="متعدد الاستعمالات"
					delay={52}
					fontSize={38}
					color={colors.gray}
					weight={700}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
