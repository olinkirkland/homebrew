export function validateUsername(username: string): boolean {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
