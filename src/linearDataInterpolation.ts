import { isNumber } from "./isNumber.js";

export interface AnimatedDataItem {
    ms: number; // delay in milliseconds
    [key: string]: any;
}

/**
 *
 */
export function linearDataInterpolation<T extends AnimatedDataItem>(items: T[], timePos: number = new Date().getTime(), timeScale: number = 1): T {
    if (items.length === 1) return items[0];

    if (items.length < 2) throw new Error(`CODE00000266 Can only animate if have more than 2 items in array`);

    let total: number = 0;
    for (const item of items) total += item.ms * timeScale;

    const m = timePos % total;
    let current = 0;
    for (let bb = 0; bb <= items.length; bb++) {
        const ra = current - m;
        const b = items[bb < items.length ? bb : 0];
        if (ra >= 0) {
            let aa = bb - 1;
            if (aa < 0) aa = items.length - 1;
            const a = items[aa];
            const rb = a.ms * timeScale - ra;
            const r = { ...a, ...b };
            r.ms = 0;
            for (const k in r) {
                if (isNumber(r[k])) {
                    (r as any)[k] = (ra * a[k] + rb * b[k]) / (a.ms * timeScale);
                }
            }
            return r;
        }
        current += b.ms * timeScale;
    }

    throw new Error(`CODE00000267 Animated data internal error - should be unreachable!`);
}
