import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, layout} from '../theme';
import {scenes} from '../script';
import {KineticText} from '../components/KineticText';
import {bodyFont} from '../fonts';
import {MonumentIcon} from '../components/icons/Icons';
import {enterProgress, exitProgress, pushIn} from '../components/utils';

const {lines, durationInFrames} = scenes[1];

export const Scene2DeathBook: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const vignette = interpolate(Math.sin(frame / 14), [-1, 1], [0.55, 0.75]);
	const monumentReveal = enterProgress(frame - 24, 30);
	const scale = pushIn(frame, fps, 1.1, 1);
	const fadeOut = exitProgress(frame, durationInFrames);

	return (
		<AbsoluteFill style={{background: colors.night, overflow: 'hidden', opacity: 1 - fadeOut}}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(circle at 50% 38%, rgba(196,71,44,${vignette * 0.16}) 0%, rgba(10,10,11,0) 55%)`,
				}}
			/>

			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `scale(${scale})`}}>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 46}}>
					<div
						style={{
							position: 'relative',
							width: 190,
							height: 190,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							opacity: monumentReveal,
							transform: `scale(${interpolate(monumentReveal, [0, 1], [0.7, 1])})`,
						}}
					>
						<svg width={190} height={190} style={{position: 'absolute'}}>
							<circle
								cx={95}
								cy={95}
								r={86}
								stroke={colors.gold}
								strokeWidth={1.6}
								fill="none"
								strokeDasharray="3 7"
								opacity={0.7}
								transform={`rotate(${frame * 0.4} 95 95)`}
							/>
						</svg>
						<MonumentIcon size={104} color={colors.cream} strokeWidth={2} />
					</div>

					<div style={{width: layout.width - 220, display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
						<KineticText
							frame={frame}
							lines={lines}
							size={78}
							color={colors.cream}
							accentColor={colors.rust}
							mutedColor="rgba(239,231,214,0.55)"
							align="center"
						/>
					</div>

					<div
						style={{
							opacity: interpolate(frame, [58, 78], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
							fontFamily: bodyFont,
							color: colors.gold,
							fontSize: 22,
							letterSpacing: 2,
							fontWeight: 600,
						}}
					>
						ERNEST BECKER — THE DENIAL OF DEATH
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
