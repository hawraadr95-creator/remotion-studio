import React from 'react';
import {colors} from '../theme';

type IconProps = {opacity?: number; color?: string};

// Small hand-drawn engraved-line icons reused across the "desires" scene:
// a rising star, a medal, a trophy, and a three-figure family.

export const StarIcon: React.FC<IconProps> = ({opacity = 1, color = colors.ink}) => (
	<svg viewBox="0 0 100 100" width={100} height={100} style={{opacity}}>
		<path
			d="M50 8 L61 38 L94 40 L68 60 L78 92 L50 73 L22 92 L32 60 L6 40 L39 38 Z"
			fill="none"
			stroke={color}
			strokeWidth={4}
			strokeLinejoin="round"
		/>
	</svg>
);

export const MedalIcon: React.FC<IconProps> = ({opacity = 1, color = colors.ink}) => (
	<svg viewBox="0 0 100 100" width={100} height={100} style={{opacity}}>
		<path d="M32 4 L46 40 L20 40 Z" fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" />
		<path d="M68 4 L54 40 L80 40 Z" fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" />
		<circle cx={50} cy={64} r={30} fill="none" stroke={color} strokeWidth={4.5} />
		<path d="M50 46 L55 60 L70 60 L58 69 L62 84 L50 75 L38 84 L42 69 L30 60 L45 60 Z" fill={color} opacity={0.85} />
	</svg>
);

export const TrophyIcon: React.FC<IconProps> = ({opacity = 1, color = colors.ink}) => (
	<svg viewBox="0 0 100 100" width={100} height={100} style={{opacity}}>
		<path
			d="M30 12 H70 V34 C70 52 58 62 50 62 C42 62 30 52 30 34 Z"
			fill="none"
			stroke={color}
			strokeWidth={4}
		/>
		<path d="M30 18 C16 18 14 40 32 42" fill="none" stroke={color} strokeWidth={3.5} />
		<path d="M70 18 C84 18 86 40 68 42" fill="none" stroke={color} strokeWidth={3.5} />
		<line x1={50} y1={62} x2={50} y2={78} stroke={color} strokeWidth={4} />
		<line x1={34} y1={90} x2={66} y2={90} stroke={color} strokeWidth={4.5} strokeLinecap="round" />
		<line x1={40} y1={78} x2={60} y2={78} stroke={color} strokeWidth={4} strokeLinecap="round" />
	</svg>
);

export const FamilyIcon: React.FC<IconProps> = ({opacity = 1, color = colors.ink}) => (
	<svg viewBox="0 0 100 100" width={100} height={100} style={{opacity}}>
		{[
			[26, 30, 9],
			[50, 22, 11],
			[74, 32, 8],
		].map(([x, r, hr], i) => (
			<g key={i}>
				<circle cx={x} cy={r} r={hr} fill="none" stroke={color} strokeWidth={3.5} />
				<path
					d={`M${x - hr - 3} 84 C ${x - hr - 3} ${r + hr + 8} ${x + hr + 3} ${r + hr + 8} ${x + hr + 3} 84`}
					fill="none"
					stroke={color}
					strokeWidth={3.5}
				/>
			</g>
		))}
	</svg>
);

export const MonumentIcon: React.FC<IconProps & {growth?: number}> = ({
	opacity = 1,
	color = colors.ink,
	growth = 1,
}) => (
	<svg viewBox="0 0 120 160" width={120} height={160} style={{opacity, overflow: 'visible'}}>
		<line x1={10} y1={150} x2={110} y2={150} stroke={color} strokeWidth={4} />
		<rect x={30} y={150 - 100 * growth} width={60} height={100 * growth} fill="none" stroke={color} strokeWidth={4} />
		<path d={`M30 ${150 - 100 * growth} L60 ${150 - 128 * growth} L90 ${150 - 100 * growth}`} fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" />
	</svg>
);
