export function pushNew<T>(targetArray: T[], v: T | undefined) {
    if (v !== undefined && !targetArray.includes(v)) {
        targetArray.push(v);
    }
    return targetArray;
}
