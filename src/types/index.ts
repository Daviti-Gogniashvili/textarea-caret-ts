/**
 * Represents the coordinates of a caret position within a text input element.
 */
export interface CaretCoordinates {
	/** The top position of the caret in pixels, relative to the element */
	top: number;
	/** The left position of the caret in pixels, relative to the element */
	left: number;
	/** The height of the caret/line in pixels */
	height: number;
}

/**
 * Configuration options for getCaretCoordinates function.
 */
export interface CaretOptions {
	/** Whether to enable debug mode (keeps the mirror div visible) */
	debug?: boolean;
}
