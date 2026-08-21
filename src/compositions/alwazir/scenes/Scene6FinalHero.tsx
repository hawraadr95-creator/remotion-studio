import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fontFamily} from '../theme';
import {ProductHero} from '../components/ProductHero';
import {ArabicTitle} from '../components/ArabicTitle';
import {Particles} from '../components/Particles';

export const Scene6FinalHero: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const entrance = spring({
		frame,
		fps,
		config: {damping: 22, stiffness: 110},
		durationInFrames: 40,
	});
	const scale = interpolate(entrance, [0, 1], [0.85, 1]);
	const opacity = interpolate(entrance, [0, 1], [0, 1]);

	const logoIn = spring({
		frame: frame - 110,
		fps,
		config: {damping: 16, stiffness: 140},
		durationInFrames: 20,
	});

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(120% 100% at 50% 0%, #ffffff 0%, ${colors.bgLight} 65%, #eef4f0 100%)`,
			}}
		>
			<Particles count={18} color={colors.green} opacity={0.2} seed={97} />

			{/* restrained accent shapes */}
			<div
				style={{
					position: 'absolute',
					top: -80,
					right: -80,
					width: 360,
					height: 360,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${colors.red}14 0%, transparent 70%)`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: -100,
					left: -100,
					width: 420,
					height: 420,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${colors.green}18 0%, transparent 70%)`,
				}}
			/>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					paddingBottom: 300,
				}}
			>
				<div style={{transform: `scale(${scale})`, opacity}}>
					<ProductHero width={480} float floatAmplitude={8} />
				</div>
			</AbsoluteFill>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'flex-end',
					paddingBottom: 150,
					gap: 10,
				}}
			>
				<ArabicTitle
					text="مسحوق الوزير المطور"
					delay={14}
					fontSize={50}
					color={colors.red}
					weight={900}
				/>
				<ArabicTitle
					text="متعدد الاستعمالات"
					delay={26}
					fontSize={32}
					color={colors.gray}
					weight={700}
				/>
				<div style={{marginTop: 10}}>
					<ArabicTitle
						text="4 × 4 كغم"
						delay={38}
						fontSize={30}
						color={colors.green}
						weight={800}
					/>
				</div>

				<div
					style={{
						marginTop: 26,
						opacity: interpolate(logoIn, [0, 1], [0, 1]),
						transform: `translateY(${interpolate(logoIn, [0, 1], [16, 0])}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 10,
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							background: colors.red,
						}}
					/>
					<span
						dir="rtl"
						style={{
							fontFamily,
							fontWeight: 800,
							fontSize: 26,
							color: colors.ink,
						}}
					>
						منظفات الوزير
					</span>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							background: colors.green,
						}}
					/>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
