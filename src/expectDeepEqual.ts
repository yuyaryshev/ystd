import { expect } from "chai";
import json5 from "json5";
const { stringify } = json5;

export function expectDeepEqual<T = unknown>(actual: T, expected: T) {
    try {
        expect(actual).to.deep.equal(expected);
    } catch (e) {
        console.log(`Actual res=\n${stringify(actual, undefined, 4)}`);
        throw e;
    }
}
