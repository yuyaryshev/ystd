export function asArray<T>(a: undefined | T | T[]): T[] {
    return a === undefined ? [] : Array.isArray(a) ? a : [a];
}
