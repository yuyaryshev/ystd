export function sorterFuncSrc(fields: string | string[]) {
    let s = "0";
    if (!Array.isArray(fields)) fields = [fields];

    for (let field of fields) {
        s = `(a.${field} < b.${field} ? -1 : a.${field} > b.${field} ? 1 : ${s})`;
    }

    return s;
}

export function sorterFunc(fields: string | string[]):(a: object,b: object)=> number {
    return new Function('a', 'b', `return ${sorterFuncSrc(fields)}`) as any;
}

export function sortObjects(objectsArray: any[], fields: string | string[]) {
    objectsArray.sort(sorterFunc(fields));
    return objectsArray;
}
