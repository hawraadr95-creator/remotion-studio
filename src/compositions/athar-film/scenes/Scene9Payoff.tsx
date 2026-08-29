import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';
import {HumanFigure} from '../components/HumanFigure';

export const Scene9Payoff: React.FC<{frame: number}> = ({frame}) => {
	const monumentFade = interpolate(frame, [1280, 1304], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const monumentScale = interpolate(frame, [1280, 1304], [1.85, 0.25], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const warmth = interpolate(frame, [1288, 1330], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const pullBack = interpolate(frame, [1280, 1360], [1, 0.94], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const horizonDraw = interpolate(frame, [1296, 1330], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const sceneryOpacity = interpolate(frame, [1300, 1330], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<div style={{position: 'absolute', inset: 0, transform: `scale(${pullBack})`, transformOrigin: '50% 55%'}}>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: warmth,
					background: `linear-gradient(180deg, ${colors.paperDeep} 0%, ${colors.paper} 55%, ${colors.cream} 100%)`,
				}}
			/>

			{monumentFade > 0.01 ? (
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: 1720,
						transform: `translate(-50%, -100%) scale(${monumentScale})`,
						transformOrigin: '50% 100%',
						opacity: monumentFade,
					}}
				>
					<svg width={520} height={1400} viewBox="0 0 520 1400">
						<path
							d="M260 20 C 200 20 170 90 170 170 L120 1380 L400 1380 L350 170 C 350 90 320 20 260 20 Z"
							fill={colors.ink}
						/>
					</svg>
				</div>
			) : null}

			<div style={{position: 'absolute', inset: 0, opacity: sceneryOpacity}}>
				<div
					style={{
						position: 'absolute',
						left: '62%',
						top: 620,
						width: 360,
						height: 360,
						borderRadius: '50%',
						background: `radial-gradient(circle, rgba(185,137,60,0.3) 0%, rgba(238,234,225,0) 70%)`,
					}}
				/>

				<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
					<line
						x1={100}
						y1={1650}
						x2={100 + 880 * horizonDraw}
						y2={1650}
						stroke={colors.graphite}
						strokeWidth={2}
						opacity={0.6}
					/>
					<g transform="translate(250,1560)" opacity={0.8}>
						<line x1={0} y1={0} x2={0} y2={100} stroke={colors.graphite} strokeWidth={5} />
						<circle cx={0} cy={-32} r={62} fill={colors.charcoal} opacity={0.85} />
					</g>
				</svg>

				<div style={{position: 'absolute', left: 780, top: 1560}}>
					<HumanFigure size={170} opacity={0.55} pose={{armsRaise: 0.08}} />
				</div>
			</div>
		</div>
	);
};
