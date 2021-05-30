import { trimAll } from "./index.js";

describe("trimAll", () => {
    it("trimAll", () => {
        expect(trimAll(`123`)).toEqual("123");
        expect(trimAll(`123 abc абвx`)).toEqual("123 abc абвx");
        expect(trimAll(` 123 abc   абв `)).toEqual("123 abc абв");
        expect(trimAll(`\n123 abc \r\n  абв\t `)).toEqual("123 abc абв");
    });
});
