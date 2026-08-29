import React from 'react';
import {Easing, interpolate} from 'remotion';
import {displayFont} from '../fonts';
import {colors} from '../theme';
import type {KeywordEvent} from '../script';

interface KeywordLayerProps {
	frame: number;
	events: KeywordEvent[];
	color?: string;
	accent?: string;
	size?: number;
	y?: number | string;
}

const FADE_SPAN = 16;

export const KeywordLayer: React.FC<KeywordLayerProps> = ({
	frame,
	events,
	color = colors.ink,
	accent = colors.accent,
	size = 108,
	y = '50%',
}) => {
	const active = events.filter((e) => frame >= e.from && frame < e.to);
	if (active.length === 0) return null;

	return (
		<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
			{active.map((event) => {
				const enter = interpolate(frame, [event.from, event.from + FADE_SPAN], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
					easing: Easing.out(Easing.back(1.4)),
				});
				const exit = interpolate(frame, [event.to - FADE_SPAN, event.to], [1, 0], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
					easing: Easing.in(Easing.cubic),
				});
				const progress = Math.min(enter, exit);
				const isAccentWord = event.word.includes('الموت') || event.word.includes('تعيش');

				return (
					<div
						key={event.word + event.from}
						dir="rtl"
						style={{
							position: 'absolute',
							top: event.y ?? y,
							transform: `translateY(-50%) scale(${interpolate(progress, [0, 1], [0.82, 1])})`,
							opacity: progress,
							fontFamily: displayFont,
							fontWeight: 800,
							fontSize: event.size ?? size,
							letterSpacing: event.word.length > 4 ? 2 : 0,
							color: isAccentWord ? accent : color,
							textAlign: 'center',
							whiteSpace: 'nowrap',
						}}
					>
						{event.word}
					</div>
				);
			})}
		</div>
	);
};
