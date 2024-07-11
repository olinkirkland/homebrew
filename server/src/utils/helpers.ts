export function makeReadableToken(segmentCount: number = 2) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segmentsArray = Array.from({ length: segmentCount }, () =>
        Array.from({ length: 4 }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('')
    );
    return segmentsArray.join('-');
}
