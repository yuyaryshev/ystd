export function splitToLines(s: string): string[] {
    return s.match(/[^\r\n]+/g) || [s];
}
