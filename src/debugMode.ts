export const debugModeCodes: { [key: string]: boolean } = {};

export const debugMode = (code: string = "", newValue?: boolean): boolean => {
    if (newValue === undefined) {
        return debugModeCodes[code] || debugModeCodes[""];
    } else {
        return (debugModeCodes[code] = newValue);
    }
};
