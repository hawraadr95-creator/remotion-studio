import {interpolate} from 'remotion';
import type {FigurePose} from './components/HumanFigure';

type Key = [frame: number, value: number];

const at = (frame: number, points: Key[]) => {
	const inputRange = points.map((p) => p[0]);
	const outputRange = points.map((p) => p[1]);
	return interpolate(frame, inputRange, outputRange, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

export interface FigureState {
	x: number;
	y: number;
	scale: number;
	opacity: number;
	pose: FigurePose;
}

export const getFigureState = (frame: number): FigureState => {
	const x = at(frame, [
		[0, 540],
		[138, 540],
		[160, 300],
		[243, 340],
		[452, 230],
		[596, 830],
		[635, 540],
		[734, 540],
		[820, 1300],
		[858, 540],
		[1089, 540],
		[1280, 540],
	]);

	const y = at(frame, [
		[0, 1620],
		[160, 1650],
		[452, 1750],
		[596, 1780],
		[635, 1520],
		[660, 1460],
		[734, 1450],
		[858, 1560],
		[1000, 1500],
		[1089, 1520],
		[1280, 1620],
		[1340, 1500],
		[1450, 1480],
	]);

	const scale = at(frame, [
		[0, 1.05],
		[160, 0.55],
		[243, 0.62],
		[452, 0.8],
		[596, 0.85],
		[734, 0.85],
		[858, 0.9],
		[1000, 0.5],
		[1089, 0.5],
		[1280, 0.28],
		[1340, 0.82],
		[1450, 0.88],
	]);

	const opacity = at(frame, [
		[0, 1],
		[142, 1],
		[158, 0.2],
		[243, 0.7],
		[452, 1],
		[820, 1],
		[840, 0],
		[858, 1],
		[1450, 1],
	]);

	const walkSpeed = at(frame, [
		[0, 0],
		[243, 0.012],
		[452, 0.05],
		[596, 0.045],
		[734, 0.05],
		[820, 0.05],
		[858, 0.075],
		[1000, 0.075],
		[1089, 0.01],
		[1280, 0],
	]);
	const walkPhase = (frame * walkSpeed) % 1;

	const swingAmount = at(frame, [
		[0, 0],
		[243, 0.2],
		[452, 1],
		[596, 0.7],
		[660, 0.15],
		[734, 0.9],
		[820, 0.9],
		[858, 1],
		[1000, 0.3],
		[1089, 0],
		[1280, 0],
	]);

	const armsRaise = at(frame, [
		[0, 0.12],
		[640, 0.15],
		[655, 0.85],
		[688, 0.15],
		[1089, 0.1],
		[1150, 0.35],
		[1220, 0.1],
		[1280, 0],
	]);

	const lean = at(frame, [
		[0, 0],
		[858, 0],
		[900, 14],
		[1089, 10],
		[1280, 0],
	]);

	const idleSway = Math.sin(frame / 18) * (frame < 452 ? 1.4 : 0.6);

	const pose: FigurePose = {walkPhase, swingAmount, armsRaise, lean, idleSway};

	return {x, y, scale, opacity, pose};
};
