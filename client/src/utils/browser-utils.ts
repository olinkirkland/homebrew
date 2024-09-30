export function reloadPage() {
    location.reload();
}

export async function wait(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}