// @ts-ignore
import cloneDeepJs from "clone-deep";
export const deepClone = cloneDeepJs;

export const yyaDeepClone = (aObject: any) => {
    if (!aObject) return aObject;

    const bObject: any = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
        const v = aObject[k];
        bObject[k] = typeof v === "object" ? yyaDeepClone(v) : v;
    }
    return bObject;
};
