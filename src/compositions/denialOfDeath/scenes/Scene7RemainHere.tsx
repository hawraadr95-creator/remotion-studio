import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';
import {SCENE_BOUNDS, LINES, rel} from '../scenes';
import {PaperTexture} from '../components/PaperTexture';
import {GrainOverlay} from '../components/GrainOverlay';
import {CameraMove} from '../components/CameraMove';
import {ScribbleCircle} from '../components/ScribbleCircle';
import {HandwrittenText} from '../components/HandwrittenText';

const start = SCENE_BOUNDS.remainHere.from;
const duration = rel(start, SCENE_BOUNDS.remainHere.to);

export const Scene7RemainHere: React.FC = () => {
	return (
		<AbsoluteFill>
			<PaperTexture tone="cream" />
			<GrainOverlay opacity={0.05} />
			<CameraMove durationInFrames={duration} fromScale={1} toScale={1.04}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 90px'}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
						<HandwrittenText text="تريد شي يبقى" delay={0} fontSize={54} color={colors.inkSoft} />
						<HandwrittenText text="ويقول للعالم" delay={rel(start, LINES.remain2.from)} fontSize={54} color={colors.inkSoft} />
						<div style={{position: 'relative', padding: '18px 30px'}}>
							<HandwrittenText
								text="إنك كنت هنا"
								delay={rel(start, LINES.remain3.from)}
								fontSize={94}
								color={colors.burgundy}
							/>
							<ScribbleCircle
								width={620}
								height={220}
								delay={rel(start, LINES.remain3.from) + 14}
								durationInFrames={26}
								style={{top: -20, left: -60}}
							/>
						</div>
					</div>
				</AbsoluteFill>

				<AbsoluteFill style={{alignItems: 'flex-end', justifyContent: 'flex-end', padding: '0 70px 90px 0'}}>
					<HandwrittenText
						text="— هنا بيكر"
						delay={rel(start, LINES.beckerHere.from)}
						fontSize={36}
						color={colors.gray}
						rotate={-3}
					/>
				</AbsoluteFill>
			</CameraMove>
		</AbsoluteFill>
	);
};
