// Visual system for "Denial of Death" — editorial scrapbook / analog collage.
// Palette derived from the reference book cover (teal-gray halftone, cream
// paper, faded black ink) and the reference motion scrapbook (aged teal
// paper, burgundy/ink annotations).

export const colors = {
	paper: '#e9e3d5',
	paperLight: '#f3efe4',
	paperDark: '#d8cfba',
	teal: '#4c6b6a',
	tealDark: '#33494a',
	tealDeep: '#233738',
	ink: '#22201c',
	inkSoft: '#3a352c',
	fadedBlack: '#161513',
	gray: '#8b8578',
	grayLight: '#bdb6a4',
	cream: '#f4ecd8',
	burgundy: '#6d2f2c',
	brown: '#5b4632',
	stampRed: '#7a3226',
	accent: '#c98b6b',
} as const;

export const fonts = {
	headline: "'Amiri', serif", // literary serif — main narrative statements
	hand: "'ArefRuqaaInk', serif", // cursive ink — handwritten annotations
	label: "'Tajawal', sans-serif", // clean geometric — stamped labels / captions
} as const;

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SAFE_MARGIN = 90;
