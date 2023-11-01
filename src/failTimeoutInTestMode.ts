import { globalObj } from "./globalObj.js";

export function isInTests() {
    const v = +(globalObj()?.process?.env?.TEST_HALT_TIMEOUT / 1000.0 || 0);
    if (v) {
        return true;
    }
    return false;
}

export function isInTestsTimeout(): number {
    return +(globalObj()?.process?.env?.TEST_HALT_TIMEOUT / 1000.0 || 0);
}

export function failTimeoutInTestMode() {
    const v = +(globalObj()?.process?.env?.TEST_HALT_TIMEOUT / 1000.0 || 0);
    if (v) {
        // @ts-ignore
        if (v < (process?.uptime() || 1000000000.0)) {
            console.trace(`CODE00000448 failTimeoutInTestMode`);
            throw new Error(`CODE00000449 Failing the test because running too long.`);
        }
    }
}

export function smallTimeoutInTests(n: number = 10) {
    const v = +(globalObj()?.process?.env?.TEST_HALT_TIMEOUT / 1000.0 || 0);
    if (v) {
        return n;
    }
    return undefined;
}
