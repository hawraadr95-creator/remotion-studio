import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, layout} from '../theme';
import {scenes} from '../script';
import {KineticText} from '../components/KineticText';
import {DotGrid} from '../components/DotGrid';
import {ClockIcon} from '../components/icons/Icons';
import {enterProgress, exitProgress, pushIn} from '../components/utils';

const {lines, durationInFrames} = scenes[2];
const TICK_COUNT = 9;

export const Scene3Awareness: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = pushIn(frame, fps, 1.05, 1);
	const fadeIn = enterProgress(frame, 20);
	const fadeOut = exitProgress(frame, durationInFrames);
	const opacity = fadeIn * (1 - fadeOut);

	const tension = interpolate(frame, [0, durationInFrames], [0, 1], {extrapolateRight: 'clamp'});
	const activeTicks = Math.min(TICK_COUNT, Math.floor(frame / 21) + 1);

	return (
		<AbsoluteFill style={{background: colors.paper, overflow: 'hidden'}}>
			<DotGrid color={colors.line} opacity={0.9} />
			<AbsoluteFill
				style={{background: `radial-gradient(circle at 50% 20%, rgba(196,71,44,${tension * 0.1}) 0%, rgba(243,238,229,0) 60%)`}}
			/>

			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity, transform: `scale(${scale})`}}>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 52}}>
					<div style={{position: 'relative', width: 168, height: 168}}>
						<ClockIcon size={168} color={colors.ink} strokeWidth={2.2} />
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								width: 3,
								height: 46,
								background: colors.rust,
								transformOrigin: 'bottom center',
								transform: `translate(-50%, -100%) rotate(${frame * 6}deg)`,
								borderRadius: 2,
							}}
						/>
					</div>

					<div style={{display: 'flex', gap: 12}}>
						{Array.from({length: TICK_COUNT}).map((_, i) => (
							<div
								key={i}
								style={{
									width: 12,
									height: 12,
									borderRadius: 6,
									border: `2px solid ${colors.ink}`,
									background: i < activeTicks ? colors.rust : 'transparent',
									borderColor: i < activeTicks ? colors.rust : colors.inkSoft,
									opacity: i < activeTicks ? 1 : 0.35,
								}}
							/>
						))}
					</div>

					<div style={{width: layout.width - 170, display: 'flex', justifyContent: 'center'}}>
						<KineticText frame={frame} lines={lines} size={62} align="center" />
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
