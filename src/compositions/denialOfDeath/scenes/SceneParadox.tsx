import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {PaperTexture} from '../components/PaperTexture';
import {HourglassHalo} from '../components/HourglassHalo';
import {CandleDoor} from '../components/CandleDoor';
import {KineticCaption} from '../components/KineticCaption';

// Segments 27-32 (0:36.3-0:44.8): the paradox -- so busy trying to remain
// after death that you forget to live before it. The hourglass drains
// faster, a candle gutters, and a door closes into shadow.
export const SceneParadox: React.FC = () => {
	const frame = useCurrentFrame();
	const camScale = interpolate(frame, [0, 291], [1.05, 1.22], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const hourglassOpacity = interpolate(frame, [0, 40, 150, 190], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: '#0c0a08'}}>
			<AbsoluteFill style={{transform: `scale(${camScale})`, opacity: 1}}>
				<PaperTexture />
				<div style={{position: 'absolute', inset: 0, opacity: hourglassOpacity}}>
					<HourglassHalo start={0} drainSpeed={2.4} />
				</div>

				<KineticCaption text={'لكن المفارقة أحياناً'} start={0} top={230} fontSize={60} />
				<KineticCaption text={'تنشغل كثيراً'} start={65} top={1100} fontSize={60} />
				<KineticCaption text={'بمحاولة أن تبقى'} start={105} top={1220} fontSize={58} />
				<KineticCaption text={'بعد الموت'} start={153} top={1340} fontSize={62} />
			</AbsoluteFill>

			<CandleDoor start={150} />

			<KineticCaption text={'فتنسى أن تعيش قبله'} start={191} top={1650} fontSize={60} circle />
		</AbsoluteFill>
	);
};
