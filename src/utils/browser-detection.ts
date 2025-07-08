/**
 * Browser detection utilities
 */

/**
 * Checks if the current environment is a browser.
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Checks if the current browser is Firefox by checking for a reliable feature.
 */
export const isFirefox = isBrowser && typeof (window as any).InstallTrigger !== "undefined";

/**
 * Checks if the current browser supports the modern getComputedStyle API.
 */
export const hasGetComputedStyle = isBrowser && typeof window.getComputedStyle === "function";
