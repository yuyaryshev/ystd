import { expect } from "chai";
import { stringify } from "json5";

export function expectDeepEqual<T = unknown>(expected: T, actual: T) {
    try {
        expect(expected).to.deep.equal(actual);
    } catch (e) {
        console.log(`Actual res=\n${stringify(actual, undefined, 4)}`);
        throw e;
    }
}
