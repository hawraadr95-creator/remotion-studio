import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

type BookPageTurnProps = {
	start: number;
	duration: number;
	front: React.ReactNode;
	back: React.ReactNode;
};

// A page turning over: the current sheet folds shut (scaleX toward its
// spine) with a moving shade to sell the fold, then the next sheet unfolds
// open from the same spine to reveal the title card. Avoids relying on
// fragile cross-renderer 3D backface compositing while still reading as a
// single continuous page-turn rather than a hard cut.
export const BookPageTurn: React.FC<BookPageTurnProps> = ({start, duration, front, back}) => {
	const frame = useCurrentFrame();
	const local = frame - start;
	const t = interpolate(local, [0, duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	if (t <= 0) return null;

	const closing = t < 0.5;
	const half = closing ? t / 0.5 : (t - 0.5) / 0.5;
	const scaleX = closing ? 1 - half : half;
	const shade = Math.sin(Math.min(half, 1) * Math.PI) * 0.55;

	return (
		<AbsoluteFill style={{perspective: 2000}}>
			<AbsoluteFill
				style={{
					transformOrigin: '0% 50%',
					transform: `scaleX(${Math.max(scaleX, 0.002)}) skewY(${closing ? half * 1.4 : (1 - half) * -1.4}deg)`,
				}}
			>
				{closing ? front : back}
				<AbsoluteFill
					style={{
						background: `linear-gradient(90deg, rgba(0,0,0,${shade}) 0%, rgba(0,0,0,0) 55%)`,
					}}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
