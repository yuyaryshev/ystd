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

export function lookupMap<K, V>(map: Map<K, V>, key: K, cpl?: string, mapName?: string): V {
    const v = map.get(key);
    if (v !== undefined) return v;
    throw new Error(`${cpl || "CODE00000031"} Expected key '${key}' not found in map ${mapName || ""}`.trim());
}

export function optLookupMap<K, V>(map: Map<K, V>, key: K | undefined, cpl?: string, mapName?: string): V | undefined {
    if (!key) return undefined;
    const v = map.get(key);
    if (v !== undefined) return v;
    throw new Error(`${cpl || "CODE00000032"} Expected key '${key}' not found in map ${mapName || ""}`.trim());
}
