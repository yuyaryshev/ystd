export function splitPath(pathStr: string | undefined): string[] {
    return pathStr?.split(/[\\\/]+/g) || [];
}
