import { expectDeepEqual } from "./expectDeepEqual.js";
import { recursiveSearch } from "./recursiveSearch.js";

const newExampleObj = () => ({
    a: {
        b: { c: 3, d: 4 },
        e: 5,
        f: { g: 6, k: 7 },
        k: 9,
    },
});

describe.only(`recursiveSearch`, function () {
    it(`recursiveSearch - one value`, function () {
        const r = recursiveSearch(newExampleObj(), "d");
        expectDeepEqual(r, 4);
    });

    it(`recursiveSearch - two values`, function () {
        const r = recursiveSearch(newExampleObj(), "k");
        expectDeepEqual(r, 9);
    });

    it(`recursiveSearch - undefined`, function () {
        const r = recursiveSearch(newExampleObj(), "z");
        expectDeepEqual(r, undefined);
    });
});
