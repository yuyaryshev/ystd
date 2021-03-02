import { expectThrow } from "./index";
import { Interval, IntervalArithmetic, IntervalPoint } from "Yintervals";
import { expect } from "chai";
import { emptyXOrder, SortedKey } from "XQueryCore";

let arithmetic = new IntervalArithmetic<number>();
let sortedKeyArithmetic = new IntervalArithmetic<SortedKey>(emptyXOrder.compiledCompare);
let toSortedKey = (v: number) => (v === Infinity || v === -Infinity ? v : [v]);

describe("IntervalArithmetic.ts", () => {
    it(`sortedKey arithmetic explicit checks`, () => {
        let t = (a: any, b: any, e: number) => {
            a = toSortedKey(a);
            b = toSortedKey(b);
            expect(sortedKeyArithmetic.compare(a, b)).equal(e);
            expect(sortedKeyArithmetic.compare(b, a)).equal(-e);
        };

        t(0, 0, 0);
        t(1, 1, 0);
        t(1, 2, -1);
        t(1, Infinity, -1);
        t(1, -Infinity, 1);
        t(Infinity, -Infinity, 1);
        t(Infinity, Infinity, 0);
        t(-Infinity, -Infinity, 0);
        t(-Infinity, "t99", -1);
        t(Infinity, "t99", 1);
    });

    it(`check numeric arithmetic`, () => {
        let t = (a: number, b: number, e: number) => {
            expect(arithmetic.compare(a, b)).equal(e);
            expect(arithmetic.compare(b, a)).equal(-e);
        };

        t(0, 0, 0);
        t(1, 1, 0);
        t(1, 2, -1);
        t(1, Infinity, -1);
        t(1, -Infinity, 1);
        t(Infinity, -Infinity, 1);
        t(Infinity, Infinity, 0);
        t(-Infinity, -Infinity, 0);
    });

    it(`sortedKey arithmetic yields to numeric`, () => {
        let t = (a: number, b: number) => {
            expect(sortedKeyArithmetic.compare(toSortedKey(a), toSortedKey(b))).to.equal(arithmetic.compare(a, b));
            expect(sortedKeyArithmetic.compare(toSortedKey(b), toSortedKey(a))).to.equal(arithmetic.compare(b, a));
        };

        t(0, 0);
        t(1, 1);
        t(1, 2);
        t(1, Infinity);
        t(1, -Infinity);
        t(Infinity, -Infinity);
        t(Infinity, Infinity);
        t(-Infinity, -Infinity);
    });

    it(`nextInterval`, () => {
        let ivs = [
            { a: { v: -Infinity, bias: 1 }, b: { v: 1, bias: 0 } },
            { a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } },
            { a: { v: 2, bias: 0 }, b: { v: 3, bias: -1 } },
            { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
            { a: { v: 3, bias: 1 }, b: { v: 5, bias: -1 } },
            { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
        ];
        let outerIntervals = [ivs[0], ivs[2], ivs[4]];

        let innerIntervals = [ivs[1], ivs[3], ivs[5]];
        let interval: Interval<number> | IntervalPoint<number> | undefined;

        let next = () => {
            let n = arithmetic.nextInterval(innerIntervals, true, interval);
            interval = n.nextInterval;
            return n;
        };
        let prev = () => {
            let n = arithmetic.nextInterval(innerIntervals, false, interval);
            interval = n.nextInterval;
            return n;
        };

        expect(next()).deep.equal({ nextInterval: ivs[0], inner: false });
        expect(next()).deep.equal({ nextInterval: ivs[1], inner: true });
        expect(next()).deep.equal({ nextInterval: ivs[2], inner: false });
        expect(next()).deep.equal({ nextInterval: ivs[3], inner: true });
        expect(next()).deep.equal({ nextInterval: ivs[4], inner: false });
        expect(next()).deep.equal({ nextInterval: ivs[5], inner: true });
        expect(next()).deep.equal({ nextInterval: undefined, inner: false });
        interval = undefined;

        expect(prev()).deep.equal({ nextInterval: ivs[5], inner: true });
        expect(prev()).deep.equal({ nextInterval: ivs[4], inner: false });
        expect(prev()).deep.equal({ nextInterval: ivs[3], inner: true });
        expect(prev()).deep.equal({ nextInterval: ivs[2], inner: false });
        expect(prev()).deep.equal({ nextInterval: ivs[1], inner: true });
        expect(prev()).deep.equal({ nextInterval: ivs[0], inner: false });
        expect(prev()).deep.equal({ nextInterval: undefined, inner: false });

        interval = { a: { v: 1.2, bias: 0 }, b: { v: 1.7, bias: 0 } };
        expect(next()).deep.equal({
            nextInterval: { a: { v: 1.7, bias: 1 }, b: ivs[1].b },
            inner: true,
        });

        interval = { a: { v: 1.2, bias: 0 }, b: { v: 1.7, bias: 0 } };
        expect(prev()).deep.equal({
            nextInterval: { a: ivs[1].a, b: { v: 1.2, bias: -1 } },
            inner: true,
        });

        interval = { v: 1.7, bias: 1 };
        expect(next()).deep.equal({
            nextInterval: { a: { v: 1.7, bias: 1 }, b: ivs[1].b },
            inner: true,
        });

        interval = { v: 1.2, bias: -1 };
        expect(prev()).deep.equal({
            nextInterval: { a: ivs[1].a, b: { v: 1.2, bias: -1 } },
            inner: true,
        });
    });

    it(`validateIntervals`, () => {
        arithmetic.validateIntervals([
            { a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } },
            { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
            { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
        ]);

        expectThrow(() => {
            arithmetic.validateIntervals([
                { a: { v: 1, bias: 1 }, b: { v: 2, bias: 1 } },
                { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
                { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
            ]);
        });

        expectThrow(() => {
            arithmetic.validateIntervals([
                { a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } },
                { a: { v: 6, bias: 0 }, b: { v: 6, bias: 0 } },
                { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
            ]);
        });
    });

    it(`compare`, () => {
        expect(arithmetic.compare(1, 2)).to.equal(-1);
        expect(arithmetic.compare(2, 1)).to.equal(1);
        expect(arithmetic.compare(1, 1)).to.equal(0);
    });

    it(`comparePoint`, () => {
        expect(arithmetic.comparePoint({ v: 1, bias: 0 }, { v: 1, bias: 1 })).to.equal(-1);
        expect(arithmetic.comparePoint({ v: 1, bias: 1 }, { v: 1, bias: -1 })).to.equal(1);
        expect(arithmetic.comparePoint({ v: 1, bias: 1 }, { v: 1, bias: 1 })).to.equal(0);
    });

    it(`minValue`, () => {
        expect(arithmetic.minValue(1, 2)).to.equal(1);
        expect(arithmetic.minValue(2, 1)).to.equal(1);
    });

    it(`maxValue`, () => {
        expect(arithmetic.maxValue(1, 2)).to.equal(2);
        expect(arithmetic.maxValue(2, 1)).to.equal(2);
    });

    it(`compareIntervalPoint`, () => {
        let interval = { a: { v: 1, bias: 1 }, b: { v: 20, bias: 0 } };
        expect(arithmetic.compareIntervalPoint(interval, { v: 0, bias: 0 })).to.equal(-1);
        expect(arithmetic.compareIntervalPoint(interval, { v: 1, bias: 0 })).to.equal(-1);
        expect(arithmetic.compareIntervalPoint(interval, { v: 10, bias: 0 })).to.equal(0);
        expect(arithmetic.compareIntervalPoint(interval, { v: 20, bias: 0 })).to.equal(0);
        expect(arithmetic.compareIntervalPoint(interval, { v: 20, bias: 1 })).to.equal(1);
        expect(arithmetic.compareIntervalPoint(interval, { v: 30, bias: 1 })).to.equal(1);
    });

    it(`containsPoint`, () => {
        let intervals = [
            { a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } },
            { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
            { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
        ];
        expect(arithmetic.containsPoint(intervals, { v: 2, bias: 0 })).to.equal(false);
        expect(arithmetic.containsPoint(intervals, { v: 3, bias: 0 })).to.equal(true);
        expect(arithmetic.containsPoint(intervals, { v: 4, bias: 0 })).to.equal(false);
        expect(arithmetic.containsPoint(intervals, { v: 6, bias: 0 })).to.equal(true);
    });

    it(`nextPoint`, () => {
        expect(arithmetic.nextPoint({ a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } }, true)).to.deep.equal({ v: 2, bias: 0 });
        expect(arithmetic.nextPoint({ a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } }, false)).to.deep.equal({ v: 1, bias: 0 });

        expect(arithmetic.nextPoint({ a: { v: 1, bias: 0 }, b: { v: 2, bias: 0 } }, true)).to.deep.equal({ v: 2, bias: 1 });
        expect(arithmetic.nextPoint({ a: { v: 1, bias: 0 }, b: { v: 2, bias: 0 } }, false)).to.deep.equal({ v: 1, bias: -1 });
    });

    it(`makeIntervFromValues`, () => {
        let symmetricCheck = (a: number, b: number, inclusiveA: boolean, inclusiveB: boolean) => {
            expect(arithmetic.makeIntervFromValues(a, b, inclusiveA, inclusiveB)).to.deep.equal({
                a: {
                    v: a,
                    bias: inclusiveA ? 0 : 1,
                },
                b: { v: b, bias: inclusiveB ? 0 : -1 },
            });
            expect(arithmetic.makeIntervFromValues(b, a, inclusiveB, inclusiveA)).to.deep.equal({
                a: {
                    v: a,
                    bias: inclusiveA ? 0 : 1,
                },
                b: { v: b, bias: inclusiveB ? 0 : -1 },
            });
        };

        symmetricCheck(1, 2, false, false);
        symmetricCheck(1, 2, true, true);
        symmetricCheck(-Infinity, Infinity, false, false);
        symmetricCheck(-Infinity, 1, false, true);
        symmetricCheck(1, Infinity, true, false);
        symmetricCheck(1, 1, true, true);
        expect(arithmetic.makeIntervFromValues(Infinity, -Infinity, true, true)).to.deep.equal({
            a: {
                v: -Infinity,
                bias: 1,
            },
            b: { v: Infinity, bias: -1 },
        });
    });

    it(`makeInterv`, () => {
        let symmetricCheck = (a: number, b: number, inclusiveA: boolean, inclusiveB: boolean) => {
            expect(
                arithmetic.makeInterv(
                    { v: a, bias: inclusiveA ? 0 : 1 },
                    {
                        v: b,
                        bias: inclusiveB ? 0 : -1,
                    },
                ),
            ).to.deep.equal({
                a: { v: a, bias: inclusiveA ? 0 : 1 },
                b: { v: b, bias: inclusiveB ? 0 : -1 },
            });
            expect(
                arithmetic.makeInterv(
                    { v: b, bias: inclusiveB ? 0 : -1 },
                    {
                        v: a,
                        bias: inclusiveA ? 0 : 1,
                    },
                ),
            ).to.deep.equal({
                a: { v: a, bias: inclusiveA ? 0 : 1 },
                b: { v: b, bias: inclusiveB ? 0 : -1 },
            });
        };

        symmetricCheck(1, 2, false, false);
        symmetricCheck(1, 2, true, true);
        symmetricCheck(-Infinity, Infinity, false, false);
        symmetricCheck(-Infinity, 1, false, true);
        symmetricCheck(1, Infinity, true, false);
        symmetricCheck(1, 1, true, true);
    });

    it(`getInfinity`, () => {
        expect(arithmetic.getInfinity(true)).to.equal(Infinity);
        expect(arithmetic.getInfinity(false)).to.equal(-Infinity);
    });

    it(`getInfinityPoint`, () => {
        expect(arithmetic.getInfinityPoint(true)).to.deep.equal({
            v: Infinity,
            bias: -1,
        });
        expect(arithmetic.getInfinityPoint(false)).to.deep.equal({
            v: -Infinity,
            bias: 1,
        });
    });

    it(`semiInterval`, () => {
        expect(arithmetic.semiInterval(1, true, true)).to.deep.equal({
            a: { v: 1, bias: 0 },
            b: { v: Infinity, bias: -1 },
        });
        expect(arithmetic.semiInterval(1, true, false)).to.deep.equal({
            a: { v: -Infinity, bias: 1 },
            b: { v: 1, bias: 0 },
        });
        expect(arithmetic.semiInterval(1, false, true)).to.deep.equal({
            a: { v: 1, bias: 1 },
            b: { v: Infinity, bias: -1 },
        });
        expect(arithmetic.semiInterval(1, false, false)).to.deep.equal({
            a: { v: -Infinity, bias: 1 },
            b: { v: 1, bias: -1 },
        });
    });

    it(`internalConsolidatePoints`, () => {
        expect(
            arithmetic.internalConsolidatePoints([
                {
                    intervals: [
                        { a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } },
                        { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
                        { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
                    ],
                    multiplier: 1,
                },
                {
                    intervals: [{ a: { v: 3, bias: 1 }, b: { v: 5, bias: -1 } }],
                    multiplier: 1,
                },
            ]),
        ).to.deep.equal([
            { v: 1, bias: 1, d: 1 },
            { v: 2, bias: -1, d: -1 },
            { v: 3, bias: 0, d: 1 },
            { v: 3, bias: 0, d: -1 },
            { v: 3, bias: 1, d: 1 },
            { v: 5, bias: -1, d: -1 },
            { v: 5, bias: 0, d: 1 },
            { v: Infinity, bias: -1, d: -1 },
        ]);

        expect(
            arithmetic.internalConsolidatePoints([
                {
                    intervals: [
                        { a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } },
                        { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
                        { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
                    ],
                    multiplier: 1,
                },
                {
                    intervals: [{ a: { v: 3, bias: 1 }, b: { v: 5, bias: -1 } }],
                    multiplier: -1,
                },
            ]),
        ).to.deep.equal([
            { v: 1, bias: 1, d: 1 },
            { v: 2, bias: -1, d: -1 },
            { v: 3, bias: 0, d: 1 },
            { v: 3, bias: 0, d: -1 },
            { v: 3, bias: 1, d: -1 },
            { v: 5, bias: -1, d: 1 },
            { v: 5, bias: 0, d: 1 },
            { v: Infinity, bias: -1, d: -1 },
        ]);
    });

    it(`internalConsolidatePoints`, () => {
        expect(
            arithmetic.internalConsolidateReduce(
                [
                    { v: 1, bias: 1, d: 1 },
                    { v: 2, bias: -1, d: -1 },
                    { v: 3, bias: 0, d: 1 },
                    { v: 3, bias: 0, d: -1 },
                    { v: 3, bias: 1, d: 1 },
                    { v: 5, bias: -1, d: -1 },
                    { v: 5, bias: 0, d: 1 },
                    { v: Infinity, bias: -1, d: -1 },
                ],
                0,
            ),
        ).to.deep.equal([{ a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } }, { a: { v: 3, bias: 0 }, b: { v: Infinity, bias: -1 } }]);
    });

    it(`union`, () => {
        expect(
            arithmetic.union(
                [
                    { a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } },
                    { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
                    { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
                ],
                [{ a: { v: 3, bias: 1 }, b: { v: 5, bias: -1 } }],
            ),
        ).to.deep.equal([{ a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } }, { a: { v: 3, bias: 0 }, b: { v: Infinity, bias: -1 } }]);
    });

    it(`intersect`, () => {
        expect(
            arithmetic.intersect([{ a: { v: 1, bias: 0 }, b: { v: 3, bias: 0 } }], [{ a: { v: 2, bias: 0 }, b: { v: 4, bias: 0 } }]),
        ).to.deep.equal([{ a: { v: 2, bias: 0 }, b: { v: 3, bias: 0 } }]);

        expect(
            arithmetic.intersect([{ a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } }], [{ a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } }]),
        ).to.deep.equal([{ a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } }]);

        expect(
            arithmetic.intersect(
                [
                    { a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } },
                    { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
                    { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
                ],
                [
                    { a: { v: 0, bias: 1 }, b: { v: 1, bias: -1 } },
                    { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
                    { a: { v: 4, bias: 0 }, b: { v: 5, bias: 0 } },
                ],
            ),
        ).to.deep.equal([{ a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } }, { a: { v: 5, bias: 0 }, b: { v: 5, bias: 0 } }]);
    });

    it(`invert`, () => {
        expect(arithmetic.invert([{ a: { v: 1, bias: 0 }, b: { v: 1, bias: 0 } }])).to.deep.equal([
            { a: { v: -Infinity, bias: 1 }, b: { v: 1, bias: -1 } },
            { a: { v: 1, bias: 1 }, b: { v: Infinity, bias: -1 } },
        ]);

        expect(
            arithmetic.invert([
                { a: { v: 1, bias: 1 }, b: { v: 2, bias: -1 } },
                { a: { v: 3, bias: 0 }, b: { v: 3, bias: 0 } },
                { a: { v: 5, bias: 0 }, b: { v: Infinity, bias: -1 } },
            ]),
        ).to.deep.equal([
            { a: { v: -Infinity, bias: 1 }, b: { v: 1, bias: 0 } },
            { a: { v: 2, bias: 0 }, b: { v: 3, bias: -1 } },
            { a: { v: 3, bias: 1 }, b: { v: 5, bias: -1 } },
        ]);
    });

    it(`exclude`, () => {
        expect(arithmetic.exclude([{ a: { v: 1, bias: 0 }, b: { v: 3, bias: 0 } }], [{ a: { v: 2, bias: 0 }, b: { v: 2, bias: 0 } }])).to.deep.equal([
            { a: { v: 1, bias: 0 }, b: { v: 2, bias: -1 } },
            { a: { v: 2, bias: 1 }, b: { v: 3, bias: 0 } },
        ]);
    });
});
