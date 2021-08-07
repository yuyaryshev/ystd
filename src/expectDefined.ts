export function expectDefined<T>(v: T, errorMessage: string): T {
    if (v === undefined) throw new Error(errorMessage);
    return v;
}
