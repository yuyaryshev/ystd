export function toRelativePathOrKeep(rootDir0: string, s: string) {
    const rootDir = rootDir0.endsWith("/") || rootDir0.endsWith("\\") ? rootDir0.slice(0, rootDir0.length - 1) : rootDir0;

    if (s.startsWith(rootDir)) {
        const c = s[rootDir.length];
        if (c === "/" || c === "\\") {
            return s.slice(rootDir.length + 1);
        }
    }
    return s;
}

export function toRelativePathOrUndefined(rootDir0: string, s: string) {
    const rootDir = rootDir0.endsWith("/") || rootDir0.endsWith("\\") ? rootDir0.slice(0, rootDir0.length - 1) : rootDir0;

    if (s.startsWith(rootDir)) {
        const c = s[rootDir.length];
        if (c === "/" || c === "\\") {
            return s.slice(rootDir.length + 1);
        }
    }
    return undefined;
}
