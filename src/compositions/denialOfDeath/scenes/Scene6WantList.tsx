import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';
import {SCENE_BOUNDS, LINES, rel} from '../scenes';
import {PaperTexture} from '../components/PaperTexture';
import {GrainOverlay} from '../components/GrainOverlay';
import {CameraMove} from '../components/CameraMove';
import {CutoutImage} from '../components/CutoutImage';
import {StarburstIcon, MedalIcon, FamilyIcon} from '../components/Motifs';
import {HandwrittenText} from '../components/HandwrittenText';
import {EditorialLabel} from '../components/EditorialLabel';

const start = SCENE_BOUNDS.wantList.from;
const duration = rel(start, SCENE_BOUNDS.wantList.to);

const Row: React.FC<{
	label: string;
	delay: number;
	icon: React.ReactNode;
	align: 'flex-start' | 'flex-end';
	top: number;
}> = ({label, delay, icon, align, top}) => (
	<div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
		<div
			style={{
				display: 'flex',
				flexDirection: align === 'flex-start' ? 'row' : 'row-reverse',
				alignItems: 'center',
				gap: 32,
			}}
		>
			<CutoutImage width={130} height={130} delay={delay} fromX={align === 'flex-start' ? -50 : 50} rotate={align === 'flex-start' ? -6 : 6}>
				{icon}
			</CutoutImage>
			<EditorialLabel text={label} delay={delay + 6} fontSize={48} rotate={align === 'flex-start' ? 2 : -2} />
		</div>
	</div>
);

export const Scene6WantList: React.FC = () => {
	return (
		<AbsoluteFill>
			<PaperTexture tone="teal" />
			<GrainOverlay />
			<CameraMove durationInFrames={duration} fromScale={1.02} toScale={1.08} fromY={50} toY={-50}>
				<div style={{position: 'absolute', top: 130, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
					<HandwrittenText
						text="لذلك انت تريد تنجح"
						delay={rel(start, LINES.want0.from)}
						fontSize={62}
						color={colors.cream}
					/>
				</div>

				<Row label="تشتهر" top={520} delay={rel(start, LINES.want1.from)} icon={<StarburstIcon size={130} />} align="flex-end" />
				<Row label="تنجز" top={860} delay={rel(start, LINES.want2.from)} icon={<MedalIcon size={130} />} align="flex-start" />
				<Row label="تكون أسرة" top={1200} delay={rel(start, LINES.want3.from)} icon={<FamilyIcon size={150} />} align="flex-end" />

				<div style={{position: 'absolute', top: 1560, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
					<HandwrittenText text="بالأحرى..." delay={rel(start, LINES.rather.from)} fontSize={50} color={colors.grayLight} rotate={-2} />
				</div>
			</CameraMove>
		</AbsoluteFill>
	);
};
