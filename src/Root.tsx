import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
import {AlWazirPowderAd} from './compositions/alwazir/AlWazirPowderAd';

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
		</>
	);
};
