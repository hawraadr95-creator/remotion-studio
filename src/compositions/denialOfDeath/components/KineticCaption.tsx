import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fontSerif} from '../theme';

type KineticCaptionProps = {
	text: string;
	start: number;
	top: number;
	fontSize?: number;
	color?: string;
	circle?: boolean;
	align?: 'center' | 'right' | 'left';
};

// Arabic phrase revealed by a moving mask-wipe (ink advancing right-to-left,
// matching reading direction) rather than a plain fade/slide.
export const KineticCaption: React.FC<KineticCaptionProps> = ({
	text,
	start,
	top,
	fontSize = 62,
	color = colors.ink,
	circle = false,
	align = 'center',
}) => {
	const frame = useCurrentFrame();
	const local = frame - start;
	if (local < -5) return null;

	const reveal = interpolate(local, [0, 22], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const rise = interpolate(local, [0, 22], [18, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const circleDraw = interpolate(local, [10, 34], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				position: 'absolute',
				top,
				left: 0,
				right: 0,
				display: 'flex',
				justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
				paddingInline: 90,
			}}
		>
			<div style={{position: 'relative', transform: `translateY(${rise}px)`}}>
				<div
					dir="rtl"
					style={{
						fontFamily: fontSerif,
						fontWeight: 700,
						fontSize,
						color,
						textAlign: 'center',
						lineHeight: 1.35,
						WebkitTextStroke: `0.5px ${color}`,
						textShadow: '0 1px 0 rgba(255,255,255,0.35)',
						clipPath: `inset(0 0 0 ${100 - reveal}%)`,
					}}
				>
					{text}
				</div>
				{circle && (
					<svg
						viewBox="0 0 340 130"
						width={340}
						height={130}
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%,-50%)',
							overflow: 'visible',
							pointerEvents: 'none',
						}}
					>
						<path
							d="M 42 78 C 20 40, 70 12, 150 10 C 250 8, 320 30, 300 65 C 285 92, 220 118, 140 116 C 80 115, 30 100, 42 78"
							fill="none"
							stroke={colors.blue}
							strokeWidth={5}
							strokeLinecap="round"
							pathLength={1}
							strokeDasharray={1}
							strokeDashoffset={1 - circleDraw}
							opacity={0.85}
						/>
					</svg>
				)}
			</div>
		</div>
	);
};
