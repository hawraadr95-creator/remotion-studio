import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, layout} from '../theme';
import {scenes} from '../script';
import {KineticText} from '../components/KineticText';
import {SealIcon} from '../components/icons/Icons';
import {exitProgress, pushIn} from '../components/utils';

const {lines, durationInFrames} = scenes[5];
const IMPACT_FRAME = 94;

export const Scene6Legacy: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = pushIn(frame, fps, 1.1, 1);
	const fadeOut = exitProgress(frame, durationInFrames);

	const sealSpring = spring({
		frame: Math.max(frame - IMPACT_FRAME, 0),
		fps,
		config: {damping: 9, stiffness: 130, mass: 0.7},
	});
	const sealScale = interpolate(sealSpring, [0, 1], [0.3, 1]);
	const hasImpacted = frame >= IMPACT_FRAME;

	const shock = interpolate(frame - IMPACT_FRAME, [0, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: colors.night, overflow: 'hidden', opacity: 1 - fadeOut}}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `scale(${scale})`}}>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 54}}>
					<div style={{position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						{hasImpacted && shock < 1 ? (
							<div
								style={{
									position: 'absolute',
									width: interpolate(shock, [0, 1], [80, 320]),
									height: interpolate(shock, [0, 1], [80, 320]),
									borderRadius: '50%',
									border: `2px solid ${colors.rust}`,
									opacity: interpolate(shock, [0, 1], [0.8, 0]),
								}}
							/>
						) : null}

						{hasImpacted ? (
							<div style={{transform: `scale(${sealScale})`}}>
								<SealIcon size={168} color={colors.cream} strokeWidth={2.4} />
							</div>
						) : (
							<svg width={168} height={168} viewBox="0 0 64 64">
								<circle cx={32} cy={32} r={24} stroke={colors.lineOnDark} strokeWidth={1.6} strokeDasharray="3 6" />
							</svg>
						)}
					</div>

					<div style={{width: layout.width - 200, display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
						<KineticText
							frame={frame}
							lines={lines}
							size={62}
							color={colors.cream}
							mutedColor="rgba(239,231,214,0.5)"
							accentColor={colors.gold}
							align="center"
						/>
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
