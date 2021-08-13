import { expect } from "chai";
import { ManualLRUCache } from "./ManualLRUCache.js";

describe.only(`ManualLRUCache.test.ts`, function () {
    it(`ManualLRUCache.test.ts - 1`, function () {
        const c = new ManualLRUCache(3);
        c.touchAll(1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 2, 1);
        expect(c.a).to.deep.equal([4, 5, 6, 7, 8, 9, 3, 2, 1]);
        expect(c.spliceExceeding()).to.deep.equal([4, 5, 6, 7, 8, 9]);
        expect(c.a).to.deep.equal([3, 2, 1]);
    });
});
