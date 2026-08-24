import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

// The editorial-notebook backdrop: aged paper color, a faint grid (like the
// scrapbook reference), soft vignette, and a very slow drift so background
// never feels static.
export const PaperTexture: React.FC<{tone?: 'teal' | 'cream'}> = ({tone = 'teal'}) => {
	const frame = useCurrentFrame();
	const drift = interpolate(frame, [0, 1400], [0, 14]);

	const base = tone === 'teal' ? colors.tealDark : colors.paper;
	const gridColor = tone === 'teal' ? 'rgba(233,227,213,0.07)' : 'rgba(34,32,28,0.06)';

	return (
		<AbsoluteFill style={{backgroundColor: base}}>
			<AbsoluteFill
				style={{
					backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
					backgroundSize: '64px 64px',
					transform: `translate(${-drift}px, ${-drift * 0.6}px)`,
				}}
			/>
			<AbsoluteFill
				style={{
					background:
						tone === 'teal'
							? 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.38) 100%)'
							: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.18) 100%)',
				}}
			/>
		</AbsoluteFill>
	);
};
