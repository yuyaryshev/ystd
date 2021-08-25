export function repeatStr(s: string, seprator: string, n: number): string {
    let a: string[] = [];
    for (let i = 0; i < n; i++) a.push(s);
    return a.join(seprator);
}
