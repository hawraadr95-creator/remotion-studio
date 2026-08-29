import {loadFont as loadDisplayFont} from '@remotion/google-fonts/NotoKufiArabic';
import {loadFont as loadBodyFont} from '@remotion/google-fonts/IBMPlexSansArabic';

export const displayFont = loadDisplayFont('normal', {
	weights: ['500', '700', '800', '900'],
	subsets: ['arabic', 'latin'],
}).fontFamily;

export const bodyFont = loadBodyFont('normal', {
	weights: ['400', '500', '600', '700'],
	subsets: ['arabic', 'latin'],
}).fontFamily;
