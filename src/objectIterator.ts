export function objectIterator(o: any): [string, any][] {
    const r: [string, any][] = [];
    for (const k in o) if (o.hasOwnProperty(k)) r.push([k, o[k]]);
    return r;
}
