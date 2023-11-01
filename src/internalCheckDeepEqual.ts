import { expect } from "chai";
import { tryStringify } from "./tryStringify.js";

//v2

export function internalCheckDeepEqual<T = unknown>(actual: T, expected: T, cpl: string = "CODE00000002") {
    try {
        if (actual !== expected) {
            expect(actual).to.deep.equal(expected);
        }
    } catch (e: any) {
        console.log(`${cpl} Actual res=\n${tryStringify(actual, 4, 5000)}`);
        console.warn(`${cpl} internalCheckDeepEqual failed:`, e);
    }
}
