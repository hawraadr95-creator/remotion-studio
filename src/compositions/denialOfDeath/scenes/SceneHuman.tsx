import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {PaperTexture} from '../components/PaperTexture';
import {DayNightWalk} from '../components/DayNightWalk';
import {KineticCaption} from '../components/KineticCaption';

// Segments 6-11 (0:08.1-0:14.9): man knows he will die, yet cannot live
// thinking of it every day -- a walking figure under a cycling sun/moon.
export const SceneHuman: React.FC = () => {
	const frame = useCurrentFrame();
	const camX = interpolate(frame, [0, 210], [0, -40], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const camScale = interpolate(frame, [0, 210], [1.1, 1.2], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{transform: `scale(${camScale}) translate(${camX}px, 0)`}}>
				<PaperTexture />
				<DayNightWalk />

				<KineticCaption text={'يقول إن الإنسان'} start={3} top={260} fontSize={62} />
				<KineticCaption text={'يعرف أنه سيموت'} start={32} top={420} fontSize={62} />
				<KineticCaption text={'لكنه لا يستطيع أن يعيش'} start={75} top={1300} fontSize={56} />
				<KineticCaption text={'وهو يفكر بهذه الحقيقة\nكل يوم'} start={128} top={1460} fontSize={54} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
