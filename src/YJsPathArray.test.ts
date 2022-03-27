import { expect } from "chai";
import { trimAll } from "./index.js";

const testData = {
    automobiles: [
        { maker: "Nissan", model: "Teana", year: 2011 },
        { maker: "Honda", model: "Jazz", year: 2010 },
        { maker: "Honda", model: "Civic", year: 2007 },
        { maker: "Toyota", model: "Yaris", year: 2008 },
        { maker: "Honda", model: "Accord", year: 2011 },
    ],
    motorcycles: [{ maker: "Honda", model: "ST1300", year: 2012 }],
};

describe("YJsPathArray.test.ts", () => {
    it("YJsPathArray - 1", () => {
        expect(trimAll(`\n123 abc \r\n  абв\t `)).to.deep.equal("123 abc абв");
    });
});
