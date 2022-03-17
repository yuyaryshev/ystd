import { expect } from "chai";
import { aggToMap, aggToObject, byTAggregator } from "./aggTo.js";

describe(`aggTo`, function () {
    it(`aggToObject`, function () {
        const r = aggToObject(
            [
                { t: "a", id: 1 },
                { t: "a", id: 2 },
                { t: "b", id: 3 },
                { t: "a", id: 4 },
                { t: "c", id: 5 },
                { t: "c", id: 6 },
            ],
            byTAggregator,
        );
        // console.log(JSON.stringify(r));
        expect(r).to.deep.equal({
            a: [
                { t: "a", id: 1 },
                { t: "a", id: 2 },
                { t: "a", id: 4 },
            ],
            b: [{ t: "b", id: 3 }],
            c: [
                { t: "c", id: 5 },
                { t: "c", id: 6 },
            ],
        });
    });

    it(`aggToMap`, function () {
        const r = aggToMap(
            [
                { t: "a", id: 1 },
                { t: "a", id: 2 },
                { t: "b", id: 3 },
                { t: "a", id: 4 },
                { t: "c", id: 5 },
                { t: "c", id: 6 },
            ],
            byTAggregator,
        );

        console.log(JSON.stringify([...r.entries()]));
        expect([...r.entries()]).to.deep.equal([
            [
                "a",
                [
                    { t: "a", id: 1 },
                    { t: "a", id: 2 },
                    { t: "a", id: 4 },
                ],
            ],
            ["b", [{ t: "b", id: 3 }]],
            [
                "c",
                [
                    { t: "c", id: 5 },
                    { t: "c", id: 6 },
                ],
            ],
        ]);
    });
});
