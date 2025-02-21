// replaceInObject.ts
export function replaceInObject(o: any, d: any): any {
    const visited = new Set();
    function replaceRecursiveHelper(obj: any) {
        if (d.hasOwnProperty(obj)) {
            return d[obj];
        }

        if (typeof obj !== "object" || obj === null) {
            return obj;
        }

        if (visited.has(obj)) {
            return obj;
        }

        visited.add(obj);

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                obj[i] = replaceRecursiveHelper(obj[i]);
            }
        } else {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    obj[key] = replaceRecursiveHelper(obj[key]);
                }
            }
        }

        return obj;
    }

    return replaceRecursiveHelper(o);
}
