import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {PaperTexture} from '../components/PaperTexture';
import {ClockToArrow} from '../components/ClockToArrow';
import {SilhouetteSkull} from '../components/SilhouetteSkull';
import {KineticCaption} from '../components/KineticCaption';
import {BookPageTurn} from '../components/BookPageTurn';
import {TitleCard} from '../components/TitleCard';

const PAGE_TURN_START = 168;
const PAGE_TURN_DURATION = 30;

// Segments 1-5 (0:00.27-0:07.77): the clock/ink-arrow/silhouette-skull
// sequence, closing on a vintage title card for the book and author.
export const SceneIntro: React.FC = () => {
	const frame = useCurrentFrame();

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
			<AbsoluteFill style={{transform: `scale(${camScale}) translate(${camX}px, ${camY}px)`}}>
				<PaperTexture />
				<ClockToArrow />
				<SilhouetteSkull />

				<KineticCaption text={'أغلب قراراتك بالحياة\nقد يكون سببها'} start={8} top={210} fontSize={58} />
				<KineticCaption text={'شيء انت أصلاً\nما تفكر بيه'} start={86} top={1000} fontSize={56} />
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
