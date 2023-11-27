export function cplIncludes(cpl: string, ...cplRefs: string[]) {
    return cplRefs.map((s) => (s.length > 8 ? s.slice(-8) : s)).includes(cpl.length > 8 ? cpl.slice(-8) : cpl);
}
