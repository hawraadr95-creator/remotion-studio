import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';
import {SCENE_BOUNDS, LINES, rel} from '../scenes';
import {PaperTexture} from '../components/PaperTexture';
import {GrainOverlay} from '../components/GrainOverlay';
import {CameraMove} from '../components/CameraMove';
import {CutoutImage} from '../components/CutoutImage';
import {CalendarIcon} from '../components/Motifs';
import {HandwrittenText} from '../components/HandwrittenText';

const start = SCENE_BOUNDS.knows.from;
const duration = rel(start, SCENE_BOUNDS.knows.to);

export const Scene3Knows: React.FC = () => {
	return (
		<AbsoluteFill>
			<PaperTexture tone="cream" />
			<GrainOverlay opacity={0.05} />
			<CameraMove durationInFrames={duration} fromScale={1.04} toScale={1}>
				<AbsoluteFill style={{alignItems: 'flex-end', justifyContent: 'flex-start', padding: '260px 110px 0 0'}}>
					<CutoutImage width={190} height={212} delay={2} fromX={40} rotate={6}>
						<CalendarIcon size={190} color={colors.inkSoft} />
					</CutoutImage>
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
						<HandwrittenText
							text="الإنسان يعرف"
							delay={rel(start, LINES.knows1.from)}
							fontSize={76}
							color={colors.ink}
							rotate={-1}
						/>
						<HandwrittenText
							text="أنه سيموت"
							delay={rel(start, LINES.knows2.from)}
							fontSize={92}
							color={colors.burgundy}
							rotate={1}
						/>
					</div>
				</AbsoluteFill>
			</CameraMove>
		</AbsoluteFill>
	);
};
