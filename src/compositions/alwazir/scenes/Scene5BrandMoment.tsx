import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';
import {ProductHero} from '../components/ProductHero';
import {ArabicTitle} from '../components/ArabicTitle';
import {Particles} from '../components/Particles';

export const Scene5BrandMoment: React.FC = () => {
	const frame = useCurrentFrame();

	const pushIn = interpolate(frame, [0, 150], [1, 1.1], {extrapolateRight: 'clamp'});
	const enter = interpolate(frame, [0, 22], [0, 1], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: colors.ink, overflow: 'hidden'}}>
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(120% 90% at 50% 30%, #262626 0%, #141414 60%, #0a0a0a 100%)',
				}}
			/>
			<Particles count={20} color="#ffffff" opacity={0.22} seed={5} />

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					transform: `scale(${pushIn * enter + (1 - enter)})`,
					paddingBottom: 130,
				}}
			>
				<div style={{position: 'relative'}}>
					{/* elevated platform */}
					<div
						style={{
							position: 'absolute',
							bottom: -46,
							left: '50%',
							transform: 'translateX(-50%)',
							width: 360,
							height: 34,
							borderRadius: '50%',
							background:
								'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.15) 60%, transparent 75%)',
						}}
					/>
					<ProductHero
						width={400}
						float
						floatAmplitude={6}
						sweepHighlight
						sweepStart={20}
					/>
				</div>
			</AbsoluteFill>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'flex-start',
					paddingTop: 140,
					gap: 14,
				}}
			>
				<ArabicTitle text="الوزير" delay={12} fontSize={90} color="#ffffff" weight={900} />
				<ArabicTitle
					text="اسم حاضر في كل تفصيلة نظافة"
					delay={34}
					fontSize={34}
					color={colors.grayLight}
					weight={600}
					maxWidth={760}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
