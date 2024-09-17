/**
 * Relative date string
 * @param {Date} d - The date to convert.
 * @returns {string} - A relative date string.
 * @example
 * relativeDate(new Date('2021-01-01T00:00:00Z'));
 * // Returns "in 5 minutes"
 * @example
 * relativeDate(new Date('2021-01-01T00:00:00Z'));
 * // Returns "5 minutes ago"
 */
export function toRelativeDate(d: Date) {
    const now = new Date();
    const diff = Math.round((d.getTime() - now.getTime()) / 1000);
    const isInFuture = diff > 0;
    const seconds = Math.abs(diff);
    if (seconds < 60)
        return isInFuture ? 'in ' + seconds + ' seconds' : seconds + ' seconds ago';
    if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return isInFuture ? `in ${minutes} minutes and ${remainingSeconds} seconds` : `${minutes} minutes and ${remainingSeconds} seconds ago`;
    }
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    return isInFuture ? `in ${hours} hours and ${minutes} minutes` : `${hours} hours and ${minutes} minutes ago`;
}