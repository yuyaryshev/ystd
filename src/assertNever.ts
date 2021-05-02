/**
 *
 */
export function assertNever(x: never, msg?: string, data?:any): never {
    throw new Error("assertNever: Unexpected value: " + x + (msg?"\n"+ msg : ""));
}

/**
 *
 */
export function assertNeverNoThrow(x: never, msg?: string, data?:any): never {
    // @ts-ignore
    return;
}
