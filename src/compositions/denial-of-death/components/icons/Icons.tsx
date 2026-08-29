import React from 'react';

interface IconProps {
	size?: number;
	color?: string;
	strokeWidth?: number;
	style?: React.CSSProperties;
}

const base = (size: number) => ({width: size, height: size, viewBox: '0 0 64 64', fill: 'none'});

export const LightbulbIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.4, style}) => (
	<svg {...base(size)} style={style}>
		<path
			d="M32 6c-10 0-17.5 7.6-17.5 17c0 6.4 3.4 10.6 6.6 13.7c1.8 1.8 2.9 3.4 2.9 5.6v2.2h16v-2.2c0-2.2 1.1-3.8 2.9-5.6c3.2-3.1 6.6-7.3 6.6-13.7C49.5 13.6 42 6 32 6Z"
			stroke={color}
			strokeWidth={strokeWidth}
		/>
		<path d="M24 51h16M26 57h12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
		<path d="M32 16v18M25 27l7 7l7-7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export const ClockIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.4, style}) => (
	<svg {...base(size)} style={style}>
		<circle cx={32} cy={34} r={22} stroke={color} strokeWidth={strokeWidth} />
		<path d="M32 20v14l10 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
		<path d="M24 6h16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
	</svg>
);

export const FootprintIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.2, style}) => (
	<svg {...base(size)} style={style}>
		<ellipse cx={28} cy={40} rx={11} ry={16} stroke={color} strokeWidth={strokeWidth} transform="rotate(-8 28 40)" />
		<circle cx={22} cy={14} r={3.4} stroke={color} strokeWidth={strokeWidth} />
		<circle cx={30} cy={10} r={3.2} stroke={color} strokeWidth={strokeWidth} />
		<circle cx={38} cy={10} r={2.9} stroke={color} strokeWidth={strokeWidth} />
		<circle cx={45} cy={13} r={2.6} stroke={color} strokeWidth={strokeWidth} />
	</svg>
);

export const TrophyIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.4, style}) => (
	<svg {...base(size)} style={style}>
		<path d="M20 10h24v12c0 8-5.4 14-12 14s-12-6-12-14V10Z" stroke={color} strokeWidth={strokeWidth} />
		<path d="M20 14h-6c0 7 4 11 8 11.5M44 14h6c0 7-4 11-8 11.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
		<path d="M32 36v8" stroke={color} strokeWidth={strokeWidth} />
		<path d="M22 56h20l-3-9H25l-3 9Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
	</svg>
);

export const StarIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.4, style}) => (
	<svg {...base(size)} style={style}>
		<path
			d="M32 8l7.2 14.8l16.3 2.4l-11.8 11.5l2.8 16.3L32 45.4L17.5 53l2.8-16.3L8.5 25.2l16.3-2.4L32 8Z"
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinejoin="round"
		/>
	</svg>
);

export const FamilyIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.4, style}) => (
	<svg {...base(size)} style={style}>
		<circle cx={22} cy={16} r={6} stroke={color} strokeWidth={strokeWidth} />
		<path d="M10 42c0-8 5.4-13 12-13s12 5 12 13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
		<circle cx={44} cy={20} r={5} stroke={color} strokeWidth={strokeWidth} />
		<path d="M34 44c0-6.6 4.5-11 10-11s10 4.4 10 11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
		<circle cx={32} cy={50} r={3.6} stroke={color} strokeWidth={strokeWidth} />
		<path d="M24 60c0-5 3.6-8.4 8-8.4s8 3.4 8 8.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
	</svg>
);

export const InfinityIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.6, style}) => (
	<svg {...base(size)} style={style}>
		<path
			d="M18 32c-6 0-10 4-10 8s4 8 10 8c8 0 11-16 22-16c6 0 10 4 10 8s-4 8-10 8c-11 0-14-16-22-16Z"
			stroke={color}
			strokeWidth={strokeWidth}
		/>
	</svg>
);

export const MonumentIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.2, style}) => (
	<svg {...base(size)} style={style}>
		<path d="M32 6l9 14H23l9-14Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
		<path d="M20 20h24v34H20V20Z" stroke={color} strokeWidth={strokeWidth} />
		<path d="M14 58h36" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
		<path d="M26 30h12M26 38h12M26 46h12" stroke={color} strokeWidth={strokeWidth * 0.85} strokeLinecap="round" />
	</svg>
);

export const SealIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2, style}) => (
	<svg {...base(size)} style={style}>
		<circle cx={32} cy={32} r={24} stroke={color} strokeWidth={strokeWidth} strokeDasharray="4 5" />
		<circle cx={32} cy={32} r={17} stroke={color} strokeWidth={strokeWidth} />
		<path d="M24 32l5.5 5.5L41 26" stroke={color} strokeWidth={strokeWidth * 1.3} strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export const FragmentIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.2, style}) => (
	<svg {...base(size)} style={style}>
		<path d="M8 40L30 8l8 14l18 6l-14 20l-18-2L8 40Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
		<path d="M30 8L24 34l14-2M38 22L48 28" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
	</svg>
);

export const BranchPathIcon: React.FC<IconProps> = ({size = 64, color = '#151310', strokeWidth = 2.4, style}) => (
	<svg {...base(size)} style={style}>
		<circle cx={32} cy={10} r={4} stroke={color} strokeWidth={strokeWidth} />
		<path d="M32 14v10" stroke={color} strokeWidth={strokeWidth} />
		<path d="M32 24L14 44M32 24L50 44" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
		<circle cx={14} cy={50} r={4} stroke={color} strokeWidth={strokeWidth} />
		<circle cx={50} cy={50} r={4} stroke={color} strokeWidth={strokeWidth} />
	</svg>
);
