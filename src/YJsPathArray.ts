import { traverseObjectTree, TraverseObjectTreeOpts, TraverseObjectTreeOptsWoResult } from "./traverseObjectTree.js";
import { YJsPathMapCallback } from "./YJsPathSet.js";

function asArray(x: any) {
    return x === undefined ? [] : Array.isArray(x) ? x : [x];
}

function pushAsArray(accumulator: any[], x: any) {
    if (x !== undefined) {
        if (Array.isArray(x)) {
            accumulator.push(...x);
        } else {
            accumulator.push(x);
        }
    }
}

export function newYJsPathArray<T = any>(itemOrItems: T | T[]) {
    return new YJsPathArray(itemOrItems);
}

export class YJsPathArray<T = any> {
    public items: T[];
    constructor(itemOrItems: T | T[]) {
        this.items = asArray(itemOrItems);
    }

    _makeSubpath<R = any>(items: R[]) {
        return new YJsPathArray<R>(items);
    }

    property<R = any>(propertyName: string) {
        const resultItems: any[] = [];
        for (let item of this.items) {
            pushAsArray(resultItems, (item as any)[propertyName]);
        }
        return this._makeSubpath<R>(resultItems);
    }

    traverse<R = any>(opts: TraverseObjectTreeOptsWoResult) {
        const resultItems: any[] = [];
        const traverseOpts: TraverseObjectTreeOpts = { ...opts, resultArray: resultItems };
        for (let item of this.items) {
            pushAsArray(resultItems, traverseObjectTree(item, traverseOpts));
        }
        return this._makeSubpath<R>(resultItems);
    }

    map<RESULT_T = any>(callback: YJsPathMapCallback<T, RESULT_T>) {
        const resultItems: any[] = [];
        for (let item of this.items) {
            pushAsArray(resultItems, callback(item));
        }
        return this._makeSubpath<RESULT_T>(resultItems);
    }

    filter<RESULT_T = any>(callback: YJsPathMapCallback<T, RESULT_T>) {
        const resultItems: any[] = [];
        for (let item of this.items) {
            pushAsArray(resultItems, callback(item));
        }
        return this._makeSubpath<RESULT_T>(resultItems);
    }

    join(sep: string = ""): string {
        return this.items.join(sep);
    }

    expectOne(errorMessage: string = `CODE00000097 YJsPath expects exactly one item as output`): T {
        if (this.items.length !== 1) {
            throw new Error(errorMessage);
        }
        return this.items[0];
    }

    expectOneOrUndefined(errorMessage: string = `CODE00000098 YJsPath expects exactly one item as output`): T | undefined {
        if (this.items.length > 1) {
            throw new Error(errorMessage);
        }
        return this.items[0];
    }

    first(): T | undefined {
        return this.items[0];
    }

    unique(): YJsPathArray<T> {
        return this._makeSubpath<T>([...(new Set(this.items) as any)]);
    }

    asArray(): T[] {
        return this.items;
    }

    asSet(): Set<T> {
        return new Set(this.items);
    }
}
