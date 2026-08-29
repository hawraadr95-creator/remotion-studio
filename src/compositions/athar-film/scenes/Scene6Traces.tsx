import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';
import {getFigureState} from '../figureState';
import {HumanFigure} from '../components/HumanFigure';

const ECHO_OFFSETS = [90, 190, 300];
const MARK_COUNT = 10;

export const Scene6Traces: React.FC<{frame: number}> = ({frame}) => {
	const current = getFigureState(frame);
	const emptinessGlow = interpolate(frame, [820, 858], [0, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<div style={{position: 'absolute', inset: 0}}>
			<div
				style={{
					position: 'absolute',
					left: 60,
					top: 1810,
					width: 960,
					height: 1,
					background: colors.grayLine,
				}}
			/>

			{ECHO_OFFSETS.map((offset, i) => {
				const ex = current.x - offset;
				if (ex < 80 || frame < 736) return null;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: ex,
							top: current.y,
							transform: `translate(-50%, -100%) scale(${current.scale * 0.96})`,
							opacity: 0.16 - i * 0.045,
						}}
					>
						<HumanFigure size={220} pose={{...current.pose, swingAmount: 0.3}} />
					</div>
				);
			})}

			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				{Array.from({length: MARK_COUNT}).map((_, i) => {
					const mx = 260 + i * 62;
					const reveal = interpolate(frame, [736 + i * 8, 736 + i * 8 + 10], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					if (mx > current.x + 40) return null;
					return (
						<line
							key={i}
							x1={mx}
							y1={1798}
							x2={mx}
							y2={1798 - 16 * reveal}
							stroke={colors.graphite}
							strokeWidth={2.2}
							opacity={0.7}
						/>
					);
				})}
			</svg>

			<div
				style={{
					position: 'absolute',
					left: 540,
					top: 1500,
					width: 420,
					height: 420,
					borderRadius: '50%',
					transform: 'translate(-50%, -50%)',
					background: `radial-gradient(circle, rgba(24,22,20,${emptinessGlow * 0.06}) 0%, rgba(24,22,20,0) 70%)`,
				}}
			/>
		</div>
	);
};
