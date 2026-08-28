import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors, fontSerif} from '../theme';

type TitleCardProps = {
	start: number;
};

// Vintage book title page: decorative double-rule frame, corner flourishes,
// a small engraved skull-and-line motif at the base, and the author/book
// name revealed with a right-to-left ink wipe.
export const TitleCard: React.FC<TitleCardProps> = ({start}) => {
	const frame = useCurrentFrame();
	const local = frame - start;

	const frameIn = interpolate(local, [0, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const authorReveal = interpolate(local, [8, 30], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const bookReveal = interpolate(local, [26, 50], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const zoom = interpolate(local, [0, 60], [1.06, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(120% 90% at 50% 40%, ${colors.paperLight} 0%, ${colors.paper} 60%, ${colors.paperDark} 100%)`,
				alignItems: 'center',
				justifyContent: 'center',
				transform: `scale(${zoom})`,
			}}
		>
			<svg width={880} height={1300} viewBox="0 0 880 1300" style={{position: 'absolute', opacity: frameIn}}>
				<rect x={40} y={40} width={800} height={1220} fill="none" stroke={colors.ink} strokeWidth={3} />
				<rect x={58} y={58} width={764} height={1184} fill="none" stroke={colors.gold} strokeWidth={1.5} opacity={0.8} />
				{[
					[40, 40, 1, 1],
					[840, 40, -1, 1],
					[40, 1260, 1, -1],
					[840, 1260, -1, -1],
				].map(([x, y, sx, sy], i) => (
					<g key={i} transform={`translate(${x},${y}) scale(${sx},${sy})`}>
						<path d="M0 0 C 34 4 46 26 42 56 C 66 46 82 20 76 -2" fill="none" stroke={colors.gold} strokeWidth={2.5} />
					</g>
				))}
			</svg>

			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, opacity: frameIn}}>
				<div
					dir="rtl"
					style={{
						fontFamily: fontSerif,
						fontWeight: 400,
						fontSize: 34,
						color: colors.inkSoft,
						letterSpacing: 2,
						clipPath: `inset(0 ${100 - authorReveal}% 0 0)`,
					}}
				>
					ارنست بيكر
				</div>

				<svg width={140} height={40} viewBox="0 0 140 40" style={{opacity: authorReveal / 100}}>
					<line x1={10} y1={20} x2={130} y2={20} stroke={colors.gold} strokeWidth={2} />
					<circle cx={70} cy={20} r={5} fill={colors.gold} />
				</svg>

				<div
					dir="rtl"
					style={{
						fontFamily: fontSerif,
						fontWeight: 900,
						fontSize: 88,
						color: colors.ink,
						textAlign: 'center',
						lineHeight: 1.25,
						clipPath: `inset(0 ${100 - bookReveal}% 0 0)`,
					}}
				>
					كتاب
					<br />
					إنكار الموت
				</div>

				<svg width={200} height={90} viewBox="0 0 200 90" style={{marginTop: 12, opacity: bookReveal / 100}}>
					<g transform="translate(100,18)">
						<path
							d="M0 -20 C -15 -20 -20 -8 -20 2 C -20 10 -15 15 -13 20 L -13 27 C -13 31 -9 31 -8 27 L -6 30 C -4 33 -1 31 -1 28 L 0 31 L 1 28 C 1 31 4 33 6 30 L 8 27 C 9 31 13 31 13 27 L 13 20 C 15 15 20 10 20 2 C 20 -8 15 -20 0 -20 Z"
							fill={colors.ink}
						/>
						<circle cx={-7.5} cy={-2} r={4.5} fill={colors.paper} />
						<circle cx={7.5} cy={-2} r={4.5} fill={colors.paper} />
					</g>
					<line x1={30} y1={60} x2={170} y2={60} stroke={colors.gold} strokeWidth={2} strokeDasharray="1 8" strokeLinecap="round" />
				</svg>
			</div>
		</AbsoluteFill>
	);
};
