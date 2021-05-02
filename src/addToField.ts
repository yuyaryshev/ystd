/**
 * Increments <b>value</b> of <b>object</b>[<b>field</b>]. If <b>field</b> is undefined it is assigned to <b>value</b>.
 */
export function addToField(object: any, field: string, value: any) {
    if (object[field] === undefined) object[field] = value;
    else object[field] += value;
    return value;
}
