import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, layout} from '../theme';
import {scenes} from '../script';
import {KineticText} from '../components/KineticText';
import {FamilyIcon, SealIcon, StarIcon, TrophyIcon} from '../components/icons/Icons';
import {enterProgress, exitProgress, pushIn} from '../components/utils';

const {lines, durationInFrames} = scenes[4];

const CELLS = [
	{Icon: TrophyIcon, delay: 1, label: 'SUCCESS'},
	{Icon: StarIcon, delay: 44, label: 'FAME'},
	{Icon: SealIcon, delay: 70, label: 'ACHIEVEMENT'},
	{Icon: FamilyIcon, delay: 92, label: 'FAMILY'},
];

const CELL = 216;
const GAP = 26;

export const Scene5Chase: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = pushIn(frame, fps, 1.05, 1);
	const fadeIn = enterProgress(frame, 20);
	const fadeOut = exitProgress(frame, durationInFrames);
	const opacity = fadeIn * (1 - fadeOut);

	const gridSize = CELL * 2 + GAP;

	return (
		<AbsoluteFill style={{background: colors.paper, overflow: 'hidden'}}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity, transform: `scale(${scale})`}}>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 56}}>
					<div style={{position: 'relative', width: gridSize, height: gridSize}}>
						<svg width={gridSize} height={gridSize} style={{position: 'absolute'}}>
							<line x1={gridSize / 2} y1={0} x2={gridSize / 2} y2={gridSize} stroke={colors.line} strokeWidth={1.5} />
							<line x1={0} y1={gridSize / 2} x2={gridSize} y2={gridSize / 2} stroke={colors.line} strokeWidth={1.5} />
							<rect x={0} y={0} width={gridSize} height={gridSize} stroke={colors.line} strokeWidth={1.5} fill="none" />
						</svg>

						{CELLS.map(({Icon, delay, label}, i) => {
							const col = i % 2;
							const row = Math.floor(i / 2);
							const reveal = interpolate(frame - delay, [0, 16], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							});
							const isActive = frame >= delay && frame < delay + 24;

							return (
								<div
									key={label}
									style={{
										position: 'absolute',
										left: col * (CELL + GAP),
										top: row * (CELL + GAP),
										width: CELL,
										height: CELL,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 14,
										opacity: reveal,
										transform: `scale(${interpolate(reveal, [0, 1], [0.6, 1])})`,
									}}
								>
									<Icon size={72} color={isActive ? colors.rust : colors.ink} strokeWidth={2.2} />
									<span
										style={{
											fontSize: 13,
											letterSpacing: 3,
											fontWeight: 600,
											color: colors.inkSoft,
											fontFamily: 'sans-serif',
										}}
									>
										{label}
									</span>
								</div>
							);
						})}
					</div>

					<div style={{width: layout.width - 170, display: 'flex', justifyContent: 'center'}}>
						<KineticText frame={frame} lines={lines} size={58} align="center" />
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
