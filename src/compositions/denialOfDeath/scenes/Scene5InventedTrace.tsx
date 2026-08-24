import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';
import {SCENE_BOUNDS, LINES, rel} from '../scenes';
import {PaperTexture} from '../components/PaperTexture';
import {GrainOverlay} from '../components/GrainOverlay';
import {CameraMove} from '../components/CameraMove';
import {HandDrawnArrow} from '../components/HandDrawnArrow';
import {HandwrittenText} from '../components/HandwrittenText';
import {EditorialLabel} from '../components/EditorialLabel';

const start = SCENE_BOUNDS.inventedTrace.from;
const duration = rel(start, SCENE_BOUNDS.inventedTrace.to);

export const Scene5InventedTrace: React.FC = () => {
	return (
		<AbsoluteFill>
			<PaperTexture tone="cream" />
			<GrainOverlay opacity={0.05} />
			<CameraMove durationInFrames={duration} fromScale={1} toScale={1.05} fromX={0} toX={-14}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
						<HandwrittenText text="لذلك اخترع لنفسه" delay={rel(start, LINES.invent1.from)} fontSize={60} color={colors.ink} rotate={-1} />
						<HandwrittenText
							text="طريقة أخرى للنجاة"
							delay={rel(start, LINES.invent2.from)}
							fontSize={70}
							color={colors.tealDark}
							rotate={1}
						/>
						<EditorialLabel text="أن يترك أثراً" delay={rel(start, LINES.invent3.from)} fontSize={44} rotate={2} />
					</div>
				</AbsoluteFill>

				{/* a signature-like stroke trailing off, standing in for "leaving a trace" */}
				<HandDrawnArrow
					from={[300, 1500]}
					to={[780, 1560]}
					curve={-40}
					delay={rel(start, LINES.invent3.from) + 20}
					durationInFrames={30}
					color={colors.brown}
					strokeWidth={4}
				/>
			</CameraMove>
		</AbsoluteFill>
	);
};
