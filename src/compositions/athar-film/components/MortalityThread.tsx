import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';

type Key = [frame: number, value: number];

const at = (frame: number, points: Key[]) => {
	const inputRange = points.map((p) => p[0]);
	const outputRange = points.map((p) => p[1]);
	return interpolate(frame, inputRange, outputRange, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

export interface ThreadRect {
	x: number;
	y: number;
	w: number;
	h: number;
	radius: number;
	opacity: number;
	bg: string;
}

// The single connective shape that carries across scenes 1→4:
// vague shadow (paths) -> book (death/book) -> clock disc (clock room) -> ink seed (trail).
export const getThreadRect = (frame: number): ThreadRect => {
	const w = at(frame, [
		[0, 520],
		[130, 600],
		[150, 300],
		[220, 320],
		[236, 560],
		[440, 560],
		[452, 46],
		[470, 30],
	]);
	const h = at(frame, [
		[0, 480],
		[130, 560],
		[150, 420],
		[220, 450],
		[236, 560],
		[440, 560],
		[452, 46],
		[470, 30],
	]);
	const radius = at(frame, [
		[0, 50],
		[135, 50],
		[150, 6],
		[224, 6],
		[236, 50],
		[452, 50],
	]);
	const x = at(frame, [
		[0, 620],
		[140, 540],
		[220, 540],
		[236, 760],
		[452, 250],
	]);
	const y = at(frame, [
		[0, 620],
		[140, 780],
		[220, 780],
		[236, 620],
		[452, 1560],
	]);
	const opacity = at(frame, [
		[0, 0],
		[26, 0.3],
		[130, 0.4],
		[142, 0.62],
		[150, 1],
		[452, 1],
		[470, 0],
	]);
	const bg = frame < 150 ? colors.ink : frame < 232 ? colors.charcoal : frame < 452 ? colors.cream : colors.ink;

	return {x, y, w, h, radius, opacity, bg};
};

export const MortalityThread: React.FC<{frame: number}> = ({frame}) => {
	if (frame > 480) return null;
	const rect = getThreadRect(frame);

	const blur = at(frame, [
		[0, 62],
		[130, 46],
		[150, 6],
		[220, 0],
		[452, 2],
	]);

	return (
		<div
			style={{
				position: 'absolute',
				left: rect.x - rect.w / 2,
				top: rect.y - rect.h / 2,
				width: rect.w,
				height: rect.h,
				borderRadius: `${rect.radius}%`,
				background: rect.bg,
				filter: `blur(${blur}px)`,
				opacity: rect.opacity,
				boxShadow: frame >= 150 && frame < 452 ? '0 30px 70px rgba(0,0,0,0.35)' : undefined,
				border: frame >= 150 && frame < 232 ? '1px solid rgba(238,234,225,0.14)' : undefined,
			}}
		/>
	);
};
