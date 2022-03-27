import { expect } from "chai";
import { trimAll } from "./index.js";
import { newYJsPathSet } from "./YJsPathSet.js";

const testData = () => ({
    t: "TestData",
    automobiles: [
        {
            t: "Automobile",
            maker: "Nissan",
            model: "Teana",
            year: 2011,
            orders: [
                { t: "order", orderNo: 101 },
                { t: "order", orderNo: 102 },
            ],
        },
        { t: "Automobile", maker: "Honda", model: "Jazz", year: 2010, orders: [{ t: "order", orderNo: 103 }] },
        { t: "Automobile", maker: "Honda", model: "Civic", year: 2007, orders: [] },
        {
            t: "Automobile",
            maker: "Toyota",
            model: "Yaris",
            year: 2008,
            orders: [
                { t: "order", orderNo: 105 },
                { t: "order", orderNo: 106 },
            ],
        },
        { t: "Automobile", maker: "Honda", model: "Accord", year: 2011 },
    ],
    motorcycles: [{ t: "Motorcycle", maker: "Honda", model: "ST1300", year: 2012 }],
});

// console.log(JSON.stringify(r, undefined, "    "));
describe("YJsPathSet.test.ts", () => {
    it("YJsPathSet.asArray - 1", () => {
        const r = newYJsPathSet({ x: 123 }).asArray();
        expect(r).to.deep.equal([{ x: 123 }]);
    });

    it("YJsPathSet.asArray - 2", () => {
        const r = newYJsPathSet([1, 2, 3]).asArray();
        expect(r).to.deep.equal([1, 2, 3]);
    });

    it("YJsPathSet.property", () => {
        const r = newYJsPathSet(testData()).property("motorcycles").asArray();
        expect(r).to.deep.equal([{ t: "Motorcycle", maker: "Honda", model: "ST1300", year: 2012 }]);
    });

    it("YJsPathSet.expectOne", () => {
        const r = newYJsPathSet(testData()).property("motorcycles").expectOne();
        expect(r).to.deep.equal({ t: "Motorcycle", maker: "Honda", model: "ST1300", year: 2012 });
    });

    it("YJsPathSet - complex query", () => {
        const r = newYJsPathSet(testData())
            .property("automobiles")
            .filter((a) => a.maker === "Honda" && a.year >= 2011)
            .expectOne();

        expect(r).to.deep.equal({
            t: "Automobile",
            maker: "Honda",
            model: "Accord",
            year: 2011,
        });
    });

    it("YJsPathSet.traverse", () => {
        const r = newYJsPathSet(testData())
            .traverse({ filter: (a) => a.t === "order" })
            .map((a) => a.orderNo)
            .asArray();
        expect(r).to.deep.equal([101, 102, 103, 105, 106]);
    });

    it("YJsPathSet.traverse with parent", () => {
        const r = newYJsPathSet(testData())
            .traverse({ filter: (a) => a.t === "order", parentFilter: (a) => !!a.t })
            .filter((a) => a.orderNo === 105)
            .expectOne();
        expect(r.parent.t).to.deep.equal("Automobile");
    });
});
