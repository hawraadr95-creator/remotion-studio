import React, {useMemo} from 'react';
import {colors} from '../theme';
import {paperShadow} from './PaperShadow';

// A paper rectangle with a hand-torn edge (procedural jagged clip-path),
// used for photo-fragment / newspaper-clipping style elements.
export const TornPaper: React.FC<{
	width: number;
	height: number;
	tone?: 'paper' | 'cream' | 'dark';
	edge?: 'bottom' | 'top' | 'right' | 'left' | 'all';
	rotate?: number;
	seed?: number;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}> = ({width, height, tone = 'paper', edge = 'bottom', rotate = 0, seed = 1, style, children}) => {
	const clipPath = useMemo(() => makeTornClip(width, height, edge, seed), [width, height, edge, seed]);

	const bg = tone === 'cream' ? colors.cream : tone === 'dark' ? colors.paperDark : colors.paper;

	return (
		<div
			style={{
				width,
				height,
				transform: `rotate(${rotate}deg)`,
				filter: paperShadow(1),
				...style,
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					background: bg,
					clipPath,
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{children}
			</div>
		</div>
	);
};

function rand(seed: number, i: number) {
	const x = Math.sin(seed * 999 + i * 37.13) * 10000;
	return x - Math.floor(x);
}

function makeTornClip(w: number, h: number, edge: string, seed: number): string {
	const teeth = 14;
	const jag = 7;
	const pts: [number, number][] = [];

	const tornEdgePoints = (length: number, axis: 'x' | 'y', fixed: number, invert: boolean) => {
		const out: [number, number][] = [];
		for (let i = 0; i <= teeth; i++) {
			const t = (i / teeth) * length;
			const j = (rand(seed, i) - 0.5) * 2 * jag + (i % 2 === 0 ? jag * 0.4 : -jag * 0.4);
			const val = invert ? fixed - j : fixed + j;
			out.push(axis === 'x' ? [t, val] : [val, t]);
		}
		return out;
	};

	if (edge === 'bottom' || edge === 'all') {
		pts.push([0, 0], [w, 0], [w, h]);
		pts.push(...tornEdgePoints(w, 'x', h, false).reverse());
	} else if (edge === 'top') {
		pts.push(...tornEdgePoints(w, 'x', 0, true));
		pts.push([w, h], [0, h]);
	} else if (edge === 'right') {
		pts.push([0, 0]);
		pts.push(...tornEdgePoints(h, 'y', w, false));
		pts.push([0, h]);
	} else {
		pts.push([w, 0]);
		pts.push(...tornEdgePoints(h, 'y', 0, true));
		pts.push([w, h]);
	}

	return `polygon(${pts.map(([x, y]) => `${x}px ${y}px`).join(',')})`;
}
