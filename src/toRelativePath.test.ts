import { expect } from "chai";
import { toRelativePathOrKeep, toRelativePathOrUndefined } from "./toRelativePath.js";

describe("toRelativePath.test.ts", () => {
    it("toRelativePathOrUndefined", () => {
        expect(toRelativePathOrUndefined(`D:\\somePath`, `D:\\somePath\\someFile.js`)).to.deep.equal(`someFile.js`);
    });

    it("toRelativePathOrUndefined", () => {
        expect(toRelativePathOrUndefined(`D:\\somePath2`, `D:\\somePath\\someFile.js`)).to.deep.equal(undefined);
    });

    it("toRelativePathOrKeep", () => {
        expect(toRelativePathOrKeep(`D:\\somePath2`, `D:\\somePath\\someFile.js`)).to.deep.equal(`D:\\somePath\\someFile.js`);
    });
});
