import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');

// Use the browser preinstalled in this environment instead of downloading one.
const preinstalledBrowser =
	'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
if (require('fs').existsSync(preinstalledBrowser)) {
	Config.setBrowserExecutable(preinstalledBrowser);
}
