/**
 * Filters & maps array in one operation
 */
export function fmap<T, R>(array: T[], callback: (item: T, index: number) => R | null | false | undefined): R[] {
    const r: R[] = [];
    const len = array.length || 0;
    for (let i = 0; i < len; i++) {
        const itemr = callback(array[i], i);
        if (itemr !== undefined && itemr !== null && itemr !== false) r.push(itemr);
    }
    return r;
}
