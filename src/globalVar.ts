export const globalVar = globalVarF as () => any;
// @yinstr-ignore-start

// @ts-ignore
export function globalVarF() {
    if (typeof global !== "undefined") return global as any;
    if (typeof window !== "undefined") return window as any;
}
// @ts-ignore
if (typeof module === "object") module.exports.globalVar = globalVarF;

// @yinstr-ignore-end
