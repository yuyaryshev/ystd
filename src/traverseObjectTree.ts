export type TraverseObjectTreeFilter = (o: any) => boolean | undefined;
export const traverseObjectTreeWithTFilter = (o: any) => typeof o.t === "string";

export interface TraverseObjectTreeOpts {
    resultArray: any[];
    parentFilter?: TraverseObjectTreeFilter;
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
                    traverseObjectTree(item, filter, opts, c, parent);
                }
            } else {
                if (filter(a)) {
                    if (opts?.parentFilter && parent) {
                        let v_parent = parent;
                        while (true) {
                            if (opts?.parentFilter(v_parent)) {
                                a.parent = v_parent;
                                break;
                            } else if (!v_parent?.parent) {
                                break;
                            } else {
                                v_parent = v_parent?.parent;
                            }
                        }
                    }
                    c.resultArray.push(a);
                }
                for (const k in a) {
                    traverseObjectTree(a[k], filter, opts, c, opts?.parentFilter ? (opts?.parentFilter(a) ? a : parent) : parent);
                }
            }
            break;
    }
    return c.resultArray;
};
