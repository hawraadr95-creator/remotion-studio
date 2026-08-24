import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';
import {SCENE_BOUNDS, LINES, rel, TOTAL_SECONDS} from '../scenes';
import {PaperTexture} from '../components/PaperTexture';
import {GrainOverlay} from '../components/GrainOverlay';
import {CameraMove} from '../components/CameraMove';
import {CutoutImage} from '../components/CutoutImage';
import {HourglassIcon} from '../components/Motifs';
import {HandwrittenText} from '../components/HandwrittenText';

const start = SCENE_BOUNDS.paradox.from;
const duration = rel(start, TOTAL_SECONDS);

export const Scene9Paradox: React.FC = () => {
	const frame = useCurrentFrame();
	const flip = interpolate(frame, [rel(start, LINES.afterDeath.from), rel(start, LINES.afterDeath.from) + 24], [0, 180], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const closingDim = interpolate(frame, [duration - 40, duration], [0, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{backgroundColor: colors.tealDeep}}>
			<PaperTexture tone="teal" />
			<GrainOverlay />
			<CameraMove durationInFrames={duration} fromScale={1} toScale={1.1}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', padding: '0 100px', paddingTop: 140}}>
					<HandwrittenText text="لكن المفارقة أحياناً" delay={rel(start, LINES.paradox.from)} fontSize={58} color={colors.grayLight} />
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 300}}>
					<div style={{transform: `rotate(${flip}deg)`}}>
						<CutoutImage width={190} height={261} delay={rel(start, LINES.busy.from)} fromY={0} rotate={0}>
							<HourglassIcon size={190} />
						</CutoutImage>
					</div>
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 90px', paddingTop: 260}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
						<HandwrittenText text="تنشغل كثيراً بمحاولة" delay={rel(start, LINES.busy.from)} fontSize={50} color={colors.grayLight} />
						<HandwrittenText text="أن تبقى بعد الموت" delay={rel(start, LINES.stay.from)} fontSize={58} color={colors.cream} />
					</div>
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 300, padding: '0 70px'}}>
					<HandwrittenText
						text="فتنسى أن تعيش قبله"
						delay={rel(start, LINES.forget.from)}
						fontSize={80}
						color={colors.accent}
					/>
				</AbsoluteFill>
			</CameraMove>
			<AbsoluteFill style={{backgroundColor: '#000', opacity: closingDim, pointerEvents: 'none'}} />
		</AbsoluteFill>
	);
};
