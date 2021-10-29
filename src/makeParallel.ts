import { maybeAwait, MaybePromise } from "./promiseFuncs.js";

export interface MakeParallelInput {
    ignoreErrors?: boolean;
}

export type ParallelAddInputItem = Promise<any> | void | undefined;

export const makeParallel = (input?: MakeParallelInput) => {
    const { ignoreErrors } = input || {};
    const errors: Error[] = [];
    const promises: Promise<any>[] = [];
    const add = (promise_or_promises: ParallelAddInputItem | ParallelAddInputItem[]) => {
        if (Array.isArray(promise_or_promises)) for (const p of promise_or_promises) add(p);
        else {
            if (promise_or_promises !== undefined && promise_or_promises.then) {
                promises.push(
                    (async () => {
                        try {
                            await promise_or_promises;
                        } catch (e: any) {
                            if (!ignoreErrors) {
                                errors.push(e);
                            }
                        }
                    })(),
                );
            }
        }
    };
    const wait = (): MaybePromise<void> => {
        if (promises.length) {
            (async () => {
                await Promise.all(promises);
                if (errors.length) throw errors[0];
            })();
        }
    };
    const clear = () => {
        promises.length = 0;
        errors.length = 0;
    };
    const waitAndClear = () => {
        return maybeAwait(wait(), (unused) => {
            clear();
        });
    };
    return { add, wait, clear, waitAndClear };
};
