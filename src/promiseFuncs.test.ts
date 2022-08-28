import { expect } from "chai";
import { strPosConverter, strPosToRC, strRCToPos } from "./strPosToRC.js";
import { awaitDelay } from "./awaitDelay.js";
import { isPromise, maybeAwaitSequentalMap, maybeAwaitSeries, MaybePromise } from "./promiseFuncs.js";

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

    it("maybeAwaitSeries - 1", async () => {
        function f1(x: number) {
            return maybeAwaitSeries(
                x,
                (a: number) => {
                    return a + 10;
                },
                (a: number) => {
                    return a + 100;
                },
                (a: number) => {
                    return a + 1000;
                },
            );
        }

        const rr = f1(1);
        expect(rr).to.deep.equal(1111);
    });

    it("maybeAwaitSeries - 2", async () => {
        function f1(x: number) {
            return maybeAwaitSeries(
                x,
                (a: number) => {
                    return a + 10;
                },
                async (a: number) => {
                    return a + 100;
                },
                (a: number) => {
                    return a + 1000;
                },
            );
        }

        const rr = await f1(1);
        expect(rr).to.deep.equal(1111);
    });
});
