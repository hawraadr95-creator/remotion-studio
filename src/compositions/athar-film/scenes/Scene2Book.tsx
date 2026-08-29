import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../theme';
import {bodyFont, displayFont} from '../fonts';
import {getThreadRect} from '../components/MortalityThread';
import {easeIn} from '../components/utils';

export const Scene2Book: React.FC<{frame: number}> = ({frame}) => {
	const rect = getThreadRect(frame);

	const darkPulse = interpolate(frame, [138, 148, 165], [0, 0.5, 0.2], {extrapolateRight: 'clamp'});
	const pageOpen = interpolate(frame, [188, 206], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const authorReveal = easeIn(frame, 200, 18);
	const titleReveal = easeIn(frame, 216, 20);

	const pageW = rect.w * 0.82;
	const pageH = rect.h * 0.72;

	return (
		<div style={{position: 'absolute', inset: 0}}>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `radial-gradient(circle at 50% 42%, rgba(168,42,30,${darkPulse}) 0%, rgba(0,0,0,0) 55%)`,
				}}
			/>

			{frame >= 186 ? (
				<div
					style={{
						position: 'absolute',
						left: rect.x - pageW / 2,
						top: rect.y - pageH / 2 + 6,
						width: pageW,
						height: pageH,
						background: colors.paper,
						borderRadius: 4,
						transform: `scaleX(${pageOpen})`,
						transformOrigin: 'left center',
						boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
					}}
				/>
			) : null}

			<div
				style={{
					position: 'absolute',
					left: rect.x,
					top: rect.y,
					transform: 'translate(-50%, -50%)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 14,
					width: pageW - 40,
				}}
			>
				<div
					style={{
						opacity: authorReveal,
						transform: `translateY(${interpolate(authorReveal, [0, 1], [14, 0])}px)`,
						fontFamily: bodyFont,
						fontSize: 30,
						letterSpacing: 1,
						color: colors.graphite,
						fontWeight: 500,
					}}
				>
					أرنست بيكر
				</div>
				<div
					style={{
						width: interpolate(authorReveal, [0, 1], [0, 80]),
						height: 1.5,
						background: colors.accent,
					}}
				/>
				<div
					dir="rtl"
					style={{
						opacity: titleReveal,
						transform: `translateY(${interpolate(titleReveal, [0, 1], [14, 0])}px)`,
						fontFamily: displayFont,
						fontSize: 56,
						fontWeight: 800,
						color: colors.ink,
						textAlign: 'center',
					}}
				>
					إنكار <span style={{color: colors.accent}}>الموت</span>
				</div>
			</div>
		</div>
	);
};
