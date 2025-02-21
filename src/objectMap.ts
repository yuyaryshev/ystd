export function objectMap<S, T>(s: { [key: string]: S }, f: (s: S) => T): { [key: string]: T } {
    const r: { [key: string]: T } = {};
    for (let k in s) {
        r[k] = f(s[k]);
    }
    return r;
}

export function objectMapWithContext<C, S, T>(c: C, s: { [key: string]: S }, f: (c: C, s: S) => T): { [key: string]: T } {
    const r: { [key: string]: T } = {};
    for (let k in s) {
        r[k] = f(c, s[k]);
    }
    return r;
}
