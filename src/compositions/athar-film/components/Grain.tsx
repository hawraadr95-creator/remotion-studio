import React from 'react';
import {layout} from '../theme';

export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.05}) => (
	<svg
		width={layout.width}
		height={layout.height}
		style={{position: 'absolute', inset: 0, opacity, mixBlendMode: 'overlay', pointerEvents: 'none'}}
	>
		<filter id="atharGrain">
			<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={7} stitchTiles="stitch" />
			<feColorMatrix type="saturate" values="0" />
		</filter>
		<rect width={layout.width} height={layout.height} filter="url(#atharGrain)" />
	</svg>
);

export const Vignette: React.FC<{opacity?: number; dark?: boolean}> = ({opacity = 0.4, dark = true}) => (
	<div
		style={{
			position: 'absolute',
			inset: 0,
			pointerEvents: 'none',
			background: dark
				? `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,${opacity}) 100%)`
				: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,${opacity * 0.5}) 100%)`,
		}}
	/>
);
