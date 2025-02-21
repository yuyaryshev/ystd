export function set_mergeIn<T>(targetSet: Set<T>, source: Iterable<T>) {
    for (let v of source) {
        targetSet.add(v);
    }
    return targetSet;
}
