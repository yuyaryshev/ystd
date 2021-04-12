export function globalObj() {
    return typeof window === "undefined" ? global : window;
}
