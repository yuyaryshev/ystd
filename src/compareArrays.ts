import { boolean } from "yuyaryshev-json-type-validation";

export interface CompareArraysResult<T> {
    same: T[];
    onlyInA: T[];
    onlyInB: T[];
    equals: boolean;
}

export function compareArrays<T>(a: T[], b: T[]): CompareArraysResult<T> {
    const same = new Set<T>();
    const onlyInA = new Set<T>(a);
    const onlyInB = new Set<T>(b);
    for (const ai of a) {
        if (onlyInB.has(ai)) {
            same.add(ai);
            onlyInA.delete(ai);
            onlyInB.delete(ai);
        }
    }

    const equals: boolean = onlyInA.size + onlyInB.size === 0;

    return {
        same: [...same],
        onlyInA: [...onlyInA],
        onlyInB: [...onlyInB],
        equals,
    };
}
