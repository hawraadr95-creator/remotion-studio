import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';

// Aged-paper base: warm gradient + grain (SVG turbulence) + soft vignette +
// torn/mottled edges. Sits behind every scene so the whole film reads as one
// continuous sheet of old paper rather than flat digital slides.
export const PaperTexture: React.FC = () => {
	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					background: `radial-gradient(120% 90% at 50% 38%, ${colors.paperLight} 0%, ${colors.paper} 55%, ${colors.paperDark} 100%)`,
				}}
			/>
			<svg
				width="100%"
				height="100%"
				style={{position: 'absolute', inset: 0, mixBlendMode: 'multiply', opacity: 0.5}}
			>
				<filter id="grain">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.9"
						numOctaves="2"
						stitchTiles="stitch"
						result="noise"
					/>
					<feColorMatrix
						in="noise"
						type="matrix"
						values="0 0 0 0 0.13
                                0 0 0 0 0.11
                                0 0 0 0 0.08
                                0 0 0 0.5 0"
					/>
				</filter>
				<rect width="100%" height="100%" filter="url(#grain)" />
			</svg>
			<AbsoluteFill
				style={{
					boxShadow: 'inset 0 0 260px 140px rgba(15,13,9,0.55)',
				}}
			/>
			{/* faint foxing marks */}
			<svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.35}}>
				{[
					[140, 260, 90],
					[900, 180, 70],
					[80, 1500, 110],
					[960, 1650, 85],
					[520, 1830, 60],
				].map(([x, y, r], i) => (
					<circle
						key={i}
						cx={x}
						cy={y}
						r={r}
						fill="none"
						stroke={colors.paperDark}
						strokeWidth={2}
						opacity={0.5}
					/>
				))}
			</svg>
		</AbsoluteFill>
	);
};
