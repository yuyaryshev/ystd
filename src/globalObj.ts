/**
 *
 */
export function globalObj(): any {
    return typeof window === "undefined" ? global : window;
}
