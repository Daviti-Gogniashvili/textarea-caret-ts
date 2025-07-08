/**
 * CSS properties that need to be copied from the original element to the mirror div
 * to ensure accurate caret position calculation.
 */
export const COPIED_PROPERTIES: readonly string[] = [
	'direction', // RTL support
	'boxSizing',
	'width', // Exclude scrollbar on Chrome/IE for exact wrapping
	'height',
	'overflowX',
	'overflowY', // Copy scrollbar behavior

	'borderTopWidth',
	'borderRightWidth',
	'borderBottomWidth',
	'borderLeftWidth',
	'borderStyle',

	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft',

	// Font properties
	'fontStyle',
	'fontVariant',
	'fontWeight',
	'fontStretch',
	'fontSize',
	'fontSizeAdjust',
	'lineHeight',
	'fontFamily',

	'textAlign',
	'textTransform',
	'textIndent',
	'textDecoration',

	'letterSpacing',
	'wordSpacing',

	'tabSize'
] as const;

/** ID used for the mirror div element */
export const MIRROR_DIV_ID = 'input-textarea-caret-position-mirror-div';

/** Non-breaking space character used for input elements */
export const NON_BREAKING_SPACE = '\u00a0';
