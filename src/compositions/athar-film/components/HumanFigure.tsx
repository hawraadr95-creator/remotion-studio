import React from 'react';
import {colors} from '../theme';

export interface FigurePose {
	walkPhase?: number; // continuous 0..1 loop, drives stride
	swingAmount?: number; // 0 = static idle, 1 = full walking swing
	armsRaise?: number; // 0 = resting at sides, 1 = raised overhead
	lean?: number; // degrees, forward torso lean (running/reaching)
	idleSway?: number; // small sine value for breathing/idle motion
}

interface HumanFigureProps {
	pose?: FigurePose;
	size?: number;
	flip?: boolean;
	color?: string;
	opacity?: number;
	id?: string;
}

const GRADIENT_ID_BASE = 'atharFigureGradient';

export const HumanFigure: React.FC<HumanFigureProps> = ({
	pose = {},
	size = 260,
	flip = false,
	color = colors.ink,
	opacity = 1,
	id = 'main',
}) => {
	const {walkPhase = 0, swingAmount = 0, armsRaise = 0, lean = 0, idleSway = 0} = pose;
	const gradientId = `${GRADIENT_ID_BASE}-${id}`;

	const legSwing = Math.sin(walkPhase * Math.PI * 2) * 26 * swingAmount;
	const legSwingOpp = Math.sin(walkPhase * Math.PI * 2 + Math.PI) * 26 * swingAmount;
	const armSwing = -legSwing * 0.7;
	const armSwingOpp = -legSwingOpp * 0.7;

	const armRestAngle = 8;
	const armRaisedAngle = -158;
	const armLeftAngle = armRestAngle + (armRaisedAngle - armRestAngle) * armsRaise + armSwing;
	const armRightAngle = -armRestAngle - (armRaisedAngle - armRestAngle) * armsRaise + armSwingOpp;

	return (
		<svg
			width={size}
			height={size * 2}
			viewBox="0 0 160 320"
			style={{overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined, opacity}}
		>
			<defs>
				<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor={colors.graphite} />
					<stop offset="55%" stopColor={color} />
					<stop offset="100%" stopColor={colors.ink} />
				</linearGradient>
			</defs>

			<ellipse cx={80} cy={312} rx={30 + swingAmount * 4} ry={6} fill="rgba(0,0,0,0.16)" />

			<g transform={`rotate(${lean + idleSway} 80 200)`}>
				<rect x={64} y={205} width={16} height={95} rx={8} transform={`rotate(${legSwing} 72 210)`} fill={gradientId ? `url(#${gradientId})` : color} />
				<rect x={82} y={205} width={16} height={95} rx={8} transform={`rotate(${legSwingOpp} 90 210)`} fill={`url(#${gradientId})`} />

				<path d="M58 90 Q56 150 66 205 L94 205 Q104 150 102 90 Q92 74 80 74 Q68 74 58 90Z" fill={`url(#${gradientId})`} />

				<rect x={46} y={78} width={15} height={80} rx={7.5} transform={`rotate(${armLeftAngle} 53.5 84)`} fill={`url(#${gradientId})`} />
				<rect x={99} y={78} width={15} height={80} rx={7.5} transform={`rotate(${armRightAngle} 106.5 84)`} fill={`url(#${gradientId})`} />

				<rect x={70} y={58} width={20} height={22} rx={6} fill={`url(#${gradientId})`} />
				<circle cx={80} cy={38} r={27} fill={`url(#${gradientId})`} />
			</g>
		</svg>
	);
};
