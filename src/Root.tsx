import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
import {AlWazirPowderAd} from './compositions/alwazir/AlWazirPowderAd';
import {DenialOfDeath} from './compositions/denialOfDeath/DenialOfDeath';
import {TOTAL_FRAMES} from './compositions/denialOfDeath/scenes';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="StudioReady"
				component={StudioReady}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="AlWazirPowderAd"
				component={AlWazirPowderAd}
				durationInFrames={900}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="DenialOfDeath"
				component={DenialOfDeath}
				durationInFrames={TOTAL_FRAMES}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
