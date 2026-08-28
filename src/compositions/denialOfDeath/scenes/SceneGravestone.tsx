import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {PaperTexture} from '../components/PaperTexture';
import {Gravestone} from '../components/Gravestone';
import {KineticCaption} from '../components/KineticCaption';
import {BookPageTurn} from '../components/BookPageTurn';
import {colors, fontSerif} from '../theme';

const PAGE_TURN_START = 44;
const PAGE_TURN_DURATION = 26;

const BeckerNote: React.FC<{start: number}> = ({start}) => {
	const frame = useCurrentFrame();
	const local = frame - start;
	const reveal = interpolate(local, [0, 30], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', backgroundColor: colors.paper}}>
			<div
				dir="rtl"
				style={{
					fontFamily: fontSerif,
					fontWeight: 700,
					fontSize: 62,
					color: colors.ink,
					textAlign: 'center',
					maxWidth: 820,
					lineHeight: 1.5,
					clipPath: `inset(0 0 0 ${100 - reveal}%)`,
				}}
			>
				الكثير مما نطارده
			</div>
		</AbsoluteFill>
	);
};

// Segments 21-24 (0:26.5-0:32.0): the monument carved -- "you were here" --
// then the page turns to Becker's own observation about what we're chasing.
export const SceneGravestone: React.FC = () => {
	const frame = useCurrentFrame();
	const camScale = interpolate(frame, [0, 44], [1.15, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{transform: `scale(${camScale})`}}>
				<PaperTexture />
				<Gravestone start={0} text={'أنّك كنت هنا'} />
				<KineticCaption text={'هنا بيكر يشوف'} start={0} top={260} fontSize={62} />
			</AbsoluteFill>

			<BookPageTurn
				start={PAGE_TURN_START}
				duration={PAGE_TURN_DURATION}
				front={<PaperTexture />}
				back={<BeckerNote start={PAGE_TURN_START + PAGE_TURN_DURATION / 2} />}
			/>
		</AbsoluteFill>
	);
};
