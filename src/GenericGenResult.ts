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

// export function genResultValueType(v: unknown): "array" | "object" | "string" {
//     if (Array.isArray(v)) {
//         return "array";
//     }
//
//     const tp = typeof v;
//     switch (tp) {
//         case "object":
//             if (tp.constructor.name !== "Object") {
//                 throw new Error(`CODE00000221 GenResult can contain plain-objects only!`);
//             }
//             return "object";
//         case "string":
//             return tp;
//     }
//
//     throw new Error(`CODE00000222 Unexpected ResultValueType!`);
// }
//
// export function expectMatchingGenResultTypes<T>(a: T | undefined, b: T | undefined) {
//     const aType = a !== undefined ? genResultValueType(a) : undefined;
//     const bType = b !== undefined ? genResultValueType(b) : undefined;
//     if (aType && bType && aType !== bType) {
//         throw new Error(`CODE000002230 ERROR GenResult type mismatch! ${aType} !== ${bType} `);
//     }
//     const r = aType || bType;
//     if (r === undefined) {
//         throw new Error(`CODE000002240 ERROR GenResult both arguments are undefined!`);
//     }
//     return r;
// }
// let DEBUG_GLOBAL_COUNTER03234 = 1;
export function appendGenResults<T>(targetGenResult: T, ...genResults: T[]): T {
    if (Array.isArray(targetGenResult)) {
        throw Error(`CODE00000225 appendGenResults expects an array of objects as targetGenResult, but got Array of Arrays!`);
    }

    for (const sourceGenResult of genResults) {
        for (let k in sourceGenResult) {
            if (Array.isArray(sourceGenResult)) {
                throw Error(`CODE00000226 appendGenResults expects an array of objects as genResults, but got Array of Arrays!`);
            }

            if (sourceGenResult[k] === undefined) {
                continue;
            } else if (targetGenResult[k] === undefined) {
                targetGenResult[k] = sourceGenResult[k];
            } else {
                if (!Array.isArray(targetGenResult[k])) {
                    if (targetGenResult[k] !== sourceGenResult[k]) {
                        throw Error(
                            `CODE00000227 mergeGenResults can only merge array fields! But field '${k}' is not an array and has different values in different sources! Field value: ${JSON.stringify(
                                { v1: targetGenResult[k], v2: sourceGenResult[k] },
                            )}`,
                        );
                    }
                } else {
                    for (const valueToAdd of (sourceGenResult as any)[k]) {
                        if (Array.isArray(valueToAdd)) {
                            throw new Error(`CODE00000228 Aggregated value can't contain another array as an item!`);
                        }

                        if ((targetGenResult as any)[k].includes((targetGenResult as any)[k])) {
                            throw new Error(`CODE00000229 Can't add dublicate values!`);
                        }
                    }

                    try {
                        // console.log("DEBUG_GLOBAL_COUNTER03234 = ", DEBUG_GLOBAL_COUNTER03234++);
                        (targetGenResult as any)[k].push(...(sourceGenResult as any)[k]);
                    } catch (e: any) {
                        console.trace(`CODE00000230 appendGenResults failed!`, e);
                        (targetGenResult as any)[k].push(...(sourceGenResult as any)[k]); // retry for debug purposes
                    }
                }
            }
        }
    }
    return targetGenResult;
}

export function mergeGenResults<T extends GenericGenResult>(...genResults: T[]): T {
    return appendGenResults({} as any, ...genResults);
}
