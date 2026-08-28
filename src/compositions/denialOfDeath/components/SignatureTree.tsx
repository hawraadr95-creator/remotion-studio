import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

// A pen draws a signature/mark on paper; the ink stroke keeps growing
// upward into branches -- the idea of "leaving a trace" made literal.
export const SignatureTree: React.FC<{start?: number}> = ({start = 0}) => {
	const frame = useCurrentFrame();
	const local = frame - start;

	const signDraw = interpolate(local, [0, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const growDraw = interpolate(local, [40, 100], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const leaves = interpolate(local, [90, 130], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const sway = Math.sin(frame / 30) * 3;

	const branches = [
		'M0 0 C -10 -40 -40 -60 -70 -70',
		'M0 0 C 8 -50 40 -70 76 -76',
		'M0 -20 C -4 -60 -30 -90 -56 -108',
		'M0 -20 C 6 -64 34 -96 64 -112',
		'M0 -40 C 0 -78 0 -110 0 -140',
	];

	return (
		<svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
			<line x1={300} y1={1120} x2={780} y2={1120} stroke={colors.inkSoft} strokeWidth={2} opacity={0.5} />

			<g transform="translate(540,1120)">
				<path
					d="M -160 8 C -120 -30 -80 24 -40 -18 C -10 -46 20 6 60 -20 C 96 -42 130 2 160 -14"
					fill="none"
					stroke={colors.ink}
					strokeWidth={5}
					strokeLinecap="round"
					pathLength={1}
					strokeDasharray={1}
					strokeDashoffset={1 - signDraw}
				/>

				<g transform={`translate(0,-6) rotate(${sway})`}>
					{branches.map((d, i) => (
						<path
							key={i}
							d={d}
							fill="none"
							stroke={colors.inkSoft}
							strokeWidth={3.5}
							strokeLinecap="round"
							pathLength={1}
							strokeDasharray={1}
							strokeDashoffset={1 - growDraw}
						/>
					))}
					{leaves > 0 &&
						[
							[-70, -70],
							[76, -76],
							[-56, -108],
							[64, -112],
							[0, -140],
							[-30, -50],
							[34, -54],
						].map(([x, y], i) => (
							<circle key={i} cx={x} cy={y} r={10} fill={colors.gold} opacity={leaves * 0.75} />
						))}
				</g>
			</g>
		</svg>
	);
};
