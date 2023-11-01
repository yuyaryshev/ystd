import { expect } from "chai";
import { trimAll, tryStringify } from "./index.js";

describe("tryStringify.test", () => {
    it("tryStringify.test", () => {
        const obj: any = { a: 1, b: "bbb" };
        obj.c = { obj };
        expect(tryStringify(obj)).to.deep.equal("{a:1,b:'bbb',c:{obj:'[Circular]'}}");
    });
});
