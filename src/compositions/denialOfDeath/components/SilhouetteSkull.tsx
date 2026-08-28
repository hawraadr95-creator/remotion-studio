import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

// A contemplative side-profile figure standing at a forked, dotted path --
// one branch drawn plain and straight (the "surface" decision), while a
// ghostly engraved skull fades in beneath/behind it: the unseen cause.
export const SilhouetteSkull: React.FC = () => {
	const frame = useCurrentFrame();

	const figureIn = interpolate(frame, [96, 130], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const skullIn = interpolate(frame, [138, 172], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const pathDraw = interpolate(frame, [120, 160], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const drift = Math.sin(frame / 26) * 4;

	const baseX = 742;
	const baseY = 1220;

	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 1080 1920"
			style={{position: 'absolute', inset: 0, overflow: 'visible'}}
		>
			{/* forked dotted paths from the arrow's landing point */}
			<g opacity={pathDraw} transform={`translate(${drift * 0.2},0)`}>
				<path
					d={`M ${baseX} ${baseY} Q 640 1340 500 1470`}
					fill="none"
					stroke={colors.inkSoft}
					strokeWidth={3}
					strokeDasharray="2 14"
					strokeLinecap="round"
					pathLength={1}
					strokeDashoffset={1 - pathDraw}
				/>
				<path
					d={`M ${baseX} ${baseY} Q 860 1360 900 1520`}
					fill="none"
					stroke={colors.inkSoft}
					strokeWidth={3}
					strokeDasharray="2 14"
					strokeLinecap="round"
					pathLength={1}
					strokeDashoffset={1 - pathDraw}
					opacity={0.6}
				/>
			</g>

			{/* ghost skull, watermark-style, larger and looming behind the figure */}
			<g transform={`translate(${baseX + 6}, ${baseY - 230}) scale(2.1)`} opacity={skullIn * 0.42}>
				<g transform={`translate(0, ${interpolate(skullIn, [0, 1], [10, 0])})`}>
					<path
						d="M0 -46 C -34 -46 -46 -18 -46 4 C -46 24 -34 34 -30 44 L -30 58 C -30 66 -22 66 -18 60 L -14 66 C -10 72 -4 68 -4 62 L 0 68 L 4 62 C 4 68 10 72 14 66 L 18 60 C 22 66 30 66 30 58 L 30 44 C 34 34 46 24 46 4 C 46 -18 34 -46 0 -46 Z"
						fill={colors.ink}
					/>
					<circle cx={-17} cy={-4} r={11} fill={colors.paper} />
					<circle cx={17} cy={-4} r={11} fill={colors.paper} />
					<path d="M0 6 L -7 22 L 7 22 Z" fill={colors.paper} />
					<path d="M -20 34 L 20 34" stroke={colors.paper} strokeWidth={3} />
				</g>
			</g>

			{/* contemplative cloaked silhouette, woodcut style, standing at the fork */}
			<g
				transform={`translate(${baseX}, ${baseY}) scale(${interpolate(figureIn, [0, 1], [0.92, 1])})`}
				opacity={figureIn}
			>
				<path
					d="M -82 0
					   C -96 -160 -70 -300 -18 -368
					   C -30 -388 -30 -412 -16 -428
					   C 2 -448 34 -448 50 -428
					   C 64 -410 62 -388 50 -368
					   C 96 -304 108 -160 88 0
					   C 60 12 -50 12 -82 0 Z"
					fill={colors.ink}
					opacity={0.94}
				/>
				<path
					d="M 8 -420 C 20 -420 30 -410 30 -398 C 30 -388 22 -380 12 -378"
					fill="none"
					stroke={colors.paper}
					strokeWidth={4}
					strokeLinecap="round"
					opacity={0.5}
				/>
			</g>
		</svg>
	);
};
