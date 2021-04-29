export function sorterFuncSrc(fields: string | string[]) {
    let s = "0";
    if (!Array.isArray(fields)) fields = [fields];

    for (const field of fields) {
        s = `(a.${field} < b.${field} ? -1 : a.${field} > b.${field} ? 1 : ${s})`;
    }

    return s;
}

export function sortBy(fields: string | string[]) {
    return new Function("a", "b", sorterFuncSrc(fields)) as (a: any, b: any) => number;
}

export function sortObjects(objectsArray: any[], fields: string | string[]) {
    objectsArray.sort(sortBy(fields));
    return objectsArray;
}
