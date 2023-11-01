export function strSwitchEndsWith<T>(v: string, switchDict: { [key: string]: T }): T | undefined {
    if (typeof v !== "string") {
        return;
    }

    for (let k in switchDict) {
        if (v.endsWith(k)) {
            return switchDict[k];
        }
    }
    return;
}

export function strSwitchStartsWith<T>(v: string, switchDict: { [key: string]: T }): T | undefined {
    if (typeof v !== "string") {
        return;
    }

    for (let k in switchDict) {
        if (v.startsWith(k)) {
            return switchDict[k];
        }
    }
    return;
}
