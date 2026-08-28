import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Amiri';
import {SceneIntro} from './scenes/SceneIntro';
import {SceneHuman} from './scenes/SceneHuman';
import {SceneLegacy} from './scenes/SceneLegacy';
import {SceneDesires} from './scenes/SceneDesires';
import {SceneGravestone} from './scenes/SceneGravestone';
import {SceneImmortality} from './scenes/SceneImmortality';
import {SceneParadox} from './scenes/SceneParadox';

loadFont('normal', {weights: ['400', '700'], subsets: ['arabic']});

// Full narration timeline (fps 30). Boundaries follow the narration's own
// sentence breaks so each scene starts and ends on a natural beat.
const SCENES = [
	{Component: SceneIntro, from: 0, duration: 240},
	{Component: SceneHuman, from: 240, duration: 210},
	{Component: SceneLegacy, from: 450, duration: 140},
	{Component: SceneDesires, from: 590, duration: 268},
	{Component: SceneGravestone, from: 858, duration: 102},
	{Component: SceneImmortality, from: 960, duration: 129},
	{Component: SceneParadox, from: 1089, duration: 291},
];

export const DenialOfDeathFull: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#0c0a08'}}>
			<Audio src={staticFile('denial-of-death-narration.mp3')} />
			{SCENES.map(({Component, from, duration}, i) => (
				<Sequence key={i} from={from} durationInFrames={duration}>
					<Component />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
