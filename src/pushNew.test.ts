import { expectDeepEqual } from "./expectDeepEqual.js";
import { pushNew } from "./pushNew.js";

describe(`pushNew`, function () {
    it(`pushNew - first`, function () {
        const r = pushNew([], "a");
        expectDeepEqual(r, ["a"]);
    });

    it(`pushNew - second`, function () {
        const r = pushNew(["a"], "b");
        expectDeepEqual(r, ["a", "b"]);
    });

    it(`pushNew - not new`, function () {
        const r = pushNew(["a", "b"], "a");
        expectDeepEqual(r, ["a", "b"]);
    });

    it(`pushNew - undefined`, function () {
        const r = pushNew(["a", "b"], undefined);
        expectDeepEqual(r, ["a", "b"]);
    });
});
