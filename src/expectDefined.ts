export function expectDefined<T>(v: T | null | undefined, errorMessage?: string): T {
    if (v === undefined || v === null) {
        throw new Error(errorMessage || "CODE00000476 Error: expectDefined - failed!");
    }
    return v;
}

export function expectDefinedF(errorMessage0: string = "CODE00000287 Error: expectDefined - failed!") {
    return function expectDefined<T>(v: T | null | undefined, errorMessage: string = errorMessage0): T {
        if (v === undefined || v === null) {
            throw new Error(errorMessage || "CODE00000288 Error: expectDefined - failed!");
        }
        return v;
    };
}

// aliases
export const throwIfUndefined = expectDefined;
export const throwIfUndefinedF = expectDefinedF;
