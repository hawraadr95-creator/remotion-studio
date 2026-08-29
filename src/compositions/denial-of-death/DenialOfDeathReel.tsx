import React from 'react';
import {AbsoluteFill, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';
import {scenes, TOTAL_DURATION} from './script';
import {ChromeOverlay} from './components/ChromeOverlay';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2DeathBook} from './scenes/Scene2DeathBook';
import {Scene3Awareness} from './scenes/Scene3Awareness';
import {Scene4Invention} from './scenes/Scene4Invention';
import {Scene5Chase} from './scenes/Scene5Chase';
import {Scene6Legacy} from './scenes/Scene6Legacy';
import {Scene7Immortality} from './scenes/Scene7Immortality';
import {Scene8Paradox} from './scenes/Scene8Paradox';
import {Scene9Live} from './scenes/Scene9Live';

const sceneComponents: Record<string, React.FC> = {
	hook: Scene1Hook,
	deathBook: Scene2DeathBook,
	awareness: Scene3Awareness,
	invention: Scene4Invention,
	chase: Scene5Chase,
	legacy: Scene6Legacy,
	immortality: Scene7Immortality,
	paradox: Scene8Paradox,
	live: Scene9Live,
};

const darkScenes = new Set(['deathBook', 'legacy', 'paradox']);

export const DenialOfDeathReel: React.FC = () => {
	const frame = useCurrentFrame();

	let currentSceneIndex = 0;
	for (let i = 0; i < scenes.length; i++) {
		if (frame >= scenes[i].from) currentSceneIndex = i;
	}
	const currentScene = scenes[currentSceneIndex];
	const progress = Math.min(frame / (TOTAL_DURATION - 1), 1);

	return (
		<AbsoluteFill style={{backgroundColor: '#0A0A0B'}}>
			{scenes.map((scene) => {
				const SceneComponent = sceneComponents[scene.id];
				return (
					<Sequence key={scene.id} name={scene.id} from={scene.from} durationInFrames={scene.durationInFrames}>
						<SceneComponent />
					</Sequence>
				);
			})}

			<Audio src={staticFile('audio/denial-of-death-narration.mp3')} />

			<ChromeOverlay
				progress={progress}
				sceneIndex={currentSceneIndex}
				sceneCount={scenes.length}
				dark={darkScenes.has(currentScene.id)}
			/>
		</AbsoluteFill>
	);
};
