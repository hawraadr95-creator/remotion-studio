import React from 'react';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';
import {colors} from './theme';
import {keywords, TOTAL_DURATION} from './script';
import {getFigureState} from './figureState';
import {HumanFigure} from './components/HumanFigure';
import {MortalityThread} from './components/MortalityThread';
import {KeywordLayer} from './components/KeywordLayer';
import {Grain, Vignette} from './components/Grain';
import {Scene1Paths} from './scenes/Scene1Paths';
import {Scene2Book} from './scenes/Scene2Book';
import {Scene3ClockRoom} from './scenes/Scene3ClockRoom';
import {Scene4Trail} from './scenes/Scene4Trail';
import {Scene5Montage} from './scenes/Scene5Montage';
import {Scene6Traces} from './scenes/Scene6Traces';
import {Scene7Monument} from './scenes/Scene7Monument';
import {Scene8Obsession} from './scenes/Scene8Obsession';
import {Scene9Payoff} from './scenes/Scene9Payoff';

const at = (frame: number, points: [number, number][]) =>
	interpolate(
		frame,
		points.map((p) => p[0]),
		points.map((p) => p[1]),
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

const bgMix = (frame: number) => at(frame, [[0, 0], [132, 0], [150, 1], [235, 1], [250, 0], [1150, 0], [1280, 0.15]]);

const layerWindow = (frame: number, from: number, to: number, fade = 16) =>
	interpolate(frame, [from, from + fade, to - fade, to], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

export const AtharFilm: React.FC = () => {
	const frame = useCurrentFrame();
	const figure = getFigureState(frame);
	const dark = bgMix(frame);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(180deg, ${colors.paper} 0%, ${colors.paper} 100%)`,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: colors.ink,
					opacity: dark,
				}}
			/>

			<div style={{position: 'absolute', inset: 0, opacity: layerWindow(frame, 0, 140)}}>
				<Scene1Paths frame={frame} />
			</div>
			<div style={{position: 'absolute', inset: 0, opacity: layerWindow(frame, 138, 243)}}>
				<Scene2Book frame={frame} />
			</div>
			<div style={{position: 'absolute', inset: 0, opacity: layerWindow(frame, 236, 452)}}>
				<Scene3ClockRoom frame={frame} />
			</div>
			<div style={{position: 'absolute', inset: 0, opacity: layerWindow(frame, 450, 596)}}>
				<Scene4Trail frame={frame} />
			</div>
			<div style={{position: 'absolute', inset: 0, opacity: layerWindow(frame, 594, 734)}}>
				<Scene5Montage frame={frame} />
			</div>
			<div style={{position: 'absolute', inset: 0, opacity: layerWindow(frame, 732, 858)}}>
				<Scene6Traces frame={frame} />
			</div>
			<div style={{position: 'absolute', inset: 0, opacity: layerWindow(frame, 856, 1089)}}>
				<Scene7Monument frame={frame} />
			</div>
			<div style={{position: 'absolute', inset: 0, opacity: layerWindow(frame, 1087, 1280)}}>
				<Scene8Obsession frame={frame} />
			</div>
			<div style={{position: 'absolute', inset: 0, opacity: layerWindow(frame, 1278, TOTAL_DURATION, 8)}}>
				<Scene9Payoff frame={frame} />
			</div>

			<MortalityThread frame={frame} />

			<div
				style={{
					position: 'absolute',
					left: figure.x,
					top: figure.y,
					transform: 'translate(-50%, -100%)',
					opacity: figure.opacity,
				}}
			>
				<HumanFigure size={210 * figure.scale} pose={figure.pose} />
			</div>

			<KeywordLayer frame={frame} events={keywords} />

			<Vignette opacity={0.32} />
			<Grain opacity={0.045} />

			<Audio src={staticFile('audio/denial-of-death-narration.mp3')} />
		</AbsoluteFill>
	);
};
