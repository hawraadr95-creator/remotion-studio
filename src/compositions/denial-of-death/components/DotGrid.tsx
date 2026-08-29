import React, {useMemo} from 'react';
import {layout} from '../theme';

interface DotGridProps {
	color: string;
	cell?: number;
	dotSize?: number;
	opacity?: number;
	offsetX?: number;
	offsetY?: number;
}

export const DotGrid: React.FC<DotGridProps> = ({
	color,
	cell = 72,
	dotSize = 2.2,
	opacity = 1,
	offsetX = 0,
	offsetY = 0,
}) => {
	const dots = useMemo(() => {
		const cols = Math.ceil(layout.width / cell) + 1;
		const rows = Math.ceil(layout.height / cell) + 1;
		const points: {x: number; y: number}[] = [];
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				points.push({x: col * cell, y: row * cell});
			}
		}
		return points;
	}, [cell]);

	return (
		<svg
			width={layout.width}
			height={layout.height}
			style={{
				position: 'absolute',
				inset: 0,
				opacity,
				transform: `translate(${offsetX}px, ${offsetY}px)`,
			}}
		>
			{dots.map((point, index) => (
				<circle key={index} cx={point.x} cy={point.y} r={dotSize} fill={color} />
			))}
		</svg>
	);
};

interface RuleLinesProps {
	color: string;
	opacity?: number;
	horizontalAt?: number[];
	verticalAt?: number[];
}

export const RuleLines: React.FC<RuleLinesProps> = ({color, opacity = 1, horizontalAt = [], verticalAt = []}) => (
	<svg width={layout.width} height={layout.height} style={{position: 'absolute', inset: 0, opacity}}>
		{horizontalAt.map((y, i) => (
			<line key={`h-${i}`} x1={0} y1={y} x2={layout.width} y2={y} stroke={color} strokeWidth={1} />
		))}
		{verticalAt.map((x, i) => (
			<line key={`v-${i}`} x1={x} y1={0} x2={x} y2={layout.height} stroke={color} strokeWidth={1} />
		))}
	</svg>
);
