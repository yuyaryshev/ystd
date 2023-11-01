// @ts-ignore
import pkg from "rusha";
import { base64ArrayBuffer } from "./base64ArrayBuffer.js";
const { createHash } = pkg;

export class YstdHasher {
    private __hash: any;
    constructor(
        algorithm: string = "sha1",
        private digestMethod: string = "base64",
    ) {
        if (algorithm !== "sha1") {
            throw new Error(`CODE00000461 Only sha1 is supported. @notSupported`);
        }
        this.__hash = createHash();
    }

    update(data: any) {
        this.__hash.update(data);
        return this;
    }

    digest() {
        if (this.digestMethod === "base64") {
            return base64ArrayBuffer(this.__hash.digest());
        }
        return this.__hash.digest(this.digestMethod);
    }
}

export class YstdHasherFactory {
    constructor(
        public readonly algorithm: string = "sha1",
        public readonly digest: string = "base64",
    ) {}
    create() {
        return new YstdHasher(this.algorithm, this.digest);
    }

    exec(data: any) {
        return this.create().update(data).digest();
    }
}
