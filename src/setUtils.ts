export const addArrayToSet = <T>(targetSet: Set<T>, sourceArray: T[]) => {
    for (let item of sourceArray) {
        targetSet.add(item);
    }
};

export const filterSetToArray = <T>(sourceSet: Set<T>, conditionToKeep: (a: T) => boolean | undefined): T[] => {
    const r: T[] = [];
    for (let item of sourceSet) {
        if (conditionToKeep(item)) {
            r.push(item);
        }
    }
    return r;
};

export const filterSet = <T>(sourceSet: Set<T>, conditionToKeep: (a: T) => boolean | undefined): Set<T> => {
    const r: Set<T> = new Set<T>();
    for (let item of sourceSet) {
        if (conditionToKeep(item)) {
            r.add(item);
        }
    }
    return r;
};
