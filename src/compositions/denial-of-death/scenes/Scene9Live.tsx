import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, layout} from '../theme';
import {scenes} from '../script';
import {KineticText} from '../components/KineticText';
import {bodyFont} from '../fonts';
import {enterProgress, pushIn} from '../components/utils';

const {lines, durationInFrames} = scenes[8];

export const Scene9Live: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = pushIn(frame, fps, 1.06, 1);
	const fadeIn = enterProgress(frame, 22);
	const finalFade = interpolate(frame, [durationInFrames - 28, durationInFrames - 4], [1, 0.92], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const sunRise = interpolate(frame, [0, durationInFrames], [40, -30], {extrapolateRight: 'clamp'});
	const creditOpacity = interpolate(frame, [92, 118], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const ruleWidth = interpolate(frame, [86, 112], [0, 120], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(180deg, ${colors.paperDeep} 0%, ${colors.paper} 55%, ${colors.cream} 100%)`,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '54%',
					width: 620,
					height: 620,
					borderRadius: '50%',
					background: `radial-gradient(circle, rgba(185,137,60,0.28) 0%, rgba(243,238,229,0) 70%)`,
					transform: `translate(-50%, calc(-50% + ${sunRise}px))`,
				}}
			/>

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					opacity: fadeIn * finalFade,
					transform: `scale(${scale})`,
				}}
			>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 42}}>
					<div style={{width: layout.width - 160, display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
						<KineticText frame={frame} lines={lines} size={76} align="center" maxWidth={900} />
					</div>

					<div style={{width: ruleWidth, height: 2, background: colors.gold}} />

					<div
						style={{
							opacity: creditOpacity,
							fontFamily: bodyFont,
							color: colors.inkSoft,
							fontSize: 22,
							letterSpacing: 1,
							fontWeight: 500,
							textAlign: 'center',
							direction: 'rtl',
						}}
					>
						مقتبس من كتاب «انكار الموت» — ارنست بيكر
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
