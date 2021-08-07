export function array_inplace_filter<T>(a: T[], cond: (t: T) => boolean) {
    let n = a.length;
    let i = 0;
    while (i < n && cond(a[i])) i++;

    if (i < n) {
        let j = i + 1;
        for (; j < n; j++) {
            if (cond(a[j])) {
                a[i] = a[j];
                i++;
            }
        }
        a.length = i;
    }
    return a;
}

export function array_inplace_defrag_delete<T>(a: T[], index: number) {
    const n = a.length - 1;
    if (0 <= index && index <= n) {
        const t = a[index];
        a[index] = a[n];
        a.length = n;
        return t;
    }
    return undefined;
}
