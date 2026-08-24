import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';
import {SCENE_BOUNDS, LINES, rel} from '../scenes';
import {PaperTexture} from '../components/PaperTexture';
import {GrainOverlay} from '../components/GrainOverlay';
import {CameraMove} from '../components/CameraMove';
import {CutoutImage} from '../components/CutoutImage';
import {ClockIcon} from '../components/Motifs';
import {HandwrittenText} from '../components/HandwrittenText';
import {EditorialLabel} from '../components/EditorialLabel';

const start = SCENE_BOUNDS.cantLive.from;
const duration = rel(start, SCENE_BOUNDS.cantLive.to);

export const Scene4CantLive: React.FC = () => {
	const frame = useCurrentFrame();
	const tick = interpolate(frame, [0, duration], [0, 340]); // slow relentless rotation

	return (
		<AbsoluteFill style={{backgroundColor: colors.tealDeep}}>
			<PaperTexture tone="teal" />
			<GrainOverlay />
			<CameraMove durationInFrames={duration} fromScale={1} toScale={1.08} fromY={0} toY={-16}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 210}}>
					<div style={{transform: `rotate(${tick}deg)`}}>
						<CutoutImage width={230} height={230} delay={0} fromY={-20} rotate={0}>
							<ClockIcon size={230} />
						</CutoutImage>
					</div>
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 90px', paddingTop: 120}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
						<HandwrittenText text="لكنه لا يستطيع أن يعيش" delay={rel(start, LINES.cant1.from)} fontSize={58} color={colors.cream} />
						<HandwrittenText text="وهو يفكر" delay={rel(start, LINES.cant2.from)} fontSize={58} color={colors.grayLight} />
						<HandwrittenText text="بهذه الحقيقة" delay={rel(start, LINES.cant3.from)} fontSize={58} color={colors.grayLight} />
						<EditorialLabel text="كل يوم" delay={rel(start, LINES.cant4.from)} fontSize={46} rotate={-4} tone="stamp" />
					</div>
				</AbsoluteFill>
			</CameraMove>
		</AbsoluteFill>
	);
};
