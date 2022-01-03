import { expect } from "chai";
import { isPlainWithNoLoops } from "./plainWithNoLoops.js";

class TestClass {
    x: any;
    constructor() {
        this.x = 1;
    }
}

describe("plainWithNoLoops.test.ts", () => {
    it("undefined", async () => {
        expect(isPlainWithNoLoops(undefined)).to.equal(true);
    });

    it("null", async () => {
        expect(isPlainWithNoLoops(null)).to.equal(true);
    });

    it("number 0", async () => {
        expect(isPlainWithNoLoops(0)).to.equal(true);
    });

    it("number decimal", async () => {
        expect(isPlainWithNoLoops(-0.1234)).to.equal(true);
    });

    it("infinite", async () => {
        expect(isPlainWithNoLoops(Infinity)).to.equal(false);
    });

    it("NaN", async () => {
        expect(isPlainWithNoLoops(Number.NaN)).to.equal(false);
    });

    it("boolean true", async () => {
        expect(isPlainWithNoLoops(true)).to.equal(true);
    });

    it("boolean false", async () => {
        expect(isPlainWithNoLoops(false)).to.equal(true);
    });

    it("string empty", async () => {
        expect(isPlainWithNoLoops("")).to.equal(true);
    });

    it("string non-empty", async () => {
        expect(isPlainWithNoLoops("abc")).to.equal(true);
    });

    it("Date with allowDate=false", async () => {
        expect(isPlainWithNoLoops(new Date("2000-01-01"), { allowDate: false })).to.equal(false);
    });

    it("Date with allowDate=true", async () => {
        expect(isPlainWithNoLoops(new Date("2000-01-01"), { allowDate: true })).to.equal(true);
    });

    it("Null with allowNull=false", async () => {
        expect(isPlainWithNoLoops(null, { allowNull: false })).to.equal(false);
    });

    it("Null with allowNull=true", async () => {
        expect(isPlainWithNoLoops(null, { allowNull: true })).to.equal(true);
    });

    it("Symbol with allowSymbol=false", async () => {
        expect(isPlainWithNoLoops(Symbol("testSymbol"), { allowSymbol: false })).to.equal(false);
    });

    it("Symbol with allowSymbol=true", async () => {
        expect(isPlainWithNoLoops(Symbol("testSymbol"), { allowSymbol: true })).to.equal(true);
    });

    it("string non-empty", async () => {
        expect(isPlainWithNoLoops("abc")).to.equal(true);
    });

    it("loop", async () => {
        const a: any = {};
        a.a = a;
        expect(isPlainWithNoLoops(a)).to.equal(false);
    });

    it("class", async () => {
        const a = new TestClass();
        expect(isPlainWithNoLoops(a)).to.equal(false);
    });

    it("function", async () => {
        const a = () => {};
        expect(isPlainWithNoLoops(a)).to.equal(false);
    });
});
