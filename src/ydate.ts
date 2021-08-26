export function Ydate_diff(a: Date, b: Date): number {
    // @ts-ignore
    return b - a;
}

export function Ydate_not_expired(v: Date): boolean {
    // @ts-ignore
    return v - new Date() >= 0;
}

export function Ydate_expired(v: Date): boolean {
    // @ts-ignore
    return v - new Date() < 0;
}
