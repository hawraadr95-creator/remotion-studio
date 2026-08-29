import {Easing, interpolate} from 'remotion';

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const smoothWindow = (frame: number, from: number, to: number, span = 16) =>
	interpolate(frame, [from, from + span, to - span, to], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});

export const easeIn = (frame: number, from: number, span = 20) =>
	interpolate(frame, [from, from + span], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

export const easeOut = (frame: number, to: number, span = 20) =>
	interpolate(frame, [to - span, to], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});
