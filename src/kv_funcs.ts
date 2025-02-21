export function kv_set<K, V, TRG extends Map<K, V> | { [key: string]: V }>(targetKv: TRG, k: K, v: V): TRG {
    if (targetKv instanceof Map) {
        targetKv.set(k, v);
    } else {
        targetKv[k as any] = v;
    }
    return targetKv;
}

export function kv_get<K, V, TRG extends Map<K, V> | { [key: string]: V }>(sourceKv: TRG, k: K): V | undefined {
    if (sourceKv instanceof Map) {
        return sourceKv.get(k);
    }
    return sourceKv[k as any];
}

export function kv_upsert<K, V, TRG extends Map<K, V> | { [key: string]: V }>(targetKv: TRG, k: K, newValueOrFunc: V | (() => V)): [V, boolean] {
    if (targetKv instanceof Map) {
        const v1 = targetKv.get(k);
        if (v1 !== undefined) return [v1, false];

        if (typeof newValueOrFunc === "function") {
            const v2 = (newValueOrFunc as any)();
            targetKv.set(k, v2);
            return [v2, true];
        } else {
            targetKv.set(k, newValueOrFunc);
            return [newValueOrFunc, true];
        }
    } else {
        const v1 = targetKv[k as any];
        if (v1 !== undefined) return [v1, false];

        if (typeof newValueOrFunc === "function") {
            const v2 = (newValueOrFunc as any)();
            if (targetKv[k as any] === undefined) {
                targetKv[k as any] = v2;
            }
            return [targetKv[k as any], true];
        } else {
            targetKv[k as any] = newValueOrFunc;
            return [targetKv[k as any], true];
        }
    }
}
