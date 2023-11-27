export function pushFirst<T>(targetArray: T[], v: T | undefined) {
    if (v !== undefined && !targetArray.length) {
        targetArray.push(v);
    }
    return targetArray;
}
