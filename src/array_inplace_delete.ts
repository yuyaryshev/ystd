import { alwaysTrue } from "./alwaysTrue.js";
import { stopCursorSymbol, StopCursorSymbol } from "./StopCursorSymbol.js";

export function array_inplace_filter<T>(a: T[], cond: (t: T, index: number) => boolean | StopCursorSymbol): T[] {
    let n = a.length;
    let i = 0;
    while (i < n) {
        const r = cond(a[i], i);
        if (r) {
            i++;
            if (r === stopCursorSymbol) return a;
        } else {
            break;
        }
    }

    if (i < n) {
        let j = i + 1;
        for (; j < n; j++) {
            const r = cond(a[j], j);
            if (r === stopCursorSymbol) cond = alwaysTrue;
            if (r) {
                a[i] = a[j];
                i++;
            }
        }
        a.length = i;
    }
    return a;
}

export function array_inplace_defrag_delete<T>(a: T[], index: number) {
    const n = a.length - 1;
    if (0 <= index && index <= n) {
        const t = a[index];
        a[index] = a[n];
        a.length = n;
        return t;
    }
    return undefined;
}

export function array_inplace_defrag_delete_value<T>(arr: T[], value: T) {
    const ix = arr.indexOf(value);
    if (ix < 0) {
        return false;
    }

    const newLen = arr.length - 1;
    if (ix < newLen) {
        arr[ix] = arr[newLen];
    }
    arr.length = newLen;
    return true;
}
