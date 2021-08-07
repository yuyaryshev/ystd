import { expect } from "chai";
import { array_inplace_defrag_delete, array_inplace_filter } from "./array_inplace_delete.js";

describe.only(`array_inplace_delete`, function () {
    it(`array_strict_delete - 1`, function () {
        expect(array_inplace_filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], (x) => !(3 <= x && x <= 5)).join("\n")).to.deep.equal(
            [0, 1, 2, 6, 7, 8, 9].join("\n"),
        );
    });

    it(`array_strict_delete - 2`, function () {
        expect(array_inplace_filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], (x) => !!(3 <= x && x <= 5)).join("\n")).to.deep.equal([3, 4, 5].join("\n"));
    });

    it(`array_strict_delete - 3`, function () {
        expect(array_inplace_filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], (x) => false).join("\n")).to.deep.equal([].join("\n"));
    });

    it(`array_strict_delete - 4`, function () {
        expect(array_inplace_filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], (x) => true).join("\n")).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].join("\n"));
    });

    it(`array_strict_delete - 5`, function () {
        expect(array_inplace_filter([], (x) => true).join("\n")).to.deep.equal([].join("\n"));
    });

    it(`array_inplace_defrag_delete - 1`, function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        array_inplace_defrag_delete(a, 5);
        expect(a.join("\n")).to.deep.equal([0, 1, 2, 3, 4, 9, 6, 7, 8].join("\n"));
    });

    it(`array_inplace_defrag_delete - 2`, function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        array_inplace_defrag_delete(a, 0);
        expect(a.join("\n")).to.deep.equal([9, 1, 2, 3, 4, 5, 6, 7, 8].join("\n"));
    });

    it(`array_inplace_defrag_delete - 3`, function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        array_inplace_defrag_delete(a, 9);
        expect(a.join("\n")).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8].join("\n"));
    });

    it(`array_inplace_defrag_delete - 4`, function () {
        const a: number[] = [];
        expect(array_inplace_defrag_delete(a, 1)).to.equal(undefined);
        expect(a.join("\n")).to.deep.equal([].join("\n"));
    });

    it(`array_inplace_defrag_delete - 5`, function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(array_inplace_defrag_delete(a, -1)).to.equal(undefined);
        expect(a.join("\n")).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].join("\n"));
    });

    it(`array_inplace_defrag_delete - 6`, function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(array_inplace_defrag_delete(a, 10)).to.equal(undefined);
        expect(a.join("\n")).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].join("\n"));
    });
});
