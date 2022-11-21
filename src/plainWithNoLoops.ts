export interface PlainWithNoLoopsOpts {
    allowDate?: boolean;
    allowNull?: boolean;
    allowSymbol?: boolean;
}

export const DefaultPlainWithNoLoopsOpts: PlainWithNoLoopsOpts = {
    allowDate: false,
    allowNull: true,
    allowSymbol: false,
};

export function isPlainWithNoLoops(v: any, opts: PlainWithNoLoopsOpts = DefaultPlainWithNoLoopsOpts, knownObjects: Set<any> = new Set()): boolean {
    switch (typeof v) {
        case "number":
            return isFinite(v) && !isNaN(v);

        case "bigint":
        case "boolean":
        case "string":
        case "undefined":
            return true;

        case "symbol":
            return !!opts.allowSymbol;

        case "function":
            return false;

        case "object":
            if (knownObjects.has(v)) return false;
            knownObjects.add(v);

            if (Array.isArray(v)) {
                const n = v.length;
                for (let i = 0; i < n; i++) if (!isPlainWithNoLoops(v[i], opts, knownObjects)) return false;
                return true;
            } else {
                if (v === null) {
                    return !!opts.allowNull;
                }
                if (v.constructor.name !== "Object") {
                    if (v.constructor.name === "Date" && opts.allowDate) {
                        return true;
                    }
                    return false;
                }
                for (const k in v) if (!isPlainWithNoLoops(v[k], opts, knownObjects)) return false;
                return true;
            }
    }
}

export function expectPlainWithNoLoops(v: any, opts: PlainWithNoLoopsOpts = DefaultPlainWithNoLoopsOpts) {
    if (!isPlainWithNoLoops(v, opts)) {
        const e = new Error(`CODE00000271 expectPlainWithNoLoops failed. See value in error.v for details.`);
        (e as any).v = v;
        throw e;
    }
}
