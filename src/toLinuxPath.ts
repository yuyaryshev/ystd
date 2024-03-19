export function toLinuxPathLowerCase(s: string) {
    const r0 = s.toLowerCase().split("\\").join("/");
    const r1 = r0.split(":");
    if (r1.length > 1) {
        return "/" + r1.join("");
    }
    return r0;
}

export function toLinuxPathKeepCase(s: string) {
    const r0 = s.split("\\").join("/");
    const r1 = r0.split(":");
    if (r1.length > 1) {
        return "/" + r1.join("");
    }
    return r0;
}
