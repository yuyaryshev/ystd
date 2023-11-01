/**
 *
 */
export function awaitDelay(ms: number) {
    return new Promise((resolve: any) => {
        setTimeout(resolve, ms);
    });
}

export async function awaitForCondition(condition: () => boolean, timeout: number, waitStep: number = 10) {
    for (let i = 0; i < timeout; i += waitStep) {
        if (condition()) {
            return;
        }
        await awaitDelay(waitStep);
    }
    throw new Error(`CODE00000441 awaitForCondition timed out!`);
}
