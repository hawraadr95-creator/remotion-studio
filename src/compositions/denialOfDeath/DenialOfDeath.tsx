import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {loadFont as loadAmiri} from '@remotion/google-fonts/Amiri';
import {loadFont as loadArefRuqaaInk} from '@remotion/google-fonts/ArefRuqaaInk';
import {loadFont as loadTajawal} from '@remotion/google-fonts/Tajawal';
import {SCENE_BOUNDS, rel, TOTAL_SECONDS, frame} from './scenes';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2DeathReveal} from './scenes/Scene2DeathReveal';
import {Scene3Knows} from './scenes/Scene3Knows';
import {Scene4CantLive} from './scenes/Scene4CantLive';
import {Scene5InventedTrace} from './scenes/Scene5InventedTrace';
import {Scene6WantList} from './scenes/Scene6WantList';
import {Scene7RemainHere} from './scenes/Scene7RemainHere';
import {Scene8SymbolicImmortality} from './scenes/Scene8SymbolicImmortality';
import {Scene9Paradox} from './scenes/Scene9Paradox';

loadAmiri('normal', {weights: ['400', '700'], subsets: ['arabic']});
loadArefRuqaaInk('normal', {weights: ['400', '700'], subsets: ['arabic']});
loadTajawal('normal', {weights: ['500', '700', '800', '900'], subsets: ['arabic']});

const scenes = [
	{Component: Scene1Hook, bounds: SCENE_BOUNDS.hook},
	{Component: Scene2DeathReveal, bounds: SCENE_BOUNDS.deathReveal},
	{Component: Scene3Knows, bounds: SCENE_BOUNDS.knows},
	{Component: Scene4CantLive, bounds: SCENE_BOUNDS.cantLive},
	{Component: Scene5InventedTrace, bounds: SCENE_BOUNDS.inventedTrace},
	{Component: Scene6WantList, bounds: SCENE_BOUNDS.wantList},
	{Component: Scene7RemainHere, bounds: SCENE_BOUNDS.remainHere},
	{Component: Scene8SymbolicImmortality, bounds: SCENE_BOUNDS.symbolicImmortality},
	{Component: Scene9Paradox, bounds: SCENE_BOUNDS.paradox},
];

export const DenialOfDeath: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000', direction: 'rtl'}}>
			<Audio src={staticFile('audio/voiceover-enhanced.wav')} />

			{scenes.map(({Component, bounds}, i) => {
				const from = frame(bounds.from);
				const durationInFrames =
					i === scenes.length - 1 ? rel(bounds.from, TOTAL_SECONDS) : rel(bounds.from, bounds.to);
				return (
					<Sequence key={i} from={from} durationInFrames={durationInFrames}>
						<Component />
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
