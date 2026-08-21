import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Cairo';
import {Scene1Reveal} from './scenes/Scene1Reveal';
import {Scene2Focus} from './scenes/Scene2Focus';
import {Scene3MultiPurpose} from './scenes/Scene3MultiPurpose';
import {Scene4PackInfo} from './scenes/Scene4PackInfo';
import {Scene5BrandMoment} from './scenes/Scene5BrandMoment';
import {Scene6FinalHero} from './scenes/Scene6FinalHero';
import {SceneTransition} from './components/SceneTransition';

loadFont('normal', {
	weights: ['600', '700', '800', '900'],
	subsets: ['arabic', 'latin'],
});

// Scene boundaries (30fps, 900 frames / 30s total).
const SCENES = [
	{Component: Scene1Reveal, from: 0, duration: 120},
	{Component: Scene2Focus, from: 120, duration: 150},
	{Component: Scene3MultiPurpose, from: 270, duration: 180},
	{Component: Scene4PackInfo, from: 450, duration: 150},
	{Component: Scene5BrandMoment, from: 600, duration: 150},
	{Component: Scene6FinalHero, from: 750, duration: 150},
];

const CUT_FRAMES = [120, 270, 450, 600, 750];

export const AlWazirPowderAd: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#ffffff'}}>
			{SCENES.map(({Component, from, duration}, i) => (
				<Sequence key={i} from={from} durationInFrames={duration}>
					<Component />
				</Sequence>
			))}

			{CUT_FRAMES.map((cut) => (
				<SceneTransition key={cut} startFrame={cut - 9} durationInFrames={18} />
			))}
		</AbsoluteFill>
	);
};
