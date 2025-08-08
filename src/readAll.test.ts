// readAll.test.ts
import { expect } from "chai";
import { Readable, readAll } from "./readAll.js";

function makeReadable(chunks: (string | Uint8Array)[]): Readable & { trigger(): void } {
    const listeners: { [key: string]: Function[] } = {};
    let destroyed = false;
    let ended = false;

    return {
        on(event: string, listener: Function) {
            listeners[event] = listeners[event] || [];
            listeners[event].push(listener);
            return this;
        },
        destroy() {
            destroyed = true;
        },
        get destroyed() {
            return destroyed;
        },
        get readableEnded() {
            return ended;
        },
        trigger() {
            // Schedule actual event emission in next microtask
            queueMicrotask(() => {
                if (destroyed) return;

                chunks.forEach((c) => (listeners["data"] || []).forEach((fn) => fn(c)));

                ended = true;
                (listeners["end"] || []).forEach((fn) => fn());
                (listeners["close"] || []).forEach((fn) => fn());
            });
        },
    };
}

describe("makeReadable", () => {
    function makeReadable(chunks: (string | Uint8Array)[]) {
        const listeners: { [key: string]: Function[] } = {};
        let destroyed = false;
        let ended = false;

        return {
            on(event: string, listener: Function) {
                listeners[event] = listeners[event] || [];
                listeners[event].push(listener);
                return this;
            },
            destroy() {
                destroyed = true;
            },
            get destroyed() {
                return destroyed;
            },
            get readableEnded() {
                return ended;
            },
            trigger() {
                if (destroyed) return;

                // Emit chunks
                chunks.forEach((c) => (listeners["data"] || []).forEach((fn) => fn(c)));

                // Emit end
                ended = true;
                (listeners["end"] || []).forEach((fn) => fn());

                // Emit close
                (listeners["close"] || []).forEach((fn) => fn());
            },
        };
    }

    it("emits all expected events in order", () => {
        const events: string[] = [];
        const emittedChunks: (string | Uint8Array)[] = [];

        const r = makeReadable(["a", "b"]);

        r.on("data", (chunk: string) => {
            events.push("data");
            emittedChunks.push(chunk);
        });

        r.on("end", () => {
            events.push("end");
        });

        r.on("close", () => {
            events.push("close");
        });

        r.trigger();

        expect(events).to.deep.equal(["data", "data", "end", "close"]);
        expect(emittedChunks).to.deep.equal(["a", "b"]);
        expect(r.readableEnded).to.equal(true);
    });

    it("does not emit if destroyed", () => {
        const events: string[] = [];
        const r = makeReadable(["x", "y"]);
        r.on("data", () => events.push("data"));
        r.destroy();
        r.trigger();
        expect(events).to.deep.equal([]);
    });
});

describe.only("readAll", () => {
    it("reads utf8 string from string chunks", async () => {
        const input = makeReadable(["Hello", " ", "world!"]);
        const promise = readAll(input, "utf8", undefined);

        (input as any).trigger();
        const result = await promise;
        expect(result).to.equal("Hello world!");
    });

    it("reads buffer from Uint8Array chunks", async () => {
        const input = makeReadable([new TextEncoder().encode("Hello "), new TextEncoder().encode("buffer!")]);
        const promise = readAll(input, "buffer");

        (input as any).trigger();
        const result = await promise;
        expect(new TextDecoder().decode(result)).to.equal("Hello buffer!");
    });

    it("throws if stream exceeds maxSize", async () => {
        const chunk = new Uint8Array(10);
        const input = makeReadable([chunk, chunk, chunk, chunk]);
        const promise = readAll(input, "buffer", { maxSize: 25 }); // Only allow 25 bytes
        try {
            (input as any).trigger();
            await promise;
            expect.fail("Should have thrown due to size limit");
        } catch (err) {
            expect((err as Error).message).to.include("Stream exceeds maximum allowed size");
        }
    });

    it("throws on stream error", async () => {
        const listeners: { [key: string]: Function[] } = {};
        const input: Readable & { emitError(): void } = {
            on(event, listener) {
                listeners[event] = listeners[event] || [];
                listeners[event].push(listener);
                return this;
            },
            destroy() {},
            readableEnded: true,
            destroyed: false,
            emitError() {
                (listeners["error"] || []).forEach((fn) => fn(new Error("Test error")));
            },
        };

        const promise = readAll(input, "utf8");

        queueMicrotask(() => input.emitError());

        try {
            await promise;
            expect.fail("Should have thrown due to stream error");
        } catch (err) {
            expect((err as Error).message).to.include("Test error");
        }
    });

    it("throws if stream ends with no data", async () => {
        const input = makeReadable([]);
        const promise = readAll(input, "utf8");

        (input as any).trigger();
        try {
            await promise;
            expect.fail("Should have thrown due to no data");
        } catch (err) {
            expect((err as Error).message).to.include("Stream ended with no data");
        }
    });
});
