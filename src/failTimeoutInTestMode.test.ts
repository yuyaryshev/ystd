import { expect } from "chai";
import { failTimeoutInTestMode } from "./failTimeoutInTestMode.js";
import { globalObj } from "./globalObj.js";

describe("failTimeoutInTestMode", () => {
    it("failTimeoutInTestMode - no throw", () => {
        failTimeoutInTestMode();
    });
    it("failTimeoutInTestMode - throw", () => {
        if (globalObj()?.process?.env) {
            globalObj().process.env.TEST_HALT_TIMEOUT = 1;

            expect(() => {
                failTimeoutInTestMode();
            }).to.throw();
        }
    });
});
