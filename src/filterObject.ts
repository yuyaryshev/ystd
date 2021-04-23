export function filterObject(object: any, keysOrFilterCallback: string[] | ((key: string, object: any) => boolean), invert?: boolean): any {
    const r = {} as any;
    if (Array.isArray(keysOrFilterCallback)) {
        for (let key in object ) if (invert !== keysOrFilterCallback.includes(key)) r[key] = object[key];
        return r;
    } else {
        for (let key in object) if (invert !== keysOrFilterCallback(key, object)) r[key] = object[key];
        return r;
    }
}
