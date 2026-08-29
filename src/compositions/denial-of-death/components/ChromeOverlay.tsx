import React from 'react';
import {bodyFont} from '../fonts';
import {colors, layout} from '../theme';

interface ChromeOverlayProps {
	progress: number;
	sceneIndex: number;
	sceneCount: number;
	dark?: boolean;
}

const BARCODE_WIDTHS = [3, 1, 2, 4, 1, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 1, 4, 1, 2, 3];

export const ChromeOverlay: React.FC<ChromeOverlayProps> = ({progress, sceneIndex, sceneCount, dark}) => {
	const fg = dark ? colors.cream : colors.ink;
	const trackColor = dark ? 'rgba(239,231,214,0.16)' : 'rgba(21,19,15,0.14)';

	const cornerSize = 34;
	const cornerStroke = 2;
	const inset = 44;

	const corner = (top: boolean, left: boolean) => (
		<svg
			width={cornerSize}
			height={cornerSize}
			style={{
				position: 'absolute',
				top: top ? inset : undefined,
				bottom: top ? undefined : inset,
				left: left ? inset : undefined,
				right: left ? undefined : inset,
				opacity: 0.55,
			}}
		>
			<path
				d={
					top && left
						? `M0,${cornerSize} L0,0 L${cornerSize},0`
						: top && !left
							? `M0,0 L${cornerSize},0 L${cornerSize},${cornerSize}`
							: !top && left
								? `M0,0 L0,${cornerSize} L${cornerSize},${cornerSize}`
								: `M${cornerSize},0 L${cornerSize},${cornerSize} L0,${cornerSize}`
				}
				fill="none"
				stroke={fg}
				strokeWidth={cornerStroke}
			/>
		</svg>
	);

	return (
		<div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
			<div style={{position: 'absolute', top: 0, left: 0, width: layout.width, height: 3, background: trackColor}}>
				<div style={{width: `${progress * 100}%`, height: '100%', background: fg, opacity: 0.7}} />
			</div>

			{corner(true, true)}
			{corner(true, false)}
			{corner(false, true)}
			{corner(false, false)}

			<div
				style={{
					position: 'absolute',
					left: inset + 6,
					bottom: inset + 6,
					display: 'flex',
					flexDirection: 'column',
					gap: 4,
					fontFamily: bodyFont,
					color: fg,
					opacity: 0.6,
				}}
			>
				<span style={{fontSize: 15, letterSpacing: 3, fontWeight: 600}}>DENIAL OF DEATH</span>
				<span style={{fontSize: 13, letterSpacing: 2, fontWeight: 500, direction: 'ltr'}}>
					{String(sceneIndex + 1).padStart(2, '0')} / {String(sceneCount).padStart(2, '0')}
				</span>
			</div>

			<svg
				width={72}
				height={30}
				style={{position: 'absolute', right: inset + 6, bottom: inset + 6, opacity: 0.6}}
			>
				{BARCODE_WIDTHS.map((w, i) => {
					const x = BARCODE_WIDTHS.slice(0, i).reduce((a, b) => a + b + 2, 0);
					return <rect key={i} x={x} y={0} width={w} height={30} fill={fg} />;
				})}
			</svg>
		</div>
	);
};
