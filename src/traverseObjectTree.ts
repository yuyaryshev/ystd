export type TraverseObjectTreeFilter = (o: any) => boolean | undefined;
export const traverseObjectTreeWithTFilter = (o: any) => typeof o.t === "string";

export interface TraverseObjectTreeOptsWoResult {
    filter: TraverseObjectTreeFilter;
    parentFilter?: TraverseObjectTreeFilter;
    mutate?: boolean; // mutate object for setting parent. Default = no - creates a new object instead
}

export interface TraverseObjectTreeOpts extends TraverseObjectTreeOptsWoResult {
    resultArray: any[];
}

export const traverseObjectTree = (
    a: any,
    opts: TraverseObjectTreeOpts,
    c: any = { knownValues: new Set(), resultArray: opts.resultArray || [] },
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
                    traverseObjectTree(item, opts, c, parent);
                }
            } else {
                if (opts.filter(a)) {
                    let a_parent;
                    if (opts?.parentFilter && parent) {
                        let v_parent = parent;
                        while (true) {
                            if (opts?.parentFilter(v_parent)) {
                                a_parent = v_parent;
                                break;
                            } else if (!v_parent?.parent) {
                                break;
                            } else {
                                v_parent = v_parent?.parent;
                            }
                        }
                        if (opts.mutate) {
                            a.parent = a_parent;
                            c.resultArray.push(a);
                        } else {
                            c.resultArray.push({ ...a, parent: a_parent });
                        }
                    } else {
                        c.resultArray.push(a);
                    }
                }
                for (const k in a) {
                    traverseObjectTree(a[k], opts, c, opts?.parentFilter ? (opts?.parentFilter(a) ? a : parent) : parent);
                }
            }
            break;
    }
    return c.resultArray;
};
