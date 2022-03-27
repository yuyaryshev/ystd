import { traverseObjectTree, TraverseObjectTreeOpts, TraverseObjectTreeOptsWoResult } from "./traverseObjectTree.js";

function asArray(x: any) {
    return x === undefined ? [] : Array.isArray(x) ? x : [x];
}

function pushAsArray(accumulator: Set<any>, x: any) {
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
            pushAsArray(resultItems, (item as any)[propertyName]);
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
            pushAsArray(resultItems, callback(item));
        }
        return this._makeSubpath<RESULT_T>(resultItems);
    }

    filter(callback: YJsPathFilterCallback<T>) {
        const resultItems: Set<any> = new Set();
        for (let item of this.items) {
            if (callback(item)) {
                resultItems.add(item);
            }
        }
        return this._makeSubpath<T>(resultItems);
    }

    join(sep: string = ""): string {
        return [...this.items].join(sep);
    }

    expectOne(errorMessage: string = `CODE00000176 YJsPath expects exactly one item as output`): T {
        if (this.items.size !== 1) {
            throw new Error(errorMessage);
        }
        return [...this.items][0];
    }

    expectOneOrUndefined(errorMessage: string = `CODE00000177 YJsPath expects exactly one item as output`): T | undefined {
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
}
