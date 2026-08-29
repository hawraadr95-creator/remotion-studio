import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, layout} from '../theme';
import {scenes} from '../script';
import {KineticText} from '../components/KineticText';
import {DotGrid} from '../components/DotGrid';
import {enterProgress, exitProgress, pushIn} from '../components/utils';

const {lines, durationInFrames} = scenes[0];

export const Scene1Hook: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = pushIn(frame, fps, 1.08, 1);
	const fadeIn = enterProgress(frame, 24);
	const fadeOut = exitProgress(frame, durationInFrames);
	const opacity = fadeIn * (1 - fadeOut);

	const drawLen = enterProgress(frame - 4, 46);

	return (
		<AbsoluteFill style={{background: colors.paper, overflow: 'hidden'}}>
			<DotGrid color={colors.line} opacity={0.9} />

			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity, transform: `scale(${scale})`}}>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 64}}>
					<svg width={220} height={220} viewBox="0 0 64 64" style={{overflow: 'visible'}}>
						<circle cx={32} cy={10} r={4} stroke={colors.ink} strokeWidth={2.4} fill={colors.paper} />
						<path
							d="M32 14v10"
							stroke={colors.ink}
							strokeWidth={2.4}
							pathLength={1}
							strokeDasharray={1}
							strokeDashoffset={1 - Math.min(drawLen * 2, 1)}
						/>
						<path
							d="M32 24L14 44"
							stroke={colors.inkSoft}
							strokeWidth={2.4}
							strokeLinecap="round"
							pathLength={1}
							strokeDasharray={1}
							strokeDashoffset={1 - Math.max(Math.min((drawLen - 0.35) * 1.8, 1), 0)}
						/>
						<path
							d="M32 24L50 44"
							stroke={colors.rust}
							strokeWidth={2.4}
							strokeLinecap="round"
							pathLength={1}
							strokeDasharray={1}
							strokeDashoffset={1 - Math.max(Math.min((drawLen - 0.35) * 1.8, 1), 0)}
						/>
						<circle cx={14} cy={50} r={4} stroke={colors.inkSoft} strokeWidth={2.4} fill={colors.paper} opacity={drawLen > 0.7 ? 1 : 0} />
						<circle cx={50} cy={50} r={4} stroke={colors.rust} strokeWidth={2.4} fill={colors.paper} opacity={drawLen > 0.7 ? 1 : 0} />
					</svg>

					<div style={{width: layout.width - 180, display: 'flex', justifyContent: 'center'}}>
						<KineticText frame={frame} lines={lines} size={70} align="center" />
					</div>
				</div>
			</AbsoluteFill>

			<svg width={layout.width} height={layout.height} style={{position: 'absolute', inset: 0, opacity: 0.5}}>
				<line x1={layout.width / 2} y1={0} x2={layout.width / 2} y2={220} stroke={colors.line} strokeWidth={1} />
			</svg>
		</AbsoluteFill>
	);
};
