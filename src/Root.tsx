import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
import {AlWazirPowderAd} from './compositions/alwazir/AlWazirPowderAd';
import {DenialOfDeathIntro} from './compositions/denialOfDeath/DenialOfDeathIntro';
import {DenialOfDeathFull} from './compositions/denialOfDeath/DenialOfDeathFull';

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
				id="DenialOfDeathIntro"
				component={DenialOfDeathIntro}
				durationInFrames={240}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="DenialOfDeathFull"
				component={DenialOfDeathFull}
				durationInFrames={1380}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
