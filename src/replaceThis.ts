export function replaceThis<A, B>(oldThis: A, newThis: B): B {
    Object.setPrototypeOf(oldThis, Object.prototype);
    for (const k in oldThis) {
        delete oldThis[k];
    }

    Object.setPrototypeOf(oldThis, Object.getPrototypeOf(newThis));
    Object.assign(oldThis, newThis);
    return oldThis as any as B;
}
