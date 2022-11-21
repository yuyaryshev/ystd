export const removeSuffix = (s: string, suffix: string): string => {
    if (s.endsWith(suffix)) return s.substr(0, s.length - suffix.length);
    return s;
};

export const removeExpectedSuffix = (s: string, suffix: string): string => {
    if (!s.endsWith(suffix)) {
        throw new Error(`CODE00000145 removeExpectedSuffix failed! Expected suffix '${suffix}' in string '${s}'!`);
    }
    return s.substr(0, s.length - suffix.length);
};
