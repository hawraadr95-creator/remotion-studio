import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fonts} from '../theme';
import {SCENE_BOUNDS, LINES, rel} from '../scenes';
import {PaperTexture} from '../components/PaperTexture';
import {GrainOverlay} from '../components/GrainOverlay';
import {CameraMove} from '../components/CameraMove';
import {CutoutImage} from '../components/CutoutImage';
import {HandDrawnArrow} from '../components/HandDrawnArrow';
import {CompassIcon} from '../components/Motifs';
import {HandwrittenText} from '../components/HandwrittenText';

const start = SCENE_BOUNDS.hook.from;
const duration = rel(start, SCENE_BOUNDS.hook.to);

export const Scene1Hook: React.FC = () => {
	return (
		<AbsoluteFill>
			<PaperTexture tone="teal" />
			<GrainOverlay />
			<CameraMove durationInFrames={duration} fromScale={1.1} toScale={1}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 300}}>
					<CutoutImage width={220} height={220} delay={4} fromY={-40} rotate={-8}>
						<CompassIcon size={220} />
					</CutoutImage>
				</AbsoluteFill>

				<HandDrawnArrow from={[560, 470]} to={[540, 660]} delay={26} curve={30} />

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28}}>
						<HandwrittenText
							text="اغلب قراراتك بالحياة"
							delay={rel(start, LINES.hook1.from)}
							fontSize={72}
							color={colors.cream}
							rotate={-1}
						/>
						<HandwrittenText
							text="قد يكون سببها"
							delay={rel(start, LINES.hook1.from) + 16}
							fontSize={72}
							color={colors.cream}
							rotate={1}
						/>
						<HandwrittenText
							text="شيء انت اصلاً ما تفكر فيه"
							delay={rel(start, LINES.hook2.from)}
							fontSize={58}
							color={colors.grayLight}
							rotate={-1}
							style={{marginTop: 20, fontFamily: fonts.label, fontWeight: 500}}
						/>
					</div>
				</AbsoluteFill>
			</CameraMove>
		</AbsoluteFill>
	);
};
