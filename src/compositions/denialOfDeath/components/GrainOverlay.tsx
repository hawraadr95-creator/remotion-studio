import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

// Subtle animated film-grain / paper-noise layer so even static scenes feel
// alive. Uses an SVG turbulence filter re-seeded every few frames instead of
// per-frame (keeps it subtle rather than distracting static).
export const GrainOverlay: React.FC<{opacity?: number}> = ({opacity = 0.06}) => {
	const frame = useCurrentFrame();
	const seed = Math.floor(frame / 3) % 40;

	return (
		<AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'multiply', opacity}}>
			<svg width="100%" height="100%">
				<filter id={`grain-${seed}`}>
					<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} stitchTiles="stitch" />
					<feColorMatrix type="matrix" values="0 0 0 0 0.13  0 0 0 0 0.12  0 0 0 0 0.1  0 0 0 0.9 0" />
				</filter>
				<rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
			</svg>
		</AbsoluteFill>
	);
};
