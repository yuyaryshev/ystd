export function arrayExpectOne<T>(array: T[], cond: (v: T) => boolean, msg?: string) {
    let v1;
    for (const v of array)
        if (cond(v)) {
            if (v1 === undefined) v1 = v;
            else throw new Error(`CODE00000628 ${msg} arrayExpectOne found more than one value`);
        }
    if (v1 === undefined) throw new Error(`CODE00000629 ${msg} arrayExpectOne found no values`);
    return v1;
}
