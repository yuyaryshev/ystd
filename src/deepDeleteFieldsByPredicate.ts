// deepDeleteFieldsByPredicate.ts
export function deepDeleteFieldsByPredicate(value: any, predicate: (key: string) => boolean): void {
    const visited = new WeakSet<object>();

    function traverse(val: unknown): void {
        if (val && typeof val === "object") {
            if (visited.has(val)) return;
            visited.add(val);

            if (Array.isArray(val)) {
                for (const item of val) {
                    traverse(item);
                }
            } else {
                for (const key in val) {
                    if (predicate(key)) {
                        delete (val as Record<string, unknown>)[key];
                    } else {
                        traverse((val as Record<string, unknown>)[key]);
                    }
                }
            }
        }
    }

    traverse(value);
}
