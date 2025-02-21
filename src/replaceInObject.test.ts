// replaceInObject.test.ts
import { replaceInObject } from "./replaceInObject.js";
import { expectDeepEqual } from "./expectDeepEqual.js";

//@ts-ignore
if (!global.YCURLOG) {
    //@ts-ignore
    global.YCURLOG = () => {};
    //@ts-ignore
    global.YCURLOG_has = () => {};
}

describe("yide_server/replaceInObject1.test.ts", () => {
    it("should replace simple values in an object", async function () {
        const obj = { a: "x", b: "y", c: "z" };
        const dict = { x: 1, y: 2 };
        const result = replaceInObject(obj, dict);
        expectDeepEqual(result, { a: 1, b: 2, c: "z" }, "CODE00000173");
    });

    it("should replace values in nested objects", async function () {
        const obj = { a: { b: "x", c: { d: "y" } } };
        const dict = { x: 100, y: 200 };
        const result = replaceInObject(obj, dict);
        expectDeepEqual(result, { a: { b: 100, c: { d: 200 } } }, "CODE00000175");
    });

    it("should replace values in arrays", async function () {
        const obj = ["x", "y", "z"];
        const dict = { x: "one", y: "two" };
        const result = replaceInObject(obj, dict);
        expectDeepEqual(result, ["one", "two", "z"], "CODE00000177");
    });

    it("should handle circular references", async function () {
        const obj: any = { a: "x" };
        obj.self = obj; // Circular reference
        const dict = { x: "replaced" };
        const result = replaceInObject(obj, dict);
        expectDeepEqual(result.a, "replaced", "CODE00000179");
        expectDeepEqual(result.self, result, "CODE00000180"); // Ensure circular reference is maintained
    });

    it("should handle objects with no matching replacements", async function () {
        const obj = { a: "unchanged" };
        const dict = { x: "new" };
        const result = replaceInObject(obj, dict);
        expectDeepEqual(result, { a: "unchanged" }, "CODE00000182");
    });

    it("should handle an empty object", async function () {
        const obj = {};
        const dict = { x: "new" };
        const result = replaceInObject(obj, dict);
        expectDeepEqual(result, {}, "CODE00000184");
    });

    it("should handle an empty dictionary", async function () {
        const obj = { a: "x", b: "y" };
        const dict = {};
        const result = replaceInObject(obj, dict);
        expectDeepEqual(result, { a: "x", b: "y" }, "CODE00000003");
    });

    it("should handle an object with multiple data types", async function () {
        const obj = { a: "x", b: 42, c: null, d: ["y", { e: "z" }] };
        const dict = { x: "newX", y: "newY", z: "newZ" };
        const result = replaceInObject(obj, dict);
        expectDeepEqual(result, { a: "newX", b: 42, c: null, d: ["newY", { e: "newZ" }] }, "CODE00000005");
    });
});
