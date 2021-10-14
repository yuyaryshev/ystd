export interface KeyValueEvent<K = string, T = any> {
    k: K;
    v: T;
}

export function keyValueEventFromObject<T extends object>(obj: T): KeyValueEvent<keyof T, any>[] {
    const events: KeyValueEvent<keyof T, any>[] = [];
    for (const k in obj) {
        events.push({ k, v: obj[k] });
    }
    return events;
}
