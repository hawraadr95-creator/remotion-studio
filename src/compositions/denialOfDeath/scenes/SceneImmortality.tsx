import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {PaperTexture} from '../components/PaperTexture';
import {HourglassHalo} from '../components/HourglassHalo';
import {KineticCaption} from '../components/KineticCaption';

// Segments 25-26 (0:32.5-0:35.9): all of it -- an attempt to manufacture a
// kind of symbolic immortality. The desire-icons collapse into an orbit
// around an hourglass.
export const SceneImmortality: React.FC = () => {
	const frame = useCurrentFrame();
	const camScale = interpolate(frame, [0, 129], [1, 1.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{transform: `scale(${camScale})`}}>
				<PaperTexture />
				<HourglassHalo start={0} icons />

				<KineticCaption text={'هي محاولة لصناعة'} start={15} top={280} fontSize={60} />
				<KineticCaption text={'نوع من الخلود الرمزي'} start={70} top={1480} fontSize={58} circle />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
