import { expect } from "chai";
import { trimAll } from "./index.js";

describe("trimAll", () => {
    it("trimAll", () => {
        expect(trimAll(`123`)).to.deep.equal("123");
        expect(trimAll(`123 abc абвx`)).to.deep.equal("123 abc абвx");
        expect(trimAll(` 123 abc   абв `)).to.deep.equal("123 abc абв");
        expect(trimAll(`\n123 abc \r\n  абв\t `)).to.deep.equal("123 abc абв");
    });
});
