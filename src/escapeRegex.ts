// Code from https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
/**
 *
 */
export function escapeRegex(s: string) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
