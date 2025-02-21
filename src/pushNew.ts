export function pushNew<T>(targetArray: T[], ...vv: (T | undefined)[]) {
    for (let v of vv) {
        if (v !== undefined && !targetArray.includes(v)) {
            targetArray.push(v);
        }
    }
    return targetArray;
}
