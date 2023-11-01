export class JsRef<T = unknown> {
    constructor(public readonly o: any, public readonly f: string | number) {
        if (typeof o !== "object") {
            throw new Error(`CODE00000464 Invalid 'o' passed to JsRef! typeof === '${typeof o}', but expected 'object'!`);
        }
    }

    get(): T {
        return this.o instanceof Map || this.o.constructor.name === "SortedMap" ? this.o.get(this.f) : this.o[this.f];
    }

    set(v: T) {
        if (typeof this.o !== "object") {
            throw new Error(`CODE00000465 Invalid LbUnresolvedRef!`);
        }

        if (this.o instanceof Map || this.o.constructor.name === "SortedMap") {
            this.o.set(this.f, v);
        } else {
            this.o[this.f] = v;
        }
    }

    del() {
        if (typeof this.o !== "object") {
            throw new Error(`CODE00000466 Invalid LbUnresolvedRef!`);
        }

        if (this.o instanceof Map || this.o.constructor.name === "SortedMap") {
            this.o.delete(this.f);
        } else {
            delete this.o[this.f];
        }
    }
}
