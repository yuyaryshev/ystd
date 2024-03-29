export interface FilterSettings {
    keepFunctions?: boolean;
    excluded?: string[] | string;
    included?: string[] | string;
    reduce?: string[] | string;
}

export const splitIfString = (v: any, sep: any = " ") => {
    return typeof v === "string" ? v.split(sep) : v;
};

function mapToObject(m: Map<any, any>): any {
    const r: any = {};
    for (const [k, v] of m) r[k] = v;
    return r;
}

export const objectFilter = (v: any, filterSettings?: FilterSettings): any => {
    const keepFunctions = filterSettings ? filterSettings.keepFunctions : undefined;
    const excluded = filterSettings ? splitIfString(filterSettings.excluded) : undefined;
    const included = filterSettings ? splitIfString(filterSettings.included) : undefined;
    let reduce = filterSettings ? splitIfString(filterSettings.reduce) : undefined;

    if (reduce) reduce = reduce.map((a: any) => splitIfString(a, "."));

    if (v instanceof Map) return objectFilter(mapToObject(v), filterSettings);
    if (v instanceof Set) return objectFilter([...v], filterSettings);

    if (typeof v !== "object" || !v) return v;

    if (Array.isArray(v)) {
        const r: any[] = [];
        const n = v.length;
        for (let i = 0; i < n; i++) if (keepFunctions || typeof v[i] !== "function") r.push(objectFilter(v[i], filterSettings));
        return r;
    }

    const r: any = {};
    for (const p in v)
        if ((keepFunctions || typeof v[p] !== "function") && (!excluded || !excluded.includes(p)) && (!included || included.includes(p))) {
            r[p] = objectFilter(v[p], filterSettings);
            if (reduce) {
                for (const rd of reduce) {
                    if (rd[0] === p) {
                        let x = v[rd[0]];
                        for (let i = 1; i < rd.length; i++) x = x[rd[i]];
                        r[p] = objectFilter(x, filterSettings);
                    }
                }
            }
        }
    return r;
};

export const exceptFunctions = (v: any): any => {
    if (typeof v !== "object" || !v || v instanceof Date) return v;

    if (Array.isArray(v)) {
        const r: any[] = [];
        const n = v.length;
        for (let i = 0; i < n; i++) if (typeof v[i] !== "function") r.push(exceptFunctions(v[i]));
        return r;
    }

    const r: any = {};
    for (const p in v) if (typeof v[p] !== "function") r[p] = exceptFunctions(v[p]);
    return r;
};
