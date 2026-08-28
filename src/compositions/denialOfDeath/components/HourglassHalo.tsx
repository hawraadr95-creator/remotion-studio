import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

type Props = {start?: number; drainSpeed?: number; icons?: boolean};

// An hourglass with falling sand, orbited by tiny ghosts of the "desire"
// icons converging into a halo -- the attempt at symbolic immortality.
export const HourglassHalo: React.FC<Props> = ({start = 0, drainSpeed = 1, icons = false}) => {
	const frame = useCurrentFrame();
	const local = Math.max(frame - start, 0);

	const sandT = interpolate((local * drainSpeed) % 130, [0, 130], [0, 1]);
	const topH = 66 * (1 - sandT);
	const botH = 66 * sandT;
	const converge = interpolate(local, [0, 90], [1, 0.35], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const iconsOpacity = interpolate(local, [0, 30, 90, 130], [0, 1, 1, 0.5], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
			<g transform="translate(540,900)">
				{icons &&
					new Array(5).fill(0).map((_, i) => {
						const a = (i / 5) * Math.PI * 2 + local / 60;
						const r = 230 * converge;
						return (
							<circle
								key={i}
								cx={Math.cos(a) * r}
								cy={Math.sin(a) * r}
								r={10}
								fill={colors.gold}
								opacity={iconsOpacity * 0.8}
							/>
						);
					})}

				<circle r={280} fill="none" stroke={colors.gold} strokeWidth={1.5} opacity={0.35 * (1 - converge)} />

				<g transform="scale(1.9)">
					<path d="M -60 -90 L 60 -90 L 8 0 L 60 90 L -60 90 L -8 0 Z" fill="none" stroke={colors.ink} strokeWidth={4} strokeLinejoin="round" />
					<clipPath id="hgTop">
						<path d="M -50 -80 L 50 -80 L 4 -6 L -4 -6 Z" />
					</clipPath>
					<clipPath id="hgBot">
						<path d="M -50 80 L 50 80 L 4 6 L -4 6 Z" />
					</clipPath>
					<rect x={-50} y={-6 - topH} width={100} height={topH} fill={colors.inkSoft} clipPath="url(#hgTop)" />
					<rect x={-50} y={6} width={100} height={botH} fill={colors.inkSoft} clipPath="url(#hgBot)" />
					<line x1={0} y1={-4} x2={0} y2={4} stroke={colors.gold} strokeWidth={2} opacity={sandT > 0.05 && sandT < 0.95 ? 1 : 0} />
				</g>
			</g>
		</svg>
	);
};
