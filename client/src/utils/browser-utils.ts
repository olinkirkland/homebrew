export function reloadPage() {
    location.reload();
}

/**
 * Wait for a specified number of seconds
 * @param seconds - The number of seconds to wait
 * @returns A promise that resolves after the specified number of seconds
 */
export async function wait(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}