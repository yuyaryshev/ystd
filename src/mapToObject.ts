/**
 *
 */
export function mapToObject<K extends string, V>(m: Map<K, V>): { [key: string]: V } {
    const r = {} as any;
    for (const [k, v] of m) r[k] = v;
    return r;
}
