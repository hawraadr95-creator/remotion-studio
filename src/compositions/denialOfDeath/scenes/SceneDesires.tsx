import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {PaperTexture} from '../components/PaperTexture';
import {KineticCaption} from '../components/KineticCaption';
import {StarIcon, MedalIcon, TrophyIcon, FamilyIcon, MonumentIcon} from '../components/Icons';

const pop = (frame: number, start: number) => {
	const t = interpolate(frame, [start, start + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return {opacity: t, scale: interpolate(t, [0, 1], [0.6, 1])};
};

// Segments 15-22 (0:19.9-0:29.9): success, fame, achievement, family -- each
// a small trophy on a shelf of desires, converging into "something that
// stays" and speaks to the world that you existed.
export const SceneDesires: React.FC = () => {
	const frame = useCurrentFrame();

	const star = pop(frame, 7);
	const medal = pop(frame, 50);
	const trophy = pop(frame, 76);
	const family = pop(frame, 98);
	const monumentGrowth = interpolate(frame, [144, 200], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const camZoom = interpolate(frame, [0, 140, 240, 268], [1.28, 1.1, 1.1, 1.34], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const camY = interpolate(frame, [140, 268], [0, -40], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{transform: `scale(${camZoom}) translate(0, ${camY}px)`}}>
				<PaperTexture />

				<svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
					<line x1={140} y1={950} x2={940} y2={950} stroke={'#847a5f'} strokeWidth={2} opacity={0.4} />
				</svg>

				<div style={{position: 'absolute', left: 190, top: 850, opacity: star.opacity, transform: `scale(${star.scale})`}}>
					<StarIcon />
				</div>
				<div style={{position: 'absolute', left: 390, top: 850, opacity: medal.opacity, transform: `scale(${medal.scale})`}}>
					<MedalIcon />
				</div>
				<div style={{position: 'absolute', left: 590, top: 850, opacity: trophy.opacity, transform: `scale(${trophy.scale})`}}>
					<TrophyIcon />
				</div>
				<div style={{position: 'absolute', left: 790, top: 850, opacity: family.opacity, transform: `scale(${family.scale})`}}>
					<FamilyIcon />
				</div>

				<KineticCaption text={'لذلك أنت تريد تنجح'} start={7} top={220} fontSize={58} />
				<KineticCaption text={'تريد تشتهر'} start={50} top={340} fontSize={56} />
				<KineticCaption text={'تريد تنجز'} start={76} top={1100} fontSize={56} />
				<KineticCaption text={'وتريد تكون أسرة'} start={98} top={1220} fontSize={54} />

				{monumentGrowth > 0 && (
					<div
						style={{
							position: 'absolute',
							left: '50%',
							top: 1250,
							transform: 'translateX(-50%)',
							opacity: monumentGrowth,
						}}
					>
						<MonumentIcon growth={interpolate(monumentGrowth, [0, 1], [0.3, 1])} />
					</div>
				)}

				<KineticCaption text={'بالأحرى.. تريد شيئاً يبقى'} start={144} top={1500} fontSize={56} circle />
				<KineticCaption text={'ويقول للعالم'} start={207} top={280} fontSize={58} />
				<KineticCaption text={'أنّك كنت هنا'} start={238} top={400} fontSize={64} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
