import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, layout} from '../theme';
import {scenes} from '../script';
import {KineticText} from '../components/KineticText';
import {FragmentIcon} from '../components/icons/Icons';
import {enterProgress, exitProgress, pushIn} from '../components/utils';

const {lines, durationInFrames} = scenes[7];

const SHARDS = [
	{x: -280, y: -420, delay: 0, rot: -12, size: 84},
	{x: 260, y: -360, delay: 65, rot: 20, size: 64},
	{x: -300, y: -120, delay: 105, rot: 34, size: 56},
	{x: 300, y: -80, delay: 153, rot: -22, size: 96},
];

const HalftoneField: React.FC<{frame: number}> = ({frame}) => {
	const dots = useMemo(() => {
		const cell = 46;
		const cols = Math.ceil(layout.width / cell) + 1;
		const rows = 16;
		const points: {x: number; y: number}[] = [];
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				points.push({x: col * cell, y: row * cell});
			}
		}
		return points;
	}, []);

	const density = interpolate(frame, [0, durationInFrames], [0.3, 1], {extrapolateRight: 'clamp'});

	return (
		<svg width={layout.width} height={720} style={{position: 'absolute', top: 260, left: 0, opacity: 0.5}}>
			{dots.map((p, i) => {
				const distFromCenter = Math.abs(p.x - layout.width / 2) / (layout.width / 2);
				const r = Math.max(0.5, (1.2 - distFromCenter) * 5.4 * density);
				return <circle key={i} cx={p.x} cy={p.y} r={r} fill={colors.cream} />;
			})}
		</svg>
	);
};

export const Scene8Paradox: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = pushIn(frame, fps, 1.08, 1);
	const fadeIn = enterProgress(frame, 16);
	const fadeOut = exitProgress(frame, durationInFrames, 14);
	const opacity = fadeIn * (1 - fadeOut);

	const jitterX = Math.sin(frame * 0.9) * 2.4 + Math.sin(frame * 0.37) * 1.2;
	const jitterY = Math.cos(frame * 0.8) * 2;

	return (
		<AbsoluteFill style={{background: colors.night, overflow: 'hidden'}}>
			<HalftoneField frame={frame} />

			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					opacity,
					transform: `scale(${scale}) translate(${jitterX}px, ${jitterY}px)`,
				}}
			>
				<div style={{position: 'relative', width: layout.width, height: 700}}>
					{SHARDS.map((s, i) => {
						const reveal = interpolate(frame - s.delay, [0, 14], [0, 1], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						});
						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									left: layout.width / 2 + s.x,
									top: 340 + s.y,
									opacity: reveal * 0.9,
									transform: `rotate(${s.rot + frame * 0.15}deg) scale(${interpolate(reveal, [0, 1], [0.4, 1])})`,
								}}
							>
								<FragmentIcon size={s.size} color={colors.cream} strokeWidth={2} />
							</div>
						);
					})}
				</div>

				<div style={{width: layout.width - 190, display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: 40}}>
					<KineticText
						frame={frame}
						lines={lines}
						size={62}
						color={colors.cream}
						mutedColor="rgba(239,231,214,0.5)"
						accentColor={colors.rust}
						align="center"
					/>
				</div>
			</AbsoluteFill>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `linear-gradient(180deg, rgba(10,10,11,0) 60%, rgba(10,10,11,0.85) 100%)`,
				}}
			/>
		</AbsoluteFill>
	);
};
