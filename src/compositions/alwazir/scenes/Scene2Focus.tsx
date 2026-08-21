import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';
import {ProductHero} from '../components/ProductHero';
import {ArabicTitle} from '../components/ArabicTitle';
import {Particles} from '../components/Particles';

export const Scene2Focus: React.FC = () => {
	const frame = useCurrentFrame();

	// simulated slow camera push-in across the whole scene
	const pushIn = interpolate(frame, [0, 150], [1, 1.14], {
		extrapolateRight: 'clamp',
	});

	const enter = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});
	const opacity = interpolate(frame, [0, 16], [0, 1], {extrapolateRight: 'clamp'});

	// parallax layers move at different speeds for a dimensional feel
	const bgShapeX = interpolate(frame, [0, 150], [-30, 30]);
	const midShapeX = interpolate(frame, [0, 150], [40, -40]);

	return (
		<AbsoluteFill style={{background: colors.bgLighter, overflow: 'hidden'}}>
			<Particles count={16} color={colors.green} opacity={0.25} seed={31} />

			{/* far background graphic layer */}
			<div
				style={{
					position: 'absolute',
					top: '8%',
					left: `${bgShapeX}%`,
					width: 620,
					height: 620,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${colors.green}22 0%, transparent 70%)`,
					filter: 'blur(2px)',
				}}
			/>

			{/* mid red graphic ribbon */}
			<div
				style={{
					position: 'absolute',
					top: '58%',
					left: `${midShapeX}%`,
					width: '140%',
					height: 90,
					background: `linear-gradient(90deg, transparent, ${colors.red}26, transparent)`,
					transform: 'rotate(-6deg)',
				}}
			/>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					transform: `scale(${pushIn * enter + (1 - enter)})`,
					paddingBottom: 200,
				}}
			>
				<div style={{opacity}}>
					<ProductHero width={470} float floatAmplitude={7} />
				</div>
			</AbsoluteFill>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'flex-end',
					paddingBottom: 150,
				}}
			>
				<ArabicTitle
					text={'نظافة تبدأ من الاختيار الصح'}
					delay={26}
					fontSize={46}
					color={colors.ink}
					weight={800}
					maxWidth={880}
					align="center"
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
