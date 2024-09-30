// This function shortens a string if it exceeds the specified length, adding an ellipsis at the end.
export function shorten(str: string, length: number = 4) {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
}