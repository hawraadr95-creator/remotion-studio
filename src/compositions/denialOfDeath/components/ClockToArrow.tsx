import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

const CX = 540;
const CY = 560;
const R = 210;

// A single continuous stroke: the clock's second hand sweeps, decelerates
// into a straight line, elongates off the dial, then bends downward and
// becomes a hand-drawn arrow pointing at the silhouette below. One shape
// morphing the whole time -- no cuts.
export const ClockToArrow: React.FC = () => {
	const frame = useCurrentFrame();

	// Phase 1 (0-46): second hand sweeps fast, dramatizing time passing.
	const sweepAngle = (frame * 16) % 360;
	// Phase 2 (46-64): eases into pointing straight right (0deg = 3 o'clock).
	const lockAngle = interpolate(frame, [46, 64], [sweepAngle, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const angle = frame < 46 ? sweepAngle : lockAngle;
	const rad = (angle * Math.PI) / 180;

	// Phase 3 (60-118): hand elongates far beyond the dial.
	const handLen = interpolate(frame, [60, 118], [R * 0.82, 640], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const tipX = CX + Math.sin(rad) * handLen;
	const tipY = CY - Math.cos(rad) * handLen;

	// Phase 4 (108-150): the straight line bends into a curve heading down
	// toward the silhouette, via an animated control point.
	const bend = interpolate(frame, [108, 150], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const endX = interpolate(bend, [0, 1], [tipX, 742]);
	const endY = interpolate(bend, [0, 1], [tipY, 1220]);
	const ctrlX = interpolate(bend, [0, 1], [tipX, 900]);
	const ctrlY = interpolate(bend, [0, 1], [tipY, 760]);

	const pathD = `M ${CX} ${CY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;

	// Arrowhead fades/scales in once the curve has mostly formed.
	const arrowT = interpolate(frame, [140, 160], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const dirAngle = Math.atan2(endY - ctrlY, endX - ctrlX);
	const ah = 34 * arrowT;
	const a1x = endX - Math.cos(dirAngle - 0.5) * ah;
	const a1y = endY - Math.sin(dirAngle - 0.5) * ah;
	const a2x = endX - Math.cos(dirAngle + 0.5) * ah;
	const a2y = endY - Math.sin(dirAngle + 0.5) * ah;

	// Clock dial fades out as it hands off into the pure ink line.
	const dialOpacity = interpolate(frame, [56, 96], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const ticks = new Array(12).fill(0).map((_, i) => {
		const a = (i * 30 * Math.PI) / 180;
		const r1 = R * 0.88;
		const r2 = R * (i % 3 === 0 ? 0.74 : 0.8);
		return {
			x1: CX + Math.sin(a) * r1,
			y1: CY - Math.cos(a) * r1,
			x2: CX + Math.sin(a) * r2,
			y2: CY - Math.cos(a) * r2,
		};
	});

	const minuteAngle = 145;
	const mrad = (minuteAngle * Math.PI) / 180;

	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 1080 1920"
			style={{position: 'absolute', inset: 0, overflow: 'visible'}}
		>
			<g opacity={dialOpacity}>
				<circle cx={CX} cy={CY} r={R} fill="none" stroke={colors.ink} strokeWidth={5} />
				<circle cx={CX} cy={CY} r={R - 16} fill="none" stroke={colors.ink} strokeWidth={1.5} opacity={0.6} />
				{ticks.map((t, i) => (
					<line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={colors.ink} strokeWidth={3} strokeLinecap="round" />
				))}
				<line
					x1={CX - Math.sin(mrad) * 20}
					y1={CY + Math.cos(mrad) * 20}
					x2={CX + Math.sin(mrad) * R * 0.44}
					y2={CY - Math.cos(mrad) * R * 0.44}
					stroke={colors.ink}
					strokeWidth={5}
					strokeLinecap="round"
					opacity={0.75}
				/>
				<circle cx={CX} cy={CY} r={10} fill={colors.ink} />
			</g>

			<path d={pathD} fill="none" stroke={colors.ink} strokeWidth={6} strokeLinecap="round" />
			{arrowT > 0 && (
				<g opacity={arrowT}>
					<line x1={endX} y1={endY} x2={a1x} y2={a1y} stroke={colors.ink} strokeWidth={6} strokeLinecap="round" />
					<line x1={endX} y1={endY} x2={a2x} y2={a2y} stroke={colors.ink} strokeWidth={6} strokeLinecap="round" />
				</g>
			)}
		</svg>
	);
};
