import pkg from "rusha";
const { createHash } = pkg;

export class YstdHasher {
    private __hash: any;
    constructor(algorithm: string = "sha1", digest: string = "base64") {
        if (algorithm !== "sha1") {
            throw new Error(`CODE00000254 Only sha1 is supported. @notSupported`);
        }
        this.__hash = createHash();
    }

    update(data: any) {
        this.__hash.update(data);
        return this;
    }

    digest() {
        return this.__hash.digest();
    }
}

export class YstdHasherFactory {
    constructor(public readonly algorithm: string = "sha1", public readonly digest: string = "base64") {}
    create() {
        return new YstdHasher(this.algorithm, this.digest);
    }

    exec(data: any) {
        return this.create().update(data).digest();
    }
}
