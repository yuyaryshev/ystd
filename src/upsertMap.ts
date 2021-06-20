export function upsertMap<K, V>(map: Map<K, V>, key: K, newValueOrFunc: V | (() => V)): [V, boolean] {
    const v1 = map.get(key);
    if (v1 !== undefined) return [v1, false];

    if (typeof newValueOrFunc === "function") {
        const v2 = (newValueOrFunc as any)();
        map.set(key, v2);
        return [v2, true];
    } else {
        map.set(key, newValueOrFunc);
        return [newValueOrFunc, true];
    }
}
