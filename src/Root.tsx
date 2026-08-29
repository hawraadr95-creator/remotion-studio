import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
import {AlWazirPowderAd} from './compositions/alwazir/AlWazirPowderAd';
import {DenialOfDeathReel} from './compositions/denial-of-death/DenialOfDeathReel';
import {TOTAL_DURATION} from './compositions/denial-of-death/script';

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
				id="DenialOfDeathReel"
				component={DenialOfDeathReel}
				durationInFrames={TOTAL_DURATION}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
