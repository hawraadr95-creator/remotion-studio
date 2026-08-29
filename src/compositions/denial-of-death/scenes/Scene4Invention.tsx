import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, layout} from '../theme';
import {scenes} from '../script';
import {KineticText} from '../components/KineticText';
import {DotGrid} from '../components/DotGrid';
import {FootprintIcon, LightbulbIcon} from '../components/icons/Icons';
import {enterProgress, exitProgress, pushIn} from '../components/utils';

const {lines, durationInFrames} = scenes[3];

const FOOTPRINTS = [
	{x: -120, y: 30, delay: 104, flip: false},
	{x: -60, y: 6, delay: 111, flip: true},
	{x: 0, y: 26, delay: 118, flip: false},
	{x: 60, y: 2, delay: 125, flip: true},
];

export const Scene4Invention: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = pushIn(frame, fps, 1.05, 1);
	const fadeIn = enterProgress(frame, 20);
	const fadeOut = exitProgress(frame, durationInFrames);
	const opacity = fadeIn * (1 - fadeOut);

	const glow = interpolate(frame, [0, 40, durationInFrames], [0.15, 0.85, 0.85], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: colors.paper, overflow: 'hidden'}}>
			<DotGrid color={colors.line} opacity={0.9} />

			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity, transform: `scale(${scale})`}}>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
					<div style={{position: 'relative', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<div
							style={{
								position: 'absolute',
								width: 220,
								height: 220,
								borderRadius: '50%',
								background: `radial-gradient(circle, rgba(185,137,60,${glow * 0.55}) 0%, rgba(243,238,229,0) 68%)`,
							}}
						/>
						<LightbulbIcon size={144} color={colors.ink} strokeWidth={2.2} />
					</div>

					<div style={{position: 'relative', width: 260, height: 60}}>
						{FOOTPRINTS.map((fp, i) => {
							const r = interpolate(frame - fp.delay, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
							return (
								<div
									key={i}
									style={{
										position: 'absolute',
										left: 130 + fp.x,
										top: fp.y,
										opacity: r,
										transform: `translateY(${interpolate(r, [0, 1], [10, 0])}px) scaleX(${fp.flip ? -1 : 1})`,
									}}
								>
									<FootprintIcon size={30} color={colors.rustDeep} strokeWidth={2} />
								</div>
							);
						})}
					</div>

					<div style={{width: layout.width - 170, display: 'flex', justifyContent: 'center'}}>
						<KineticText frame={frame} lines={lines} size={60} align="center" />
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
