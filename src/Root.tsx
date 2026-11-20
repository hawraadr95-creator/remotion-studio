import {Composition} from 'remotion';
import {StudioReady} from './StudioReady';
import {AlWazirPowderAd} from './compositions/alwazir/AlWazirPowderAd';
import {ClinicSimulator, CLINIC_SIM_DURATION} from './compositions/clinicsim/ClinicSimulator';
import {ClinicOpenWorld, CLINIC_OPEN_WORLD_DURATION} from './compositions/clinicopenworld/ClinicOpenWorld';
import {IVFExplainer, IVF_DURATION} from './compositions/ivf/IVFExplainer';
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
			<Composition
				id="ClinicSimulator"
				component={ClinicSimulator}
				durationInFrames={CLINIC_SIM_DURATION}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="ClinicOpenWorld"
				component={ClinicOpenWorld}
				durationInFrames={CLINIC_OPEN_WORLD_DURATION}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="IVFExplainer"
				component={IVFExplainer}
				durationInFrames={IVF_DURATION}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{voiceover: null, music: 'ivf/music.mp3'}}
			/>
		</>
	);
};
