import { AnyObject } from "./AnyObject.js";

export const valueByPath = (v: AnyObject, path: string[]) => {
    for (const part of path) v = v[part];
    return v;
};
