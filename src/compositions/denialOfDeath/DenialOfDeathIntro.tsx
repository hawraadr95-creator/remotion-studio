import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Amiri';
import {SceneIntro} from './scenes/SceneIntro';

loadFont('normal', {weights: ['400', '700'], subsets: ['arabic']});

// Standalone preview of the first 8 seconds only (kept for isolated review).
export const DenialOfDeathIntro: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#0c0a08'}}>
			<Audio src={staticFile('denial-of-death-narration.mp3')} />
			<SceneIntro />
		</AbsoluteFill>
	);
};
