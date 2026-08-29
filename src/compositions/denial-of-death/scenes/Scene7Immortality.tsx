import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, layout} from '../theme';
import {scenes} from '../script';
import {KineticText} from '../components/KineticText';
import {DotGrid} from '../components/DotGrid';
import {InfinityIcon} from '../components/icons/Icons';
import {enterProgress, exitProgress, pushIn} from '../components/utils';

const {lines, durationInFrames} = scenes[6];
const ORBIT_START = 172;

export const Scene7Immortality: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = pushIn(frame, fps, 1.05, 1);
	const fadeIn = enterProgress(frame, 20);
	const fadeOut = exitProgress(frame, durationInFrames);
	const opacity = fadeIn * (1 - fadeOut);

	const angle = (frame * 2.4 * Math.PI) / 180;
	const orbitR = 92;
	const dotX = Math.cos(angle) * orbitR;
	const dotY = Math.sin(angle) * orbitR;

	const infinityReveal = interpolate(frame - ORBIT_START, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{background: colors.paper, overflow: 'hidden'}}>
			<DotGrid color={colors.line} opacity={0.9} />

			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity, transform: `scale(${scale})`}}>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 46}}>
					<div style={{position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<svg width={240} height={240} style={{position: 'absolute'}}>
							<circle cx={120} cy={120} r={112} stroke={colors.line} strokeWidth={1.4} fill="none" />
							<circle cx={120} cy={120} r={92} stroke={colors.gold} strokeWidth={1.4} strokeDasharray="2 6" fill="none" opacity={0.8} />
							<circle cx={120} cy={120} r={52} stroke={colors.line} strokeWidth={1.4} fill="none" />
						</svg>

						<div
							style={{
								position: 'absolute',
								width: 16,
								height: 16,
								borderRadius: '50%',
								background: colors.rust,
								transform: `translate(${dotX}px, ${dotY}px)`,
								opacity: 1 - infinityReveal,
							}}
						/>

						<div
							style={{
								opacity: infinityReveal,
								transform: `scale(${interpolate(infinityReveal, [0, 1], [0.6, 1])})`,
							}}
						>
							<InfinityIcon size={96} color={colors.ink} strokeWidth={2.6} />
						</div>
					</div>

					<div style={{width: layout.width - 170, display: 'flex', justifyContent: 'center'}}>
						<KineticText frame={frame} lines={lines} size={56} align="center" />
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
