import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
import {AlWazirPowderAd} from './compositions/alwazir/AlWazirPowderAd';
import {ClinicGameStyle, CLINIC_GAME_DURATION} from './compositions/clinicgame/ClinicGameStyle';

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
				id="ClinicGameStyle"
				component={ClinicGameStyle}
				durationInFrames={CLINIC_GAME_DURATION}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
