import React from 'react';
import {Easing, interpolate} from 'remotion';
import type {ScriptLine} from '../script';
import {displayFont} from '../fonts';
import {colors} from '../theme';

interface KineticTextProps {
	frame: number;
	lines: ScriptLine[];
	size?: number;
	color?: string;
	accentColor?: string;
	mutedColor?: string;
	align?: 'center' | 'flex-start' | 'flex-end';
	maxWidth?: number;
}

const stripPunctuation = (word: string) => word.replace(/[.,،؟!]/g, '');

export const KineticText: React.FC<KineticTextProps> = ({
	frame,
	lines,
	size = 64,
	color = colors.ink,
	accentColor = colors.rust,
	mutedColor,
	align = 'center',
	maxWidth = 860,
}) => {
	let activeIndex = -1;
	for (let i = 0; i < lines.length; i++) {
		if (frame >= lines[i].start) activeIndex = i;
	}

	if (activeIndex === -1) return null;

	const active = lines[activeIndex];
	const previous = activeIndex > 0 ? lines[activeIndex - 1] : null;
	const sinceActiveStart = frame - active.start;

	const demoteProgress = interpolate(sinceActiveStart, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	const muted = mutedColor ?? color;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: align,
				gap: 18,
				maxWidth,
			}}
		>
			{previous ? (
				<div
					dir="rtl"
					style={{
						fontFamily: displayFont,
						fontWeight: 700,
						fontSize: size * 0.34,
						lineHeight: 1.3,
						color: muted,
						opacity: interpolate(demoteProgress, [0, 1], [1, 0.4]),
						transform: `translateY(${interpolate(demoteProgress, [0, 1], [0, -6])}px) scale(${interpolate(demoteProgress, [0, 1], [1, 0.98])})`,
						textAlign: align === 'center' ? 'center' : align === 'flex-start' ? 'right' : 'left',
					}}
				>
					{previous.text}
				</div>
			) : null}

			<div
				dir="rtl"
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row',
					justifyContent: align,
					gap: `${size * 0.06}px ${size * 0.22}px`,
				}}
			>
				{active.text.split(' ').map((word, index) => {
					const wordStart = sinceActiveStart - index * 2;
					const reveal = interpolate(wordStart, [0, 14], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
						easing: Easing.out(Easing.back(1.6)),
					});
					const isHighlighted = active.highlight?.includes(stripPunctuation(word));

					return (
						<span
							key={`${activeIndex}-${index}`}
							style={{
								fontFamily: displayFont,
								fontWeight: isHighlighted ? 900 : 800,
								fontSize: size,
								lineHeight: 1.12,
								color: isHighlighted ? accentColor : color,
								opacity: reveal,
								display: 'inline-block',
								transform: `translateY(${interpolate(reveal, [0, 1], [size * 0.5, 0])}px) scale(${interpolate(reveal, [0, 1], [0.75, 1])})`,
								whiteSpace: 'nowrap',
							}}
						>
							{word}
						</span>
					);
				})}
			</div>
		</div>
	);
};
