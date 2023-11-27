export function recursiveSearch(v: any, key: string, context: { knownObjects: Set<any> } = { knownObjects: new Set() }): any {
    if (typeof v === "object") {
        if (context.knownObjects.has(v)) {
            return undefined;
        }
        context.knownObjects.add(v);

        if (!Array.isArray(v)) {
            if (v[key] !== undefined) {
                return v[key];
            }
            for (let k in v) {
                const rr = recursiveSearch(v[k], key, context);
                if (rr !== undefined) {
                    return rr;
                }
            }
        } else {
            for (let item of v) {
                const rr = recursiveSearch(item, key, context);
                if (rr !== undefined) {
                    return rr;
                }
            }
        }
    }
}
