import { linearDataInterpolation } from "./linearDataInterpolation.js";

const data = [
    {
        ms: 100,
        a: 10,
        b: 0,
    },
    {
        ms: 200,
        a: 20,
        b: 20,
    },
    {
        ms: 100,
        a: 30,
        b: 0,
    },
];
const times = [0, 100, 300, 400];

/**
 *
 */
function noMs(x: any) {
    const { ms, ...r } = x;
    return r;
}

describe(`linearDataInterpolation`, function () {
    it(`linearDataInterpolation - exact point 0`, function () {
        expect(noMs(linearDataInterpolation(data, times[0]))).toEqual(noMs(data[0]));
    });
    it(`linearDataInterpolation - exact point 1`, function () {
        expect(noMs(linearDataInterpolation(data, times[1]))).toEqual(noMs(data[1]));
    });
    it(`linearDataInterpolation - exact point 2`, function () {
        expect(noMs(linearDataInterpolation(data, times[2]))).toEqual(noMs(data[2]));
    });
    it(`linearDataInterpolation - exact point 3`, function () {
        expect(noMs(linearDataInterpolation(data, times[3]))).toEqual(noMs(data[0]));
    });
    it(`linearDataInterpolation - exact point 1 over loop`, function () {
        expect(noMs(linearDataInterpolation(data, times[3] + times[1]))).toEqual(noMs(data[1]));
    });

    it(`linearDataInterpolation - left point 0-1`, function () {
        expect(noMs(linearDataInterpolation(data, 1))).toEqual({
            a: 10.1,
            b: 0.2,
        });
    });

    it(`linearDataInterpolation - right point 0-1`, function () {
        expect(noMs(linearDataInterpolation(data, 99))).toEqual(
            noMs({
                a: 19.9,
                b: 19.8,
            }),
        );
    });

    it(`linearDataInterpolation - mid point 0-1`, function () {
        expect(noMs(linearDataInterpolation(data, 50))).toEqual(
            noMs({
                a: 15,
                b: 10,
            }),
        );
    });

    it(`linearDataInterpolation - left point 3-0`, function () {
        expect(noMs(linearDataInterpolation(data, 301))).toEqual(
            noMs({
                a: 29.8,
                b: 0,
            }),
        );
    });

    it(`linearDataInterpolation - right point 3-0`, function () {
        expect(noMs(linearDataInterpolation(data, 399))).toEqual(
            noMs({
                a: 10.2,
                b: 0,
            }),
        );
    });

    it(`linearDataInterpolation - mid point 3-0`, function () {
        expect(noMs(linearDataInterpolation(data, 350))).toEqual(
            noMs({
                a: 20,
                b: 0,
            }),
        );
    });
});
