/**
 *
 */
export function strReplaceAll(containerString: string, keyValue: { [key: string]: string | number }, prefix: string = "", suffix: string = "") {
    let s = containerString;
    for (const k in keyValue) {
        const v = keyValue[k]! + "";
        s = s.split(prefix + k + suffix).join(v);
    }
    return s;
}

export const substitute = strReplaceAll;
