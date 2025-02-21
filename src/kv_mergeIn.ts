export function kv_mergeIn<K, V, TRG extends Map<K, V> | { [key: string]: V }>(targetKv: TRG, sourceKv: Map<K, V> | { [key: string]: V }): TRG {
    if (targetKv instanceof Map) {
        if (sourceKv instanceof Map) {
            for (let [k, v] of sourceKv) {
                targetKv.set(k, v);
            }
        } else {
            for (let k in sourceKv) {
                targetKv.set(k as any, sourceKv[k]);
            }
        }
    } else {
        if (sourceKv instanceof Map) {
            for (let [k, v] of sourceKv) {
                targetKv[k as any] = v;
            }
        } else {
            for (let k in sourceKv) {
                targetKv[k as any] = sourceKv[k];
            }
        }
    }
    return targetKv;
}
