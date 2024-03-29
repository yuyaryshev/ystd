export type MaybePromise<T> = Promise<T> | T;
export type OptionalPromise<T> = Promise<T | undefined> | T | undefined;

export interface SavedPromise<T> {
    promise: Promise<T>;
    resolve: (v: T) => void;
    reject: (err: any) => void;
}

export function isSavedPromise<T = unknown>(x: unknown): x is SavedPromise<T> {
    return !!(x && (x as any).promise);
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

/**
 * Usage:
 * return maybeAwait(maybePromiseValue, callbackWhenItsResolved);     // return is MADANTORY here!
 *
 * Whats the difference between this and just await? The difference is that maybeAwait WILL resolve syncroniously
 * if possible, async/await - will never resolve syncroniously. Async function will always return a Promise.
 *
 * Example:
 * OLD CODE: const foo = async ()=> { const data = await getCachedDataOrCallAPI(); console.log(data); return data; };
 * foo will always return Promise, even if data was cached and is available
 *
 * NEW CODE: const baz = ()=> { return maybeAwait(getCachedDataOrCallAPI(), data => { console.log(data); return data; }); };
 * The first return is MADANTORY here!
 * baz will return data (not Promise) if data was cached. And will return Promise if data wasn't cached.
 *
 * So new code can be called from React:
 * <div>{baz()?.field1}</div>
 *
 * And also the same 'baz' can be called with await if needed:
 * (await baz()).field1
 */
export const maybeAwait = <S, R>(v: MaybePromise<S>, f: (v: S) => MaybePromise<R>): MaybePromise<R> => {
    // =================== maybePromiseDebug START ===================
    // if (maybePromiseDebug) {
    //     const v_isPromise = typeof v === "object" && (v as any).then ? 1 : 0;
    //     if (v_isPromise) {
    //         console.trace(`maybePromiseDebug CODE00000197 - maybePromiseApply isPromise=${v_isPromise}`);
    //     } else {
    //         console.log(`maybePromiseDebug CODE00000198 - maybePromiseApply isPromise=${v_isPromise}`);
    //     }
    // }
    // =================== maybePromiseDebug END =====================
    return typeof v === "object" && (v as any).then ? (async () => f(await v))() : f(v as any);
};
export const maybePromiseApply = maybeAwait;

export const syncMaybeAwait = <S, R>(v: S, f: (v: S) => R): R => {
    // =================== maybePromiseDebug START ===================
    // if (maybePromiseDebug) {
    //     const v_isPromise = typeof v === "object" && (v as any).then ? 1 : 0;
    //     if (v_isPromise) {
    //         console.trace(`maybePromiseDebug CODE00000199 - maybePromiseApply isPromise=${v_isPromise}`);
    //     } else {
    //         console.log(`maybePromiseDebug CODE00000200 - maybePromiseApply isPromise=${v_isPromise}`);
    //     }
    // }
    // =================== maybePromiseDebug END =====================
    if (typeof v === "object" && (v as any).then) {
        throw new Error(`CODE00000201 syncMaybeAwait expects initalAccumulator to be a value, not a Promise`);
    }
    return f(v as any);
};

export type MaybePromiseFunc<T = unknown> = () => MaybePromise<T>;
export const maybeAwaitAll = <R, T = unknown>(
    maybePromises: (MaybePromise<T> | MaybePromiseFunc<T>)[],
    f: (resolvedPromises: T[]) => MaybePromise<R>,
): MaybePromise<R> => {
    // =================== maybePromiseDebug START ===================
    // if (maybePromiseDebug) {
    //     const v_isPromise = typeof v === "object" && (v as any).then ? 1 : 0;
    //     if (v_isPromise) {
    //         console.trace(`maybePromiseDebug CODE00000202 - maybePromiseApply isPromise=${v_isPromise}`);
    //     } else {
    //         console.log(`maybePromiseDebug CODE00000203 - maybePromiseApply isPromise=${v_isPromise}`);
    //     }
    // }
    // =================== maybePromiseDebug END =====================
    const resolvedPromises: T[] = [];
    let i = 0;
    for (let i = 0; i < maybePromises.length; i++) {
        if (typeof maybePromises[i] === "function") {
            maybePromises[i] = (maybePromises[i] as MaybePromiseFunc<T>)();
        }
        if (isPromise(maybePromises[i])) {
            return (async () => {
                resolvedPromises.push(await (maybePromises[i] as MaybePromise<T>));
                i++;
                for (; i < maybePromises.length; i++) {
                    if (typeof maybePromises[i] === "function") {
                        maybePromises[i] = (maybePromises[i] as MaybePromiseFunc<T>)();
                    }
                    resolvedPromises.push(await (maybePromises[i] as MaybePromise<T>));
                }
                return await f(resolvedPromises);
            })();
        } else {
            resolvedPromises.push(maybePromises[i] as T);
        }
    }
    return f(resolvedPromises);
};

export const maybeAwaitSequentalMap = <T, R>(array: T[], f: (v: T) => MaybePromise<R>): MaybePromise<R[]> => {
    let arrayResult = [];
    let i = 0;
    for (let i = 0; i < array.length; i++) {
        const r = f(array[i]);
        if (!isPromise(r)) {
            // =================== maybePromiseDebug START ===================
            // if (maybePromiseDebug) {
            //     console.log(`maybePromiseDebug CODE00000204 - maybeAwaitSequentalMap isPromise=0`);
            // }
            // =================== maybePromiseDebug END =====================
            if (r !== undefined) {
                arrayResult.push(r);
            }
        } else {
            // =================== maybePromiseDebug START ===================
            // if (maybePromiseDebug) {
            //     console.trace(`maybePromiseDebug CODE00000205 - maybeAwaitSequentalMap isPromise=1`);
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

export const maybeAwaitReduce = <A>(
    initalAccumulator: MaybePromise<A>,
    f: (accumulator: A, index: number) => MaybePromise<[A, boolean | undefined]>,
): MaybePromise<A> => {
    let index = 0;
    if (isPromise(initalAccumulator)) {
        return (async () => {
            let accumulator: A = await initalAccumulator;
            while (true) {
                const r3 = await f(accumulator, index);
                index++;
                accumulator = r3[0];
                if (!r3[1]) {
                    return accumulator;
                }
            }
        })();
    }

    let accumulator: A = initalAccumulator;
    let i = 0;
    while (true) {
        const r = f(accumulator, index);
        index++;
        if (isPromise(r)) {
            return (async () => {
                const rr = await r;
                accumulator = rr[0];
                if (!rr[1]) {
                    return accumulator;
                }
                while (true) {
                    const r3 = await f(accumulator, index);
                    index++;
                    accumulator = r3[0];
                    if (!r3[1]) {
                        return accumulator;
                    }
                }
            })();
        }

        accumulator = r[0];
        if (!r[1]) {
            return accumulator;
        }
    }
};

export const syncMaybeAwaitReduce = <A>(initalAccumulator: A, f: (accumulator: A, index: number) => [A, boolean | undefined]): A => {
    let index = 0;
    if (isPromise(initalAccumulator)) {
        throw new Error(`CODE00000206 syncMaybeAwaitReduce expects initalAccumulator to be a value, not a Promise`);
    }

    let accumulator: A = initalAccumulator;
    let i = 0;
    while (true) {
        const r = f(accumulator, index);
        index++;
        if (isPromise(r)) {
            throw new Error(`CODE00000207 syncMaybeAwaitReduce expects callback return value to be a value, not a Promise`);
        }

        accumulator = r[0];
        if (!r[1]) {
            return accumulator;
        }
    }
};

export const maybeAwaitWhile = <T>(
    f: (index: number, prevR: T | undefined) => MaybePromise<T | undefined>,
    a?: T | undefined,
): MaybePromise<void> => {
    let index = 0;
    while (true) {
        const r = f(index++, a);
        if (isPromise(r)) {
            return (async () => {
                a = await r;
                while (await f(index++, a)) {}
            })();
        }
        if (r === undefined) {
            return;
        }
        a = r;
    }
};

export const maybeAwaitSeries = (r: any, ...callbacks: ((p: any) => MaybePromise<any>)[]): MaybePromise<void> => {
    let i = 0;
    for (; i < callbacks.length; i++) {
        r = callbacks[i](r);
        if (isPromise(r)) {
            i++;
            return (async () => {
                for (; i < callbacks.length; i++) {
                    r = callbacks[i](await r);
                }
                return await r;
            })();
        }
    }
    return r;
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

/**
 * If 'MaybePromise' is a Promise returns undefined. Returns value otherwise.
 * @param v - MaybePromise<T>
 */
export const maybeValue = <T>(v: MaybePromise<T>): T | undefined => (isPromise(v) ? undefined : v);

export const maybePromiseAll = (...args: MaybePromise<any>[]): MaybePromise<void> => {
    const promises: Promise<void>[] = [];
    for (const arg of args) {
        if (isPromise(arg)) {
            promises.push(arg as Promise<any>);
        }
    }
    return promises.length ? (Promise.all(promises) as Promise<any>) : (undefined as any);
};

export const maybeAwaitForeach = <T, R>(
    iterable: Iterable<T> | AsyncIterable<T>,
    body: (a: T) => MaybePromise<void>,
    finalizer?: () => MaybePromise<R>,
): MaybePromise<R> => {
    // @ts-ignore
    const cursor = iterable[Symbol.iterator]?.() || iterable[Symbol.asyncIterator]?.();

    let cursorResult;
    while (true) {
        let cursorResult = cursor.next();
        if (!isPromise(cursorResult)) {
            if (cursorResult.done) {
                if (finalizer) {
                    return finalizer();
                } else {
                    return undefined as any;
                }
            }

            let bodyResult = body(cursorResult.value);
            if (isPromise(bodyResult)) {
                return (async () => {
                    //  Become async because of body
                    await bodyResult;
                    while (true) {
                        let cursorResultAwaited = await cursor.next();
                        if ((await cursorResultAwaited).done) {
                            if (finalizer) {
                                return await finalizer();
                            } else {
                                return undefined as any;
                            }
                            break;
                        }
                        await body(cursorResultAwaited.value);
                    }
                })();
            }
        } else {
            return (async () => {
                //  Become async because of cursor
                let cursorResultAwaited = await cursorResult;
                while (!(await cursorResultAwaited).done) {
                    await body(cursorResultAwaited.value);
                    cursorResultAwaited = await cursor.next();
                }
                if (finalizer) {
                    return await finalizer();
                } else {
                    return undefined as any;
                }
            })();
        }
    }
};
