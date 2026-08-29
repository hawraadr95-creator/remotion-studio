import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';
import {getThreadRect} from '../components/MortalityThread';

const AWARENESS_RISE_START = 272;
const AWARENESS_HIDE_START = 315;
const AWARENESS_HIDE_END = 355;
const DOOR_X = 900;
const TICK_COUNT = 8;

export const Scene3ClockRoom: React.FC<{frame: number}> = ({frame}) => {
	const rect = getThreadRect(frame);
	const clockR = rect.w / 2;

	const awarenessY = interpolate(frame, [AWARENESS_RISE_START, AWARENESS_RISE_START + 34], [1900, 1310], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const awarenessX = interpolate(frame, [AWARENESS_HIDE_START, AWARENESS_HIDE_END], [540, DOOR_X], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const awarenessOpacity = interpolate(
		frame,
		[AWARENESS_RISE_START, AWARENESS_RISE_START + 20, AWARENESS_HIDE_START, AWARENESS_HIDE_END],
		[0, 0.85, 0.85, 0.14],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	const activeTicks = Math.min(TICK_COUNT, Math.floor((frame - 243) / 24) + 1);
	const handAngle = (frame - 243) * 2.1;

	return (
		<div style={{position: 'absolute', inset: 0}}>
			<div
				style={{
					position: 'absolute',
					left: DOOR_X,
					top: 700,
					width: 2,
					height: 900,
					background: colors.grayLine,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 90,
					top: 1550,
					width: 900,
					height: 1.5,
					background: colors.grayLine,
				}}
			/>

			{frame >= 236 ? (
				<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
					{Array.from({length: 12}).map((_, i) => {
						const a = (i / 12) * Math.PI * 2;
						const r1 = clockR - 14;
						const r2 = clockR - 26;
						return (
							<line
								key={i}
								x1={rect.x + Math.cos(a) * r1}
								y1={rect.y + Math.sin(a) * r1}
								x2={rect.x + Math.cos(a) * r2}
								y2={rect.y + Math.sin(a) * r2}
								stroke={colors.graphite}
								strokeWidth={2.4}
							/>
						);
					})}
					<line
						x1={rect.x}
						y1={rect.y}
						x2={rect.x + Math.cos(((handAngle - 90) * Math.PI) / 180) * (clockR - 60)}
						y2={rect.y + Math.sin(((handAngle - 90) * Math.PI) / 180) * (clockR - 60)}
						stroke={colors.ink}
						strokeWidth={3.5}
						strokeLinecap="round"
					/>
					<circle cx={rect.x} cy={rect.y} r={7} fill={colors.ink} />
				</svg>
			) : null}

			<div
				style={{
					position: 'absolute',
					left: awarenessX,
					top: awarenessY,
					width: 130,
					height: 130,
					borderRadius: '50%',
					background: colors.ink,
					filter: 'blur(10px)',
					opacity: awarenessOpacity,
					transform: 'translate(-50%, -50%)',
				}}
			/>

			<div style={{position: 'absolute', left: 90, top: 1610, display: 'flex', gap: 14}}>
				{Array.from({length: TICK_COUNT}).map((_, i) => (
					<div
						key={i}
						style={{
							width: 10,
							height: 10,
							borderRadius: 5,
							background: i < activeTicks ? colors.accent : 'transparent',
							border: `1.6px solid ${i < activeTicks ? colors.accent : colors.grayLine}`,
						}}
					/>
				))}
			</div>
		</div>
	);
};
