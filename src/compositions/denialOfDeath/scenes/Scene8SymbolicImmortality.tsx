import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';
import {SCENE_BOUNDS, LINES, rel} from '../scenes';
import {PaperTexture} from '../components/PaperTexture';
import {GrainOverlay} from '../components/GrainOverlay';
import {CameraMove} from '../components/CameraMove';
import {CutoutImage} from '../components/CutoutImage';
import {GravestoneIcon, MedalIcon, InfinityIcon} from '../components/Motifs';
import {HandwrittenText} from '../components/HandwrittenText';
import {HandDrawnArrow} from '../components/HandDrawnArrow';

const start = SCENE_BOUNDS.symbolicImmortality.from;
const duration = rel(start, SCENE_BOUNDS.symbolicImmortality.to);

export const Scene8SymbolicImmortality: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: colors.tealDeep}}>
			<PaperTexture tone="teal" />
			<GrainOverlay />
			<CameraMove durationInFrames={duration} fromScale={1.15} toScale={1} fromX={40} toX={0}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', padding: '0 100px', paddingTop: 150}}>
					<HandwrittenText text="بيكر يشوف أن هواي" delay={rel(start, LINES.sees.from)} fontSize={56} color={colors.cream} />
				</AbsoluteFill>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', padding: '0 100px', paddingTop: 250}}>
					<HandwrittenText
						text="من الأشياء اللي نطاردها"
						delay={rel(start, LINES.sees.from) + 24}
						fontSize={56}
						color={colors.grayLight}
					/>
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 40, flexDirection: 'row', paddingTop: 60}}>
					<CutoutImage width={150} height={150} delay={rel(start, LINES.sees.from) + 40} fromX={-60} rotate={-8}>
						<GravestoneIcon size={150} />
					</CutoutImage>
					<CutoutImage width={140} height={140} delay={rel(start, LINES.sees.from) + 50} fromY={-50} rotate={4}>
						<MedalIcon size={140} />
					</CutoutImage>
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 520}}>
					<HandwrittenText text="هي محاولة لصناعة" delay={rel(start, LINES.attempt.from)} fontSize={58} color={colors.cream} />
				</AbsoluteFill>

				<HandDrawnArrow
					from={[380, 1260]}
					to={[540, 1360]}
					delay={rel(start, LINES.attempt.from) + 16}
					curve={20}
					color={colors.grayLight}
				/>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 260, gap: 30}}>
					<CutoutImage width={260} height={145} delay={rel(start, LINES.symbolic.from)} fromY={40} rotate={0}>
						<InfinityIcon size={260} color={colors.cream} />
					</CutoutImage>
					<HandwrittenText
						text="نوع من الخلود الرمزي"
						delay={rel(start, LINES.symbolic.from) + 10}
						fontSize={64}
						color={colors.cream}
					/>
				</AbsoluteFill>
			</CameraMove>
		</AbsoluteFill>
	);
};
