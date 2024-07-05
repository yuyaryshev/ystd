import { maybeAwait, MaybePromise } from "./promiseFuncs.js";

export interface MakeParallelInput {
    ignoreErrors?: boolean;
}

export interface PromisesContainer {
    add<T = any>(promise_or_promises: T): T;
    delete<T = any>(promise_or_promises: any): T;
    remove<T = any>(promise_or_promises: any): T;
    wait(): MaybePromise<void>; // Same as waitAll
    waitCurrent(): MaybePromise<void>;
    waitAll(): MaybePromise<void>;
    clear(): void;
    waitAndClear(): MaybePromise<void>;
}

export const makeParallel = (input?: MakeParallelInput): PromisesContainer => {
    const { ignoreErrors } = input || {};
    const errors: Error[] = [];
    const promises: Promise<any>[] = [];
    const add = (promise_or_promises: any) => {
        if (Array.isArray(promise_or_promises)) for (const p of promise_or_promises) add(p);
        else {
            if (promise_or_promises !== undefined && promise_or_promises.then) {
                promises.push(
                    (async () => {
                        try {
                            await promise_or_promises;
                            remove(promise_or_promises);
                        } catch (e: any) {
                            if (!ignoreErrors) {
                                errors.push(e);
                            }
                        }
                    })(),
                );
            }
        }
        return promise_or_promises;
    };
    const remove = (promise_or_promises: any) => {
        if (Array.isArray(promise_or_promises)) for (const p of promise_or_promises) remove(p);
        else {
            if (promise_or_promises !== undefined && promise_or_promises.then) {
                const index = promises.indexOf(promise_or_promises);
                if (index >= 0) {
                    promises.splice(index, 1);
                }
            }
        }
        return promise_or_promises;
    };

    const waitCurrent = (): MaybePromise<void> => {
        if (promises.length) {
            return (async () => {
                await Promise.all(promises);
                if (errors.length) throw errors[0];
            })();
        }
    };

    const waitAll = (): MaybePromise<void> => {
        (async () => {
            while (promises.length) {
                for (let p of promises) {
                    await p;
                }
            }
        })();
    };
    const clear = () => {
        promises.length = 0;
        errors.length = 0;
    };
    const waitAndClear = () => {
        return maybeAwait(waitCurrent(), (unused) => {
            clear();
        });
    };
    return { add, delete: remove, remove, wait: waitAll, waitCurrent, waitAll, clear, waitAndClear };
};
export const newPromisesContainer = makeParallel;
export const makePromisesContainer = makeParallel;
