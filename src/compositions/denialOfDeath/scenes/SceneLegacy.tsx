import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {PaperTexture} from '../components/PaperTexture';
import {SignatureTree} from '../components/SignatureTree';
import {KineticCaption} from '../components/KineticCaption';

// Segments 12-14 (0:15.0-0:19.5): so he invents another way to survive --
// to leave a trace. A signature grows into a small tree.
export const SceneLegacy: React.FC = () => {
	const frame = useCurrentFrame();
	const camScale = interpolate(frame, [0, 140], [1, 1.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{transform: `scale(${camScale})`}}>
				<PaperTexture />
				<SignatureTree start={0} />

				<KineticCaption text={'لذلك اخترع لنفسه'} start={2} top={280} fontSize={60} />
				<KineticCaption text={'طريقة أخرى للنجاة'} start={53} top={430} fontSize={58} />
				<KineticCaption text={'أن يترك أثراً'} start={106} top={1500} fontSize={64} circle />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
