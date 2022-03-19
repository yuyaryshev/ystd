import { expect } from "chai";
import { expectThrow, trimAll } from "./index.js";
import { splitParse } from "./splitParse.js";

describe("splitParse.test.ts", () => {
    it("splitParse - success", () => {
        expect(splitParse("11 22  -> 33 44 : 555", "a b -> c d :e")).to.deep.equal({ a: "11", b: "22", c: "33", d: "44", e: "555" });
    });

    it("splitParse - fail", () => {
        expectThrow(() => {
            splitParse("11 22  -> 33 44", "a b -> c d :e");
        });
    });
});
