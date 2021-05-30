/**
 *
 */
export async function waitAll(...promises: Promise<any>[]) {
    for (const promise of promises) await promise;
}
