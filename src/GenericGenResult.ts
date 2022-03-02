/*
USAGE:
export interface TEMPLATE_GenResult {
    field1: string[];
    field2: string[];
    field3: string[];
    fieldOtherType: unknown[];
}

export function newTEMPLATE_GenResult(): TEMPLATE_GenResult {
    return {
        field1: [],
        field1: [],
        field1: [],
        fieldOtherType: [],
    };
}

// somewhere later 
const mergedResult = mergeGenResults(result1, result2);
*/

export interface GenericGenResult {
    [key: string]: unknown[];
}

export function appendGenResults<T extends GenericGenResult>(targetGenResult: T, ...genResults: T[]): T {
    for (const sourceGenResult of genResults) {
        for (let k in sourceGenResult) {
            const arr = genResults[0][k] || [];
            genResults[0][k] = arr;
            arr.push(...sourceGenResult[k]);
        }
    }
    return targetGenResult;
}

export function mergeGenResults<T extends GenericGenResult>(...genResults: T[]): T {
    const targetGenResult = {} as any as T;
    for (const sourceGenResult of genResults) {
        for (let k in sourceGenResult) {
            const arr = genResults[0][k] || [];
            genResults[0][k] = arr;
            arr.push(...sourceGenResult[k]);
        }
    }
    return targetGenResult;
}
