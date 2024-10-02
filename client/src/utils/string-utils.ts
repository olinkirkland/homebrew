/**
 * Shortens a string if it exceeds the specified length, adding an ellipsis at the end.
 * @param str The string to shorten.
 * @param length The maximum length of the string.
 * @returns The shortened string. For example, 'Hello, world!' -> 'Hell...'.
 */
export function shorten(str: string, length: number = 4) {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
}

/**
 * Converts a numerator and denominator to a percentage string.
 * @param numerator The numerator.
 * @param denominator The denominator.
 * @returns The percentage string. For example, 0.5 -> '50%'.
 */
export function toPercentString(numerator: number, denominator: number) {
    return `${Math.floor(numerator / denominator * 100)}%`;
}