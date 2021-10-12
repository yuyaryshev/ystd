import { expect } from "chai";
import { strPosConverter, strPosToRC, strRCToPos } from "./strPosToRC.js";
import { awaitDelay } from "./awaitDelay.js";
import { isPromise, maybeAwaitSequentalMap, MaybePromise } from "./promiseFuncs.js";

describe("promiseFuncs.test.ts", () => {
    const f1 = (item: string): MaybePromise<string> => {
        if (item.length > 1) {
            return (async () => {
                await awaitDelay(0);
                return item + "-P";
            })();
        }
        return item + "-p";
    };

    it("maybeAwaitSequentalMap - promise", async () => {
        const items = ["a", "bb", "c"];

        const r = maybeAwaitSequentalMap(items, f1);
        const r2 = await r;
        expect(r2).to.deep.equal(["a-p", "bb-P", "c-p"]);

        expect(isPromise(r)).to.equal(true);
    });

    it("maybeAwaitSequentalMap - NO promise", async () => {
        const items = ["a", "b", "c"];

        const r = maybeAwaitSequentalMap(items, f1);
        const r2 = r;
        expect(r2).to.deep.equal(["a-p", "b-p", "c-p"]);
        expect(isPromise(r)).to.equal(false);
    });
});
