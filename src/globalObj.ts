/**
 *
 */
export function globalObj(): any {
    // @ts-ignore
    return typeof window === "undefined" ? global : window;
}
