export type CollectObjectsFilter = (o: any) => boolean | undefined;
export const collectObjectsWithTFilter = (o: any) => typeof o.t === "string";

export const collectObjects = (
    a: any,
    filter: CollectObjectsFilter = collectObjectsWithTFilter,
    resultArray: any[] = [],
    c: any = { knownValues: new Set(), resultArray },
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
            if (c.knownValues.has(a)) {
                return c.resultArray;
            }
            c.knownValues.add(a);
            if (Array.isArray(a)) {
                for (const item of a) {
                    collectObjects(item, filter, c.resultArray, c);
                }
            } else {
                if (typeof a.t === "string") {
                    c.resultArray.push(a);
                }
                for (const k in a) {
                    collectObjects(a[k], filter, c.resultArray, c);
                }
            }
            break;
    }
    return c.resultArray;
};
