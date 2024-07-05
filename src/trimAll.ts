export const trimAll = (s: string) => {
    return s
        .replace(/\s+/g, " ")
        .replace(/^\s+|\s+$/g, "") // Trim spaces at the beginning and end of the string
        .trim();
};
