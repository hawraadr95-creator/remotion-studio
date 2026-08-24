import React from 'react';

// A soft, physical drop-shadow used under every cut-out paper element so
// layers read as stacked objects rather than flat digital shapes.
export const paperShadow = (elevation: number = 1) =>
	`0 ${6 * elevation}px ${18 * elevation}px rgba(0,0,0,${0.32 + elevation * 0.04}), 0 ${2 * elevation}px ${4 * elevation}px rgba(0,0,0,0.22)`;

export const PaperShadow: React.FC<{
	elevation?: number;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({elevation = 1, children, style}) => (
	<div style={{filter: `drop-shadow(0 ${6 * elevation}px ${10 * elevation}px rgba(0,0,0,0.35))`, ...style}}>
		{children}
	</div>
);
