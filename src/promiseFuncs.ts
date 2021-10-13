export type MaybePromise<T> = Promise<T> | T;
export type OptionalPromise<T> = Promise<T | undefined> | T | undefined;

export interface SavedPromise<T> {
    promise: Promise<T>;
    resolve: (v: T) => void;
    reject: (err: any) => void;
}

/**
 *
 */
export function makePromise<T>(): SavedPromise<T> {
    const r: SavedPromise<T> = {} as any;
    r.promise = new Promise((resolve, reject) => {
        r.resolve = resolve;
        r.reject = reject;
    });
    return r;
}

export type SavedPromiseArray<T> = Array<SavedPromise<T>>;

export function isPromise<T>(v: MaybePromise<T>): v is Promise<T> {
    return !!(typeof v === "object" && (v as any).then);
}

let maybePromiseDebug: boolean | undefined;
export function setMaybePromiseDebug(v: boolean | undefined) {
    maybePromiseDebug = v;
}

export function getMaybePromiseDebug() {
    return maybePromiseDebug;
}

export const maybePromiseApply = <S, R>(v: MaybePromise<S>, f: (v: S) => MaybePromise<R> | R): MaybePromise<R> => {
    // =================== maybePromiseDebug START ===================
    // if (maybePromiseDebug) {
    //     const v_isPromise = typeof v === "object" && (v as any).then ? 1 : 0;
    //     if (v_isPromise) {
    //         console.trace(`maybePromiseDebug CODE00000473 - maybePromiseApply isPromise=${v_isPromise}`);
    //     } else {
    //         console.log(`maybePromiseDebug CODE00000476 - maybePromiseApply isPromise=${v_isPromise}`);
    //     }
    // }
    // =================== maybePromiseDebug END =====================
    return typeof v === "object" && (v as any).then ? (async () => f(await v))() : f(v as any);
};
export const maybeAwait = maybePromiseApply;

export const maybeAwaitSequentalMap = <T, R>(array: T[], f: (v: T) => MaybePromise<R>): MaybePromise<R[]> => {
    let arrayResult = [];
    let i = 0;
    for (let i = 0; i < array.length; i++) {
        const r = f(array[i]);
        if (!isPromise(r)) {
            // =================== maybePromiseDebug START ===================
            // if (maybePromiseDebug) {
            //     console.log(`maybePromiseDebug CODE00000477 - maybeAwaitSequentalMap isPromise=0`);
            // }
            // =================== maybePromiseDebug END =====================
            if (r !== undefined) {
                arrayResult.push(r);
            }
        } else {
            // =================== maybePromiseDebug START ===================
            // if (maybePromiseDebug) {
            //     console.trace(`maybePromiseDebug CODE00000279 - maybeAwaitSequentalMap isPromise=1`);
            // }
            // =================== maybePromiseDebug END =====================
            return (async () => {
                const r2 = await r;
                i++;
                if (r2 !== undefined) {
                    arrayResult.push(r2);
                }
                for (; i < array.length; i++) {
                    const r3 = await f(array[i]);
                    if (r3 !== undefined) {
                        arrayResult.push(r3);
                    }
                }
                return arrayResult;
            })();
        }
    }
    return arrayResult;
};

export interface ReversePromise {
    cpl?: string;
    c: number;
    e?: Error;
    resolveItem: () => void;
    rejectItem: (e: Error) => void;
    promise: Promise<void>;
    resolvePromise: () => void;
    rejectPromise: (e: Error) => void;
}

export interface MakePromiseVoid {
    promise: Promise<void>;
    resolve: () => void;
    reject: (e: Error) => void;
}

export const makePromiseVoid = () => {
    const pthis: MakePromiseVoid = {
        promise: undefined as any,
        resolve: undefined as any,
        reject: undefined as any,
    };
    pthis.promise = new Promise((resolve, reject) => {
        pthis.resolve = resolve;
        pthis.reject = reject;
    });
    return pthis;
};

export const reversePromise = (c: number, cpl?: string) => {
    const pthis: ReversePromise = {
        c,
        promise: undefined as any,
        resolvePromise: undefined as any,
        rejectPromise: undefined as any,
        resolveItem: function resolveItem() {
            pthis.c--;
            if (pthis.c <= 0) {
                if (pthis.e) pthis.rejectPromise(pthis.e);
                else pthis.resolvePromise();
            }
        },
        rejectItem: function rejectItem(e: Error) {
            pthis.c--;
            if (!pthis.e) pthis.e = e;
            if (pthis.c <= 0) {
                if (pthis.e) pthis.rejectPromise(pthis.e);
                else pthis.resolvePromise();
            }
        },
    };

    pthis.promise = new Promise<void>((resolve, reject) => {
        pthis.resolvePromise = resolve;
        pthis.rejectPromise = reject;
    });

    if (c <= 0) pthis.resolvePromise();

    return pthis;
};

export const reversePromiseResolveItem = (reversePromise: ReversePromise | undefined) => {
    if (reversePromise) reversePromise.resolveItem();
};

export const reversePromiseRejectItem = (reversePromise: ReversePromise | undefined, e: Error) => {
    if (reversePromise) reversePromise.rejectItem(e);
    else throw e;
};

export function unnestMaybePromise<T>(v: MaybePromise<MaybePromise<T>>): MaybePromise<T> {
    return v as any;
}
