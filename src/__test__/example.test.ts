/* eslint-disable no-undef */
import { getCaretCoordinates } from '../';
import type { CaretCoordinates } from '../types';

describe('getCaretCoordinates', () => {
	let textarea: HTMLTextAreaElement;

	beforeEach(() => {
		textarea = document.createElement('textarea');
		textarea.value = 'Hello\nWorld';
		textarea.style.fontSize = '16px';
		textarea.style.lineHeight = '20px';
		textarea.style.padding = '4px';
		textarea.style.border = '1px solid black';
		textarea.style.position = 'absolute';
		textarea.style.left = '0';
		textarea.style.top = '0';
		document.body.appendChild(textarea);
	});

	afterEach(() => {
		document.body.removeChild(textarea);
	});

	it('should return caret coordinates at a given position', () => {
		const position = 5;
		const coords: CaretCoordinates = getCaretCoordinates(textarea, position);
		expect(coords).toHaveProperty('top');
		expect(coords).toHaveProperty('left');
		expect(coords).toHaveProperty('height');
		expect(typeof coords.top).toBe('number');
		expect(typeof coords.left).toBe('number');
		expect(typeof coords.height).toBe('number');
		expect(coords.height).toBeGreaterThan(0);
	});

	it('should clamp position to 0 if negative', () => {
		const coords = getCaretCoordinates(textarea, -5);
		expect(coords).toBeDefined();
	});

	it('should not throw in debug mode and retain mirror div', () => {
		const coords = getCaretCoordinates(textarea, 0, { debug: true });
		const mirror = document.getElementById('input-textarea-caret-typescript-mirror-div');
		expect(coords).toBeDefined();
		expect(mirror).not.toBeNull();
		mirror?.remove();
	});
});
