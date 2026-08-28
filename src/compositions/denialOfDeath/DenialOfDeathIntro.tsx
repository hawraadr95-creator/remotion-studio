import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Amiri';
import {PaperTexture} from './components/PaperTexture';
import {ClockToArrow} from './components/ClockToArrow';
import {SilhouetteSkull} from './components/SilhouetteSkull';
import {KineticCaption} from './components/KineticCaption';
import {BookPageTurn} from './components/BookPageTurn';
import {TitleCard} from './components/TitleCard';

loadFont('normal', {weights: ['400', '700'], subsets: ['arabic']});

const PAGE_TURN_START = 168;
const PAGE_TURN_DURATION = 30;

export const DenialOfDeathIntro: React.FC = () => {
	const frame = useCurrentFrame();

	// One continuous slow push-in/pan across the whole 8s so nothing reads
	// as a static slide -- the camera is always drifting.
	const camScale = interpolate(frame, [0, 168], [1, 1.14], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const camX = interpolate(frame, [0, 168], [0, -26], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const camY = interpolate(frame, [0, 168], [0, -46], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: '#0c0a08'}}>
			<Audio src={staticFile('denial-of-death-narration.mp3')} />

			<AbsoluteFill
				style={{
					transform: `scale(${camScale}) translate(${camX}px, ${camY}px)`,
				}}
			>
				<PaperTexture />
				<ClockToArrow />
				<SilhouetteSkull />

				<KineticCaption
					text={'أغلب قراراتك بالحياة\nقد يكون سببها'}
					start={8}
					top={210}
					fontSize={58}
				/>
				<KineticCaption
					text={'شيء انت أصلاً\nما تفكر بيه'}
					start={86}
					top={1000}
					fontSize={56}
				/>
				<KineticCaption text={'وهو الموت'} start={140} top={1560} fontSize={78} circle />
			</AbsoluteFill>

			<BookPageTurn
				start={PAGE_TURN_START}
				duration={PAGE_TURN_DURATION}
				front={<PaperTexture />}
				back={<TitleCard start={PAGE_TURN_START + PAGE_TURN_DURATION / 2} />}
			/>
		</AbsoluteFill>
	);
};
