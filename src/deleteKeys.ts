/**
 *
 */
export function deleteKeys(o: any, keys?: string[] | Set<string>) {
    if (keys && !Array.isArray(keys)) keys = [...keys];
    for (const key of keys || Object.keys(o)) if (o.hasOwnProperty(key)) delete o.key;
}

/**
 *
 */
export function undefinedKeys(o: any, keys?: string[] | Set<string>) {
    if (keys && !Array.isArray(keys)) keys = [...keys];
    for (const key of keys || Object.keys(o)) if (o.hasOwnProperty(key)) o.key = undefined;
}
