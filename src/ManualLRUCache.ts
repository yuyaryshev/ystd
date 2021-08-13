export class ManualLRUCache<T> {
    public a: T[] = [];

    constructor(public maxN: number) {}

    touch(v: T) {
        const n = this.a.length;
        for (let i = 0; i < n; i++) {
            if (this.a[i] === v) {
                this.a.splice(i, 1);
                break;
            }
        }
        this.a.push(v);
    }

    touchAll(...items: T[]) {
        for (const item of items) this.touch(item);
    }

    spliceExceeding(): T[] {
        const d = this.a.length - this.maxN;
        return d > 0 ? this.a.splice(0, d) : [];
    }

    remove(v: T) {
        const n = this.a.length;
        for (let i = 0; i < n; i++) {
            if (this.a[i] === v) {
                this.a.splice(i, 1);
                break;
            }
        }
    }

    clear() {
        this.a.length = 0;
    }
}
