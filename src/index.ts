/**
 * @fileoverview Get the caret coordinates (top, left, height) of a textarea or input element.
 * @author David Gogniashvili <david.gogniashvili.dg@gmail.com>
 * @license MIT
 */

export type { CaretCoordinates, CaretOptions } from './types';
export { getCaretCoordinates } from './textarea-caret-position';

// Re-export for convenience
export { getCaretCoordinates as default } from './textarea-caret-position';
