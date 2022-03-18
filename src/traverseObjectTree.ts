export type TraverseObjectTreeFilter = (o: any) => boolean | undefined;
export const traverseObjectTreeWithTFilter = (o: any) => typeof o.t === "string";

export interface TraverseObjectTreeOpts {
    resultArray: any[];
    addParents: boolean;
}

export const traverseObjectTree = (
    a: any,
    filter: TraverseObjectTreeFilter = traverseObjectTreeWithTFilter,
    opts?: TraverseObjectTreeOpts,
    c: any = { knownValues: new Set(), resultArray: opts?.resultArray || [] },
    parent?: any,
): unknown[] => {
    switch (typeof a) {
        case "undefined":
        case "symbol":
        case "string":
        case "number":
        case "boolean":
        case "bigint":
            return c.resultArray;

        case "function":
        case "object":
            if (c.knownValues.has(a) || !a) {
                return c.resultArray;
            }
            c.knownValues.add(a);
            if (Array.isArray(a)) {
                for (const item of a) {
                    traverseObjectTree(item, filter, c.resultArray, c, a);
                }
            } else {
                if (filter(a)) {
                    if (opts?.addParents && parent) {
                        a.parent = parent;
                    }
                    c.resultArray.push(a);
                }
                for (const k in a) {
                    traverseObjectTree(a[k], filter, c.resultArray, c, a);
                }
            }
            break;
    }
    return c.resultArray;
};
