import { traverseObjectTree, TraverseObjectTreeOpts, TraverseObjectTreeOptsWoResult } from "./traverseObjectTree.js";
import { GenericGenResult, mergeGenResults } from "./GenericGenResult.js";

function asArray(x: any) {
    return x === undefined ? [] : Array.isArray(x) ? x : [x];
}

function addAsArray(accumulator: Set<any>, x: any) {
    if (x !== undefined) {
        if (Array.isArray(x)) {
            for (const xItem of x) {
                accumulator.add(xItem);
            }
        } else {
            accumulator.add(x);
        }
    }
}

export type YJsPathMapCallback<ITEM_T = any, RESULT_T = any> = (item: ITEM_T) => RESULT_T | undefined;
export type YJsPathLinkOneCallback<ITEM_T = any, LINKED_T = any, RESULT_T = any> = (item: ITEM_T, linked: LINKED_T) => RESULT_T | undefined;
export type YJsPathFilterCallback<ITEM_T = any> = (item: ITEM_T) => boolean | undefined;

export function newYJsPathSet<T = any>(itemOrItems: T | T[] | Set<T>) {
    return new YJsPathSet(itemOrItems);
}

export class YJsPathSet<T = any> {
    public items: Set<T>;
    constructor(itemOrItems: T | T[] | Set<T>) {
        if (itemOrItems instanceof Set) {
            this.items = itemOrItems;
        } else {
            this.items = new Set([...asArray(itemOrItems)]);
        }
    }

    _makeSubpath<R = any>(items: Set<R>) {
        return new YJsPathSet<R>(items);
    }

    property<R = any>(propertyName: string) {
        const resultItems: Set<any> = new Set();
        for (let item of this.items) {
            addAsArray(resultItems, (item as any)[propertyName]);
        }
        return this._makeSubpath<R>(resultItems);
    }

    traverse<R = any>(opts: TraverseObjectTreeOptsWoResult) {
        const resultArray: any[] = [];
        const traverseOpts: TraverseObjectTreeOpts = { ...opts, resultArray };
        for (let item of this.items) {
            traverseObjectTree(item, traverseOpts);
        }
        return this._makeSubpath<R>(new Set(resultArray));
    }

    map<RESULT_T = any>(callback: YJsPathMapCallback<T, RESULT_T>) {
        const resultItems: Set<any> = new Set();
        for (let item of this.items) {
            addAsArray(resultItems, callback(item));
        }
        return this._makeSubpath<RESULT_T>(resultItems);
    }

    filter<RESULT_T = T>(callback: YJsPathFilterCallback) {
        const resultItems: Set<any> = new Set();
        for (let item of this.items) {
            if (callback(item)) {
                resultItems.add(item);
            }
        }
        return this._makeSubpath<RESULT_T>(resultItems);
    }

    propertyRecursive<RESULT_T = T>(propertyName: string, callback: YJsPathFilterCallback) {
        const resultItems: Set<any> = new Set();

        let sourceSet: Set<any> = this.items;
        while (sourceSet.size) {
            let currentSet: Set<any> = new Set();
            for (let item of sourceSet) {
                addAsArray(currentSet, (item as any)[propertyName]);
            }

            sourceSet = new Set();
            for (const item of currentSet) {
                if (callback(item)) {
                    resultItems.add(item);
                } else {
                    sourceSet.add(item);
                }
            }
        }

        return this._makeSubpath<RESULT_T>(resultItems);
    }

    expectLink<RESULT_T = T>(lookupObj: any, callback: YJsPathFilterCallback) {
        const resultItems: Set<any> = new Set();
        for (let item of this.items) {
            const name = lookupObj[item];
            const lookupCandidates = asArray(name).filter(callback);
            switch (lookupCandidates.length) {
                case 0:
                    throw new Error(`CODE00000220 expectLink failed to find name '${name}'`);
                default:
                    throw new Error(
                        `CODE00000221 expectLink name '${name}' is umbigious. There are ${lookupCandidates.length} candidates with this name found!`,
                    );
                case 1:
                    resultItems.add(lookupCandidates[0]);
                    break;
            }
        }
        return this._makeSubpath<RESULT_T>(resultItems);
    }

    join(sep: string = ""): string {
        return [...this.items].join(sep);
    }

    expectOne(errorMessage: string = `CODE00000222 YJsPath expects exactly one item as output`): T {
        if (this.items.size !== 1) {
            throw new Error(errorMessage);
        }
        return [...this.items][0];
    }

    expectOneOrUndefined(errorMessage: string = `CODE00000223 YJsPath expects exactly one item as output`): T | undefined {
        if (this.items.size > 1) {
            throw new Error(errorMessage);
        }
        return [...this.items][0];
    }

    first(): T | undefined {
        for (let item of this.items) {
            return item;
        }
        return undefined;
    }

    unique(): YJsPathSet<T> {
        return this;
    }

    asArray(): T[] {
        return [...this.items];
    }

    asSet(): Set<T> {
        return this.items;
    }

    mergeAgg<RESULT_T extends GenericGenResult>(callback: YJsPathMapCallback<T, RESULT_T>): RESULT_T {
        const resultItems: Set<any> = new Set();
        for (let item of this.items) {
            addAsArray(resultItems, callback(item));
        }
        return mergeGenResults(...resultItems);
    }
}
