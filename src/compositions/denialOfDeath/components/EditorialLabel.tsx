import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../theme';
import {paperShadow} from './PaperShadow';

// A stamped / printed editorial label — a bordered tag that snaps in like a
// rubber stamp, used for short emphasis words (تنجح، تشتهر، أثر...).
export const EditorialLabel: React.FC<{
	text: string;
	delay?: number;
	fontSize?: number;
	rotate?: number;
	tone?: 'ink' | 'stamp';
	style?: React.CSSProperties;
}> = ({text, delay = 0, fontSize = 40, rotate = -3, tone = 'ink', style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = Math.max(0, frame - delay);
	const s = spring({frame: local, fps, config: {damping: 9, mass: 0.5, stiffness: 220}, durationInFrames: 14});
	const scale = interpolate(s, [0, 1], [1.6, 1]);
	const opacity = interpolate(s, [0, 1], [0, 1]);

	const color = tone === 'stamp' ? colors.stampRed : colors.inkSoft;

	return (
		<div
			style={{
				display: 'inline-block',
				fontFamily: fonts.label,
				fontWeight: 800,
				fontSize,
				color,
				border: `3px solid ${color}`,
				padding: '10px 28px',
				borderRadius: 6,
				background: 'rgba(244,236,216,0.08)',
				direction: 'rtl',
				transform: `scale(${scale}) rotate(${rotate}deg)`,
				opacity,
				filter: paperShadow(1),
				letterSpacing: 1,
				...style,
			}}
		>
			{text}
		</div>
	);
};
