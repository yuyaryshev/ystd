export const removeSecurityData = (obj: any, security_keys: string[]) => {
    for (const k of security_keys) delete obj[k];

    for (const k in obj) if (typeof obj[k] === "object") removeSecurityData(obj[k], security_keys);
    return obj;
};
