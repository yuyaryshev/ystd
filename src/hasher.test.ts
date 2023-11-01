import { expect } from "chai";
import { YstdHasherFactory } from "./hasher.js";

describe("hasher", () => {
    it("hasher sha1-hex", () => {
        const hf = new YstdHasherFactory("sha1", "hex");
        const r = hf.exec("test");
        expect(r).to.deep.equal("a94a8fe5ccb19ba61c4c0873d391e987982fbbd3");
    });

    it("hasher sha1-base64", () => {
        const hf = new YstdHasherFactory("sha1", "base64");
        const r = hf.exec("test");
        expect(r).to.deep.equal("qUqP5cyxm6YcTAhz05Hph5gvu9M=");
    });
});
