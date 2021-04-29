import { AnyObject } from "./AnyObject.js";

export const extractFields = (v: AnyObject, fields: string[]) => {
    const r = {} as any;
    for (const field of fields) {
        const path = field.split(".");
        let v2 = v;
        for (const part of path) if (v2) v2 = v2[part];
        r[path[0]] = v2;
    }
    return r;
};
