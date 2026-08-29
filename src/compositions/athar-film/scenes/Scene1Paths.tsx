import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';
import {bodyFont} from '../fonts';
import {easeIn} from '../components/utils';

const ORIGIN = {x: 540, y: 1480};

const NODES = [
	{x: 170, y: 1020, delay: 10, label: 'المسار المهني', icon: 'career'},
	{x: 250, y: 760, delay: 20, label: 'العلاقات', icon: 'bond'},
	{x: 430, y: 580, delay: 30, label: 'الإنجاز', icon: 'star'},
	{x: 650, y: 580, delay: 40, label: 'المكانة', icon: 'chevron'},
	{x: 830, y: 760, delay: 50, label: 'البيت', icon: 'home'},
	{x: 910, y: 1020, delay: 60, label: 'المستقبل', icon: 'arrow'},
] as const;

const NodeIcon: React.FC<{type: (typeof NODES)[number]['icon']}> = ({type}) => {
	const stroke = colors.ink;
	const sw = 2.4;
	switch (type) {
		case 'career':
			return (
				<svg width={38} height={38} viewBox="0 0 38 38">
					<rect x={6} y={14} width={26} height={18} rx={2.5} stroke={stroke} strokeWidth={sw} fill="none" />
					<path d="M14 14v-3a5 5 0 0 1 10 0v3" stroke={stroke} strokeWidth={sw} fill="none" />
					<line x1={6} y1={22} x2={32} y2={22} stroke={stroke} strokeWidth={sw} />
				</svg>
			);
		case 'bond':
			return (
				<svg width={38} height={38} viewBox="0 0 38 38">
					<circle cx={15} cy={19} r={11} stroke={stroke} strokeWidth={sw} fill="none" />
					<circle cx={23} cy={19} r={11} stroke={stroke} strokeWidth={sw} fill="none" />
				</svg>
			);
		case 'star':
			return (
				<svg width={38} height={38} viewBox="0 0 38 38">
					<path
						d="M19 5l4.2 8.7 9.6 1.4-7 6.8 1.7 9.6L19 27l-8.5 4.5 1.7-9.6-7-6.8 9.6-1.4L19 5Z"
						stroke={stroke}
						strokeWidth={sw}
						strokeLinejoin="round"
						fill="none"
					/>
				</svg>
			);
		case 'chevron':
			return (
				<svg width={38} height={38} viewBox="0 0 38 38">
					<circle cx={19} cy={19} r={16} stroke={stroke} strokeWidth={sw} fill="none" />
					<path d="M12 22l7-7 7 7" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			);
		case 'home':
			return (
				<svg width={38} height={38} viewBox="0 0 38 38">
					<path d="M6 18L19 7l13 11" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M10 16v14h18V16" stroke={stroke} strokeWidth={sw} fill="none" />
				</svg>
			);
		case 'arrow':
			return (
				<svg width={38} height={38} viewBox="0 0 38 38">
					<path d="M8 28L28 8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
					<path d="M15 8h13v13" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			);
	}
};

export const Scene1Paths: React.FC<{frame: number}> = ({frame}) => {
	const push = interpolate(frame, [0, 130], [1, 1.045], {extrapolateRight: 'clamp'});

	return (
		<div style={{position: 'absolute', inset: 0, transform: `scale(${push})`, transformOrigin: '50% 62%'}}>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				{NODES.map((node, i) => {
					const midX = (ORIGIN.x + node.x) / 2 + (i % 2 === 0 ? -30 : 30);
					const midY = (ORIGIN.y + node.y) / 2;
					const d = `M${ORIGIN.x},${ORIGIN.y} Q${midX},${midY} ${node.x},${node.y}`;
					const draw = easeIn(frame, node.delay, 44);
					return (
						<path
							key={node.label}
							d={d}
							stroke={colors.graphite}
							strokeWidth={2}
							fill="none"
							pathLength={1}
							strokeDasharray={1}
							strokeDashoffset={1 - draw}
							opacity={0.85}
						/>
					);
				})}
			</svg>

			{NODES.map((node) => {
				const reveal = easeIn(frame, node.delay + 40, 18);
				return (
					<div
						key={node.label}
						style={{
							position: 'absolute',
							left: node.x,
							top: node.y,
							transform: `translate(-50%, -50%) scale(${interpolate(reveal, [0, 1], [0.5, 1])})`,
							opacity: reveal,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 8,
						}}
					>
						<div
							style={{
								width: 62,
								height: 62,
								borderRadius: '50%',
								background: colors.paper,
								border: `1.5px solid ${colors.grayLine}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 8px 18px rgba(24,22,20,0.1)',
							}}
						>
							<NodeIcon type={node.icon} />
						</div>
						<span style={{fontFamily: bodyFont, fontSize: 15, color: colors.graphite, fontWeight: 500}}>{node.label}</span>
					</div>
				);
			})}
		</div>
	);
};
