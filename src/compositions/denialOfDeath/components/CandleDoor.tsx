import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

// Closing image: a candle burns low and gutters out while a door swings
// shut into shadow -- the paradox of preparing for death and forgetting
// to live before it.
export const CandleDoor: React.FC<{start?: number}> = ({start = 0}) => {
	const frame = useCurrentFrame();
	const local = Math.max(frame - start, 0);

	const flicker = 1 + Math.sin(local / 2.3) * 0.08 + Math.sin(local / 5.1) * 0.05;
	const candleHeight = interpolate(local, [0, 120], [220, 60], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const flameOpacity = interpolate(local, [0, 105, 130], [1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const doorClose = interpolate(local, [10, 128], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const darkness = interpolate(local, [95, 141], [0, 0.96], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
				{/* door frame closing from the right, like a shadow falling */}
				<rect
					x={1080 - 620 * doorClose}
					y={0}
					width={620 * doorClose}
					height={1920}
					fill={colors.charcoal}
					opacity={0.9}
				/>
				<line x1={1080 - 620 * doorClose} y1={0} x2={1080 - 620 * doorClose} y2={1920} stroke={colors.gold} strokeWidth={2} opacity={0.4} />

				<g transform="translate(420,1180)">
					<rect x={-70} y={0} width={140} height={18} fill={colors.paperDark} stroke={colors.ink} strokeWidth={3} />
					<rect x={-16} y={-candleHeight} width={32} height={candleHeight} fill={colors.paperLight} stroke={colors.ink} strokeWidth={3} />
					<g opacity={flameOpacity} transform={`translate(0, ${-candleHeight - 6}) scale(${flicker})`}>
						<path d="M0 -34 C 14 -18 14 0 0 6 C -14 0 -14 -18 0 -34 Z" fill={colors.gold} />
						<path d="M0 -20 C 6 -10 6 0 0 4 C -6 0 -6 -10 0 -20 Z" fill={colors.ink} opacity={0.5} />
					</g>
				</g>
			</svg>
			<AbsoluteFill style={{backgroundColor: '#000', opacity: darkness}} />
		</AbsoluteFill>
	);
};
