export interface MakeParallelInput {
    ignoreErrors?: boolean;
}
export const makeParallel = (input?: MakeParallelInput) => {
    const { ignoreErrors } = input || {};
    const errors: Error[] = [];
    const promises: Promise<any>[] = [];
    const add = (promise_or_promises: Promise<any> | Promise<any>[]) => {
        if (Array.isArray(promise_or_promises)) for (const p of promise_or_promises) add(p);
        else
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
    };
    const wait = async () => {
        await Promise.all(promises);
        if (errors.length) throw errors[0];
    };
    return { add, wait };
};
