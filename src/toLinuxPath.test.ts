import { expect } from "chai";
import { toLinuxPathLowerCase, toLinuxPathKeepCase } from "./toLinuxPath.js";

describe("toLinuxPath.test.ts", () => {
    it("toLinuxPathLowerCase", () => {
        expect(toLinuxPathLowerCase(`123`)).to.deep.equal("123");
        expect(toLinuxPathLowerCase(`D:\\somePath`)).to.deep.equal("/d/somepath");
    });
    it("toLinuxPathKeepCase", () => {
        expect(toLinuxPathKeepCase(`123`)).to.deep.equal("123");
        expect(toLinuxPathKeepCase(`D:\\somePath`)).to.deep.equal("/D/somePath");
    });
});
