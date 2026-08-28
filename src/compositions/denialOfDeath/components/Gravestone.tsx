import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fontSerif} from '../theme';

// A carved monument rises from the ground and reveals an engraved line --
// "you say to the world you existed."
export const Gravestone: React.FC<{start?: number; text: string}> = ({start = 0, text}) => {
	const frame = useCurrentFrame();
	const local = frame - start;

	const rise = interpolate(local, [0, 40], [140, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const opacity = interpolate(local, [0, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const carve = interpolate(local, [30, 70], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
			<line x1={280} y1={1180} x2={800} y2={1180} stroke={colors.inkSoft} strokeWidth={2} opacity={0.5} />
			<g transform={`translate(540, ${1180 + rise})`} opacity={opacity}>
				<path
					d="M -140 0 L -140 -260 C -140 -320 -80 -360 0 -360 C 80 -360 140 -320 140 -260 L 140 0 Z"
					fill={colors.paperDark}
					stroke={colors.ink}
					strokeWidth={4}
				/>
				<rect x={-160} y={-6} width={320} height={26} fill={colors.paperDark} stroke={colors.ink} strokeWidth={4} />
				<foreignObject x={-120} y={-260} width={240} height={180}>
					<div
						dir="rtl"
						style={{
							fontFamily: fontSerif,
							fontSize: 40,
							fontWeight: 700,
							color: colors.ink,
							textAlign: 'center',
							clipPath: `inset(0 0 0 ${100 - carve}%)`,
						}}
					>
						{text}
					</div>
				</foreignObject>
			</g>
		</svg>
	);
};
