/**
 *
 */
export function removeEmpty<T>(data: T): T {
    for (const k in data) {
        if (data[k] instanceof Object) removeEmpty(data[k]);

        if (
            data[k] === null ||
            data[k] === undefined ||
            (data as any)[k] === "" ||
            (data[k] instanceof Object && Object.keys(data[k] as any).length === 0)
        )
            delete data[k];
    }
    return data;
}

/**
 *
 */
export function removeUndefined<T extends { [key: string]: any }>(obj: T): T {
    for (const k in obj) if (obj[k] === undefined) delete obj[k];
    return obj;
}
