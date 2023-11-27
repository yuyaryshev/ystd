import { expectDeepEqual } from "./expectDeepEqual.js";
import { cplIncludes } from "./cplIncludes.js";

describe(`cplIncludes`, function () {
    it(`cplIncludes - many items`, function () {
        const r = cplIncludes("01234567", "CODE" + "77777788", "CODE" + "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - noprefix and code`, function () {
        const r = cplIncludes("01234567", "CODE" + "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - noprefix and codr`, function () {
        const r = cplIncludes("01234567", "CODR" + "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - noprefix and no prefix`, function () {
        const r = cplIncludes("01234567", "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - code and code`, function () {
        const r = cplIncludes("CODE" + "01234567", "CODE" + "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - code and codr`, function () {
        const r = cplIncludes("CODE" + "01234567", "CODR" + "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - code and no prefix`, function () {
        const r = cplIncludes("CODE" + "01234567", "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - codr and code`, function () {
        const r = cplIncludes("CODR" + "01234567", "CODE" + "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - codr and codr`, function () {
        const r = cplIncludes("CODR" + "01234567", "CODR" + "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - codr and no prefix`, function () {
        const r = cplIncludes("CODR" + "01234567", "01234567");
        expectDeepEqual(r, true);
    });

    it(`cplIncludes - false`, function () {
        const r = cplIncludes("01234567", "CODR" + "01234568");
        expectDeepEqual(r, false);
    });
});
