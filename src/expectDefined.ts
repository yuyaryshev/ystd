export function expectDefined<T>(v: T | null | undefined, errorMessage?: string): T {
    if (v === undefined || v === null) {
        throw new Error(errorMessage || "CODE00000107 Error: expectDefined - failed!");
    }
    return v;
}

export function expectDefinedF(errorMessage0: string = "CODE00000108 Error: expectDefined - failed!") {
    return function expectDefined<T>(v: T | null | undefined, errorMessage: string = errorMessage0): T {
        if (v === undefined || v === null) {
            throw new Error(errorMessage || "CODE00000109 Error: expectDefined - failed!");
        }
        return v;
    };
}

// aliases
export const throwIfUndefined = expectDefined;
export const throwIfUndefinedF = expectDefinedF;
