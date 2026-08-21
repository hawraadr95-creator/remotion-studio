import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fontFamily} from '../theme';

type ProductHeroProps = {
	width?: number;
	float?: boolean;
	floatAmplitude?: number;
	sweepHighlight?: boolean;
	sweepStart?: number;
};

// A faithful CSS/SVG recreation of the Al-Wazir "المطور" detergent bag —
// green gradient pouch, white crimped top with hang holes, red logotype,
// and the multi-purpose ribbon — built as a live asset since the source
// packaging photo could not be isolated from its studio background.
export const ProductHero: React.FC<ProductHeroProps> = ({
	width = 420,
	float = true,
	floatAmplitude = 10,
	sweepHighlight = false,
	sweepStart = 0,
}) => {
	const frame = useCurrentFrame();

	const floatY = float
		? Math.sin(frame / 22) * floatAmplitude
		: 0;

	const sweepX = sweepHighlight
		? interpolate(frame - sweepStart, [0, 55], [-40, 140], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
			})
		: -999;

	const scaleFactor = width / 420;

	return (
		<div
			style={{
				position: 'relative',
				width,
				transform: `translateY(${floatY}px)`,
			}}
		>
			{/* soft contact shadow */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					bottom: -34 * scaleFactor,
					width: width * 0.82,
					height: 34 * scaleFactor,
					transform: 'translateX(-50%)',
					borderRadius: '50%',
					background:
						'radial-gradient(ellipse at center, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0) 75%)',
					filter: `blur(${3 * scaleFactor}px)`,
				}}
			/>

			{/* bag body */}
			<div
				style={{
					position: 'relative',
					width,
					aspectRatio: '420 / 610',
					borderRadius: `${18 * scaleFactor}px`,
					overflow: 'hidden',
					boxShadow: '0 30px 60px rgba(0,0,0,0.22), 0 8px 18px rgba(0,0,0,0.12)',
				}}
			>
				{/* white crimped top */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: '15%',
						background:
							'repeating-linear-gradient(90deg, #ffffff 0px, #f3f3f3 6px, #ffffff 12px)',
						borderBottom: `${2 * scaleFactor}px solid #e2e2e2`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: '38%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							display: 'flex',
							gap: width * 0.045,
						}}
					>
						{[0, 1, 2].map((i) => (
							<div
								key={i}
								style={{
									width: width * 0.065,
									height: width * 0.065,
									borderRadius: '50%',
									background: colors.bgLight,
									boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.25)',
								}}
							/>
						))}
					</div>
				</div>

				{/* green body */}
				<div
					style={{
						position: 'absolute',
						top: '15%',
						left: 0,
						right: 0,
						bottom: 0,
						background: `radial-gradient(120% 90% at 50% 35%, ${colors.greenLight} 0%, ${colors.green} 48%, ${colors.greenDark} 100%)`,
					}}
				>
					{/* subtle swirl highlight */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							background:
								'radial-gradient(60% 40% at 50% 38%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)',
						}}
					/>

					{/* 3in1 badge */}
					<div
						style={{
							position: 'absolute',
							top: '5%',
							left: '6%',
							background: '#ffffff',
							borderRadius: width * 0.05,
							padding: `${4 * scaleFactor}px ${8 * scaleFactor}px`,
							textAlign: 'center',
							boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
						}}
					>
						<div
							style={{
								fontFamily,
								fontWeight: 800,
								fontSize: width * 0.05,
								color: colors.red,
								lineHeight: 1,
							}}
						>
							3<span style={{fontSize: width * 0.032}}>in</span>1
						</div>
						<div
							style={{
								fontFamily,
								fontWeight: 700,
								fontSize: width * 0.028,
								color: colors.green,
								whiteSpace: 'nowrap',
							}}
						>
							Extra Foam
						</div>
					</div>

					{/* checklist ticks */}
					<div
						style={{
							position: 'absolute',
							top: '6%',
							right: '6%',
							display: 'flex',
							flexDirection: 'column',
							gap: width * 0.012,
							alignItems: 'flex-end',
						}}
					>
						{[0, 1, 2].map((i) => (
							<div
								key={i}
								style={{
									width: width * 0.24,
									height: width * 0.022,
									borderRadius: width * 0.01,
									background: 'rgba(255,255,255,0.28)',
								}}
							/>
						))}
					</div>

					{/* logo */}
					<div
						style={{
							position: 'absolute',
							top: '30%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '100%',
							textAlign: 'center',
						}}
					>
						<div
							dir="rtl"
							style={{
								fontFamily,
								fontWeight: 900,
								fontSize: width * 0.19,
								color: colors.red,
								WebkitTextStroke: `${Math.max(1, width * 0.006)}px #ffffff`,
								textShadow: '0 4px 10px rgba(0,0,0,0.25)',
								lineHeight: 1,
							}}
						>
							الوزير
						</div>
					</div>

					{/* white ribbon */}
					<div
						style={{
							position: 'absolute',
							top: '47%',
							left: 0,
							right: 0,
							background: '#ffffff',
							padding: `${width * 0.02}px 0`,
							boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
						}}
					>
						<div
							style={{
								fontFamily: "'Cairo', sans-serif",
								fontWeight: 700,
								fontStyle: 'italic',
								fontSize: width * 0.037,
								color: colors.green,
								textAlign: 'center',
							}}
						>
							Multi purpose Powder Detergent
						</div>
					</div>

					{/* Al-Mutawwar */}
					<div
						dir="rtl"
						style={{
							position: 'absolute',
							top: '58%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '100%',
							textAlign: 'center',
							fontFamily,
							fontWeight: 800,
							fontSize: width * 0.075,
							color: '#ffffff',
						}}
					>
						المطور
					</div>

					{/* normal powder badge */}
					<div
						style={{
							position: 'absolute',
							bottom: '15%',
							right: '6%',
							width: width * 0.16,
							height: width * 0.16,
							borderRadius: '50%',
							background: `radial-gradient(circle at 35% 30%, ${colors.gold}, #8f6b1f)`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							boxShadow: '0 3px 8px rgba(0,0,0,0.25)',
						}}
					>
						<span
							style={{
								fontFamily,
								fontWeight: 800,
								fontSize: width * 0.019,
								color: '#fff',
								lineHeight: 1.1,
							}}
						>
							NORMAL
							<br />
							Powder
						</span>
					</div>

					{/* bottom band */}
					<div
						style={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							background: colors.greenDark,
							padding: `${width * 0.03}px 0`,
							textAlign: 'center',
						}}
					>
						<div
							dir="rtl"
							style={{
								fontFamily,
								fontWeight: 700,
								fontSize: width * 0.033,
								color: '#ffffff',
							}}
						>
							مسحوق متعدد الاستعمالات
						</div>
						<div
							style={{
								fontFamily,
								fontWeight: 600,
								fontSize: width * 0.026,
								color: 'rgba(255,255,255,0.85)',
								marginTop: 2,
							}}
						>
							Multi Purpose Detergent
						</div>
					</div>

					{/* moving highlight sweep for brand moment scene */}
					{sweepHighlight ? (
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: `${sweepX}%`,
								width: '30%',
								height: '100%',
								background:
									'linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)',
								transform: 'skewX(-18deg)',
								mixBlendMode: 'screen',
							}}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
};
