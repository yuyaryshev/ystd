export type CompareFunc<T> = <T = any>(a: T, b: T) => number;
export const defaultCompare = <T = any>(a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0);
