// readAll.ts
export const DEFAULT_MAX_STREAM_SIZE = 128 * 1024 * 1024; // 128 MB

export interface Readable {
    on(event: "data", listener: (chunk: unknown) => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "end", listener: () => void): this;
    on(event: "close", listener: () => void): this;
    destroy?(): void;
    readableEnded?: boolean;
    destroyed?: boolean;
}

export interface ReadAllOptions {
    maxSize?: number;
}

export async function readAll(readable0: Readable | Promise<Readable>, mode: "buffer", opts?: ReadAllOptions): Promise<Uint8Array>;
export async function readAll(readable0: Readable | Promise<Readable>, mode: "utf8", opts?: ReadAllOptions): Promise<string>;
export async function readAll(readable0: Readable | Promise<Readable>, mode: "buffer" | "utf8", opts?: ReadAllOptions): Promise<Uint8Array | string> {
    const readable = await readable0;

    if (!readable) {
        throw new Error("Stream is null or undefined.");
    }

    if (typeof readable.on !== "function") {
        throw new Error("Provided object is not a valid Readable stream.");
    }

    if ((readable as any).destroyed) {
        throw new Error("Stream is already destroyed.");
    }

    const maxSize = opts?.maxSize ?? DEFAULT_MAX_STREAM_SIZE;
    const chunks: Uint8Array[] = [];
    let totalSize = 0;

    return new Promise<Uint8Array | string>((resolve, reject) => {
        readable.on("data", (chunk: unknown) => {
            let buf: Uint8Array;

            if (typeof chunk === "string") {
                buf = new TextEncoder().encode(chunk);
            } else if (chunk instanceof Uint8Array) {
                buf = chunk;
            } else if (chunk instanceof ArrayBuffer) {
                buf = new Uint8Array(chunk);
            } else {
                reject(new Error(`Unsupported chunk type: ${typeof chunk}`));
                return;
            }

            totalSize += buf.length;
            if (totalSize > maxSize) {
                readable.destroy?.();
                reject(new Error(`Stream exceeds maximum allowed size of ${maxSize} bytes.`));
                return;
            }

            chunks.push(buf);
        });

        readable.on("error", (err) => {
            reject(new Error(`Stream error: ${err.message}`));
        });

        readable.on("end", () => {
            if (chunks.length === 0) {
                reject(new Error("Stream ended with no data."));
                return;
            }

            const buffer = mergeChunks(chunks);
            resolve(mode === "utf8" ? new TextDecoder().decode(buffer) : buffer);
        });

        readable.on("close", () => {
            if (!readable.readableEnded) {
                reject(new Error("Stream closed unexpectedly before ending."));
            }
        });
    });
}

function mergeChunks(chunks: Uint8Array[]): Uint8Array {
    const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}
