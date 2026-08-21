import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';

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
		</>
	);
};
