import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors, fonts} from '../theme';
import {SCENE_BOUNDS, LINES, rel} from '../scenes';
import {PaperTexture} from '../components/PaperTexture';
import {GrainOverlay} from '../components/GrainOverlay';
import {CameraMove} from '../components/CameraMove';
import {CutoutImage} from '../components/CutoutImage';
import {SkullIcon} from '../components/Motifs';
import {EditorialLabel} from '../components/EditorialLabel';

const start = SCENE_BOUNDS.deathReveal.from;
const duration = rel(start, SCENE_BOUNDS.deathReveal.to);

export const Scene2DeathReveal: React.FC = () => {
	const frame = useCurrentFrame();
	const wordScale = interpolate(frame, [rel(start, LINES.deathWord.from), rel(start, LINES.deathWord.from) + 20], [0.7, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const wordOpacity = interpolate(frame, [rel(start, LINES.deathWord.from), rel(start, LINES.deathWord.from) + 14], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: colors.fadedBlack}}>
			<PaperTexture tone="teal" />
			<GrainOverlay opacity={0.1} />
			<CameraMove durationInFrames={duration} fromScale={1} toScale={1.12}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<CutoutImage width={280} height={280} delay={0} fromY={0} fromRotate={0} rotate={-4} elevation={3}>
						<SkullIcon size={280} />
					</CutoutImage>
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div
						style={{
							transform: `scale(${wordScale})`,
							opacity: wordOpacity,
							fontFamily: fonts.headline,
							fontWeight: 700,
							fontSize: 128,
							color: colors.cream,
							marginTop: 360,
							letterSpacing: 2,
						}}
					>
						الموت
					</div>
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 340, gap: 20}}>
					<EditorialLabel text="إرنست بيكر" delay={rel(start, LINES.deathWord.from) + 24} fontSize={38} rotate={2} />
					<EditorialLabel
						text="من كتاب «إنكار الموت»"
						delay={rel(start, LINES.bookTitle.from)}
						fontSize={32}
						rotate={-1}
						tone="stamp"
					/>
				</AbsoluteFill>
			</CameraMove>
		</AbsoluteFill>
	);
};
