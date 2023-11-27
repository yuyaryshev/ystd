import { expectDeepEqual } from "./expectDeepEqual.js";
import { pushFirst } from "./pushFirst.js";

describe(`pushFirst`, function () {
    it(`pushFirst - first`, function () {
        const r = pushFirst([], "a");
        expectDeepEqual(r, ["a"]);
    });

    it(`pushFirst - undefined`, function () {
        const r = pushFirst([], undefined);
        expectDeepEqual(r, []);
    });

    it(`pushFirst - second`, function () {
        const r = pushFirst(["a"], "b");
        expectDeepEqual(r, ["a"]);
    });
});
