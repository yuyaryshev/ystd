export const removePrefix = (s: string, prefix: string): string => {
    if (s.startsWith(prefix)) return s.substr(prefix.length);
    return s;
};

export const removeExpectedPrefix = (s: string, prefix: string): string => {
    if (!s.startsWith(prefix)) {
        throw new Error(`CODE00000189 removeExpectedPrefix failed! Expected prefix '${prefix}' in string '${s}'!`);
    }
    return s.substr(prefix.length);
};
