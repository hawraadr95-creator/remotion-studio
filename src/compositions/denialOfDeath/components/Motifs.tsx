import React from 'react';
import {colors} from '../theme';

// Hand-drawn-style editorial motifs, built locally as line-art SVG (no stock
// imagery available/appropriate) — clock, hourglass, skull, calendar, etc.
// Each is a plain line icon so it reads as a sketch/cut-out, not a photo.

type IconProps = {size?: number; color?: string; style?: React.CSSProperties};

export const ClockIcon: React.FC<IconProps> = ({size = 200, color = colors.ink, style}) => (
	<svg width={size} height={size} viewBox="0 0 200 200" style={style}>
		<circle cx="100" cy="100" r="86" fill={colors.cream} stroke={color} strokeWidth={5} />
		<circle cx="100" cy="100" r="72" fill="none" stroke={color} strokeWidth={1.5} opacity={0.5} />
		{Array.from({length: 12}).map((_, i) => {
			const a = (i / 12) * Math.PI * 2;
			const x1 = 100 + Math.sin(a) * 78;
			const y1 = 100 - Math.cos(a) * 78;
			const x2 = 100 + Math.sin(a) * 68;
			const y2 = 100 - Math.cos(a) * 68;
			return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={3} />;
		})}
		<line x1="100" y1="100" x2="100" y2="52" stroke={color} strokeWidth={5} strokeLinecap="round" />
		<line x1="100" y1="100" x2="138" y2="118" stroke={color} strokeWidth={5} strokeLinecap="round" />
		<circle cx="100" cy="100" r="6" fill={color} />
	</svg>
);

export const HourglassIcon: React.FC<IconProps> = ({size = 160, color = colors.ink, style}) => (
	<svg width={size} height={(size * 220) / 160} viewBox="0 0 160 220" style={style}>
		<path
			d="M30 20 H130 V26 C130 60 90 84 90 108 C90 108 90 108 90 108 C90 132 130 156 130 190 V196 H30 V190 C30 156 70 132 70 108 C70 84 30 60 30 26 Z"
			fill={colors.cream}
			stroke={color}
			strokeWidth={5}
			strokeLinejoin="round"
		/>
		<rect x="20" y="12" width="120" height="12" rx="3" fill={color} />
		<rect x="20" y="196" width="120" height="12" rx="3" fill={color} />
		<path d="M78 96 C82 104 88 106 90 108 C88 110 82 112 78 120" fill="none" stroke={color} strokeWidth={2.5} opacity={0.6} />
	</svg>
);

export const SkullIcon: React.FC<IconProps> = ({size = 200, color = colors.ink, style}) => (
	<svg width={size} height={size} viewBox="0 0 200 200" style={style}>
		<path
			d="M100 20c-40 0-66 30-66 64 0 24 12 38 20 48 4 5 6 10 6 16v14c0 6 5 11 11 11h6v16c0 5 4 9 9 9h28c5 0 9-4 9-9v-16h6c6 0 11-5 11-11v-14c0-6 2-11 6-16 8-10 20-24 20-48 0-34-26-64-66-64z"
			fill={colors.cream}
			stroke={color}
			strokeWidth={5}
			strokeLinejoin="round"
		/>
		<circle cx="76" cy="92" r="16" fill={color} />
		<circle cx="124" cy="92" r="16" fill={color} />
		<path d="M100 104 L92 128 H108 Z" fill={color} />
		<path d="M78 148 h44" stroke={color} strokeWidth={5} strokeLinecap="round" />
		<path d="M82 148 v10 M92 148 v14 M108 148 v14 M118 148 v10" stroke={color} strokeWidth={4} strokeLinecap="round" />
	</svg>
);

export const CalendarIcon: React.FC<IconProps> = ({size = 170, color = colors.ink, style}) => (
	<svg width={size} height={(size * 190) / 170} viewBox="0 0 170 190" style={style}>
		<rect x="10" y="30" width="150" height="150" rx="8" fill={colors.cream} stroke={color} strokeWidth={5} />
		<line x1="10" y1="66" x2="160" y2="66" stroke={color} strokeWidth={4} />
		<line x1="40" y1="10" x2="40" y2="46" stroke={color} strokeWidth={6} strokeLinecap="round" />
		<line x1="130" y1="10" x2="130" y2="46" stroke={color} strokeWidth={6} strokeLinecap="round" />
		{Array.from({length: 3}).map((_, r) =>
			Array.from({length: 5}).map((__, c) => (
				<circle key={`${r}-${c}`} cx={32 + c * 26} cy={92 + r * 28} r={4} fill={color} opacity={0.5} />
			)),
		)}
		<line x1="20" y1="150" x2="60" y2="176" stroke={colors.stampRed} strokeWidth={5} strokeLinecap="round" />
		<line x1="20" y1="176" x2="60" y2="150" stroke={colors.stampRed} strokeWidth={5} strokeLinecap="round" />
	</svg>
);

export const MedalIcon: React.FC<IconProps> = ({size = 140, color = colors.ink, style}) => (
	<svg width={size} height={size} viewBox="0 0 140 140" style={style}>
		<path d="M50 10 L62 46 L30 46 Z" fill={colors.burgundy} />
		<path d="M90 10 L78 46 L110 46 Z" fill={colors.tealDeep} />
		<circle cx="70" cy="86" r="42" fill={colors.cream} stroke={color} strokeWidth={5} />
		<circle cx="70" cy="86" r="30" fill="none" stroke={color} strokeWidth={2} opacity={0.6} />
		<path d="M70 68 l6 14 15 2 -11 10 3 15 -13 -8 -13 8 3 -15 -11 -10 15 -2z" fill={color} />
	</svg>
);

export const StarburstIcon: React.FC<IconProps> = ({size = 130, color = colors.stampRed, style}) => (
	<svg width={size} height={size} viewBox="0 0 130 130" style={style}>
		{Array.from({length: 10}).map((_, i) => {
			const a = (i / 10) * Math.PI * 2;
			return (
				<line
					key={i}
					x1={65}
					y1={65}
					x2={65 + Math.sin(a) * 58}
					y2={65 - Math.cos(a) * 58}
					stroke={color}
					strokeWidth={4}
					strokeLinecap="round"
				/>
			);
		})}
		<circle cx="65" cy="65" r="20" fill={colors.cream} stroke={color} strokeWidth={4} />
	</svg>
);

export const FamilyIcon: React.FC<IconProps> = ({size = 160, color = colors.ink, style}) => (
	<svg width={size} height={(size * 110) / 160} viewBox="0 0 160 110" style={style}>
		{[30, 70, 110].map((cx, i) => (
			<g key={cx}>
				<circle cx={cx} cy={30 - (i === 1 ? 6 : 0)} r={16} fill={colors.cream} stroke={color} strokeWidth={4} />
				<path d={`M${cx - 20} 100 Q${cx - 20} 60 ${cx} 60 Q${cx + 20} 60 ${cx + 20} 100 Z`} fill={colors.cream} stroke={color} strokeWidth={4} />
			</g>
		))}
	</svg>
);

export const GravestoneIcon: React.FC<IconProps> = ({size = 150, color = colors.ink, style}) => (
	<svg width={size} height={(size * 180) / 150} viewBox="0 0 150 180" style={style}>
		<path
			d="M20 176 V70 C20 30 42 12 75 12 C108 12 130 30 130 70 V176 Z"
			fill={colors.cream}
			stroke={color}
			strokeWidth={5}
		/>
		<line x1="75" y1="50" x2="75" y2="90" stroke={color} strokeWidth={5} strokeLinecap="round" />
		<line x1="58" y1="66" x2="92" y2="66" stroke={color} strokeWidth={5} strokeLinecap="round" />
		<line x1="34" y1="176" x2="116" y2="176" stroke={color} strokeWidth={6} />
	</svg>
);

export const InfinityIcon: React.FC<IconProps> = ({size = 180, color = colors.tealDeep, style}) => (
	<svg width={size} height={size * 0.55} viewBox="0 0 180 100" style={style}>
		<path
			d="M45 50 C45 25 70 25 90 50 C110 75 135 75 135 50 C135 25 110 25 90 50 C70 75 45 75 45 50 Z"
			fill="none"
			stroke={color}
			strokeWidth={7}
			strokeLinecap="round"
		/>
	</svg>
);

export const CompassIcon: React.FC<IconProps> = ({size = 170, color = colors.ink, style}) => (
	<svg width={size} height={size} viewBox="0 0 170 170" style={style}>
		<circle cx="85" cy="85" r="76" fill={colors.cream} stroke={color} strokeWidth={5} />
		<circle cx="85" cy="85" r="60" fill="none" stroke={color} strokeWidth={1.5} opacity={0.5} />
		<path d="M85 30 L98 85 L85 140 L72 85 Z" fill={colors.stampRed} opacity={0.85} />
		<path d="M30 85 L85 72 L140 85 L85 98 Z" fill={color} opacity={0.35} />
		<circle cx="85" cy="85" r="5" fill={color} />
	</svg>
);
