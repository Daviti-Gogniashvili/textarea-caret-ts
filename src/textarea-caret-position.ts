import type { CaretCoordinates, CaretOptions } from './types';
import { isBrowser, isFirefox } from './utils/browser-detection';
import { COPIED_PROPERTIES, MIRROR_DIV_ID, NON_BREAKING_SPACE } from './utils/css-properties';

/**
 * Calculates the caret coordinates (top, left, height) for a given position
 * within a textarea or input element.
 *
 * This function creates a mirror div that replicates the styling of the original
 * element to accurately calculate where the caret would be positioned.
 *
 * @param element - The textarea or input element to calculate caret position for
 * @param position - The character position within the element's value (0-based index)
 * @param options - Configuration options
 * @returns Object containing the caret coordinates and height
 *
 * @throws {Error} When called in a non-browser environment
 *
 * @example
 * ```typescript
 * const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
 * const position = textarea.selectionStart || 0;
 * const coordinates = getCaretCoordinates(textarea, position);
 * console.log(`Caret is at (${coordinates.left}, ${coordinates.top})`);
 * ```
 */
export const getCaretCoordinates = (
	element: HTMLTextAreaElement | HTMLInputElement,
	position: number,
	options?: CaretOptions
): CaretCoordinates => {
	if (!isBrowser) {
		throw new Error(
			'textarea-caret-position#getCaretCoordinates should only be called in a browser'
		);
	}

	// Validate and clamp position parameter
	const clampedPosition = Math.max(0, Math.min(position, element.value.length));

	const debug = options?.debug || false;

	// Clean up any existing mirror div in debug mode
	if (debug) {
		const existingMirror = document.querySelector(`#${MIRROR_DIV_ID}`);
		if (existingMirror?.parentNode) {
			existingMirror.parentNode.removeChild(existingMirror);
		}
	}

	// Create mirror div that will replicate the textarea's style
	const mirrorDiv = document.createElement('div');
	mirrorDiv.id = MIRROR_DIV_ID;
	document.body.appendChild(mirrorDiv);

	const mirrorStyle = mirrorDiv.style;
	const computedStyle = window.getComputedStyle(element);

	const isInput = element.nodeName === 'INPUT';

	// Set default textarea styles
	mirrorStyle.whiteSpace = 'pre-wrap';
	if (!isInput) {
		mirrorStyle.wordWrap = 'break-word'; // Only for textareas
	}

	// Position off-screen
	mirrorStyle.position = 'absolute'; // Required for accurate coordinates
	if (!debug) {
		mirrorStyle.visibility = 'hidden'; // Hide but keep rendering
	}

	// Copy all relevant CSS properties from the original element
	COPIED_PROPERTIES.forEach((prop) => {
		if (isInput && prop === 'lineHeight') {
			// Special case for inputs: text is centered and lineHeight may not equal height
			mirrorStyle.lineHeight = computedStyle.height;
		} else {
			const value =
				computedStyle.getPropertyValue(prop) ||
				computedStyle.getPropertyValue(`-webkit-${prop}`) ||
				computedStyle.getPropertyValue(`-moz-${prop}`);
			if (value) {
				mirrorStyle.setProperty(prop, value);
			}
		}
	});

	// Firefox-specific overflow handling
	if (isFirefox) {
		// Firefox behavior with textarea scrolling
		if (element.scrollHeight > parseInt(computedStyle.height || '0', 10)) {
			mirrorStyle.overflowY = 'scroll';
		}
	} else {
		mirrorStyle.overflow = 'hidden'; // Prevent scrollbar in other browsers
	}

	// Set the text content up to the caret position
	const textBeforeCaret = element.value.substring(0, clampedPosition);
	mirrorDiv.textContent = isInput
		? textBeforeCaret.replace(/\s/g, NON_BREAKING_SPACE) // Replace spaces with non-breaking spaces for inputs
		: textBeforeCaret;

	// Create span at caret position
	const caretSpan = document.createElement('span');

	// Include the rest of the text to ensure exact wrapping behavior
	const textAfterCaret = element.value.substring(clampedPosition);
	caretSpan.textContent = textAfterCaret || '.'; // Use '.' if empty to ensure span renders

	mirrorDiv.appendChild(caretSpan);

	// Calculate coordinates with improved error handling
	const borderTopWidth = parseInt(computedStyle.borderTopWidth || '0', 10);
	const borderLeftWidth = parseInt(computedStyle.borderLeftWidth || '0', 10);
	const lineHeight = parseInt(computedStyle.lineHeight || computedStyle.fontSize || '16', 10);

	const coordinates: CaretCoordinates = {
		top: caretSpan.offsetTop + borderTopWidth,
		left: caretSpan.offsetLeft + borderLeftWidth,
		height: lineHeight
	};

	// Debug mode: highlight the caret position
	if (debug) {
		caretSpan.style.backgroundColor = '#aaa';
	} else {
		// Clean up the mirror div
		document.body.removeChild(mirrorDiv);
	}

	return coordinates;
};
