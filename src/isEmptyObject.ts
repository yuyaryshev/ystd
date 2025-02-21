export function isEmptyObject(v: any) {
    if (typeof v !== "object") {
        return false;
    }
    for (let k in v) {
        if (v[k] !== undefined) {
            return false;
        }
    }
    return true;
}
