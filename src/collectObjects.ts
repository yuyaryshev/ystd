export type CollectObjectsFilter = (o: any) => boolean | undefined;
export const collectObjectsWithTFilter = (o: any) => typeof o.t === "string";

export const collectObjects = (
    a: any,
    filter: CollectObjectsFilter = collectObjectsWithTFilter,
    c: any = { knownValues: new Set(), collected: [] },
): unknown[] => {
    switch (typeof a) {
        case "undefined":
        case "symbol":
        case "string":
        case "number":
        case "boolean":
        case "bigint":
            return c.collected;

        case "function":
        case "object":
            if (c.knownValues.has(a)) {
                return c.collected;
            }
            c.knownValues.add(a);
            if (Array.isArray(a)) {
                for (const item of a) {
                    collectObjects(item, filter, c);
                }
            } else {
                if (typeof a.t === "string") {
                    c.collected.push(a);
                }
                for (const k in a) {
                    collectObjects(a[k], filter, c);
                }
            }
            break;
    }
    return c.collected;
};
