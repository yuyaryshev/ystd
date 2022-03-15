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
//                 throw new Error(`CODE00000290 GenResult can contain plain-objects only!`);
//             }
//             return "object";
//         case "string":
//             return tp;
//     }
//
//     throw new Error(`CODE00000291 Unexpected ResultValueType!`);
// }
//
// export function expectMatchingGenResultTypes<T>(a: T | undefined, b: T | undefined) {
//     const aType = a !== undefined ? genResultValueType(a) : undefined;
//     const bType = b !== undefined ? genResultValueType(b) : undefined;
//     if (aType && bType && aType !== bType) {
//         throw new Error(`CODE000002920 ERROR GenResult type mismatch! ${aType} !== ${bType} `);
//     }
//     const r = aType || bType;
//     if (r === undefined) {
//         throw new Error(`CODE000002930 ERROR GenResult both arguments are undefined!`);
//     }
//     return r;
// }

export function appendGenResults<T>(targetGenResult: T, ...genResults: T[]): T {
    for (const sourceGenResult of genResults) {
        for (let k in sourceGenResult) {
            if (sourceGenResult[k] === undefined) {
                continue;
            } else if (targetGenResult[k] === undefined) {
                targetGenResult[k] = sourceGenResult[k];
            } else {
                if (!Array.isArray(targetGenResult[k])) {
                    throw Error(
                        `CODE00000185 mergeGenResults can only merge array fields! But field '${k}' is not an array! Field value: ${JSON.stringify(
                            targetGenResult[k],
                        )}`,
                    );
                }
                try {
                    (targetGenResult as any)[k].push(...(sourceGenResult as any)[k]);
                } catch (e: any) {
                    console.trace(`CODE00000188 appendGenResults failed!`, e);
                    (targetGenResult as any)[k].push(...(sourceGenResult as any)[k]); // retry for debug purposes
                }

                // switch (expectMatchingGenResultTypes(targetGenResult[k], sourceGenResult[k])) {
                //     case "array":
                //         targetGenResult[k].push(sourceGenResult[k]);
                //         break;
                //     case "object":
                //         throw new Error(`CODE00000186 mergeGenResults @notSupported`);
                //         break;
                //     case "string":
                //         throw new Error(`CODE00000187 mergeGenResults @notSupported`);
                //         break;
                // }
            }
        }
    }
    return targetGenResult;
}

export function mergeGenResults<T extends GenericGenResult>(...genResults: T[]): T {
    return appendGenResults({} as any, ...genResults);
}
