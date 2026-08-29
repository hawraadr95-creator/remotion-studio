import {Easing, interpolate, spring} from 'remotion';

export const pushIn = (frame: number, fps: number, from = 1.06, to = 1) => {
	const progress = spring({frame, fps, config: {damping: 20, mass: 1, stiffness: 60}, durationInFrames: 46});
	return interpolate(progress, [0, 1], [from, to]);
};

export const exitProgress = (frame: number, durationInFrames: number, span = 18) =>
	interpolate(frame, [durationInFrames - span, durationInFrames - 2], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});

export const enterProgress = (frame: number, span = 20) =>
	interpolate(frame, [0, span], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
