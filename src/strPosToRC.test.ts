import { expect } from "chai";
import { strPosConverter, strPosToRC, strRCToPos } from "./strPosToRC.js";

describe("strPosToRC", () => {
    it("strPosToRCConverter.linesSE", () => {
        expect(strPosConverter(`\n123 abc \r\n  абв\t `).linesSE).to.deep.equal([
            { s: 0, e: 0 },
            { s: 1, e: 9 },
            { s: 11, e: 18 },
        ]);

        expect(strPosConverter(`dd\n123 abc \r\n  абв\t `).linesSE).to.deep.equal([
            { s: 0, e: 2 },
            { s: 3, e: 11 },
            { s: 13, e: 20 },
        ]);

        expect(strPosConverter(``).linesSE).to.deep.equal([{ s: 0, e: 0 }]);
        expect(strPosConverter(`a`).linesSE).to.deep.equal([{ s: 0, e: 1 }]);
        expect(strPosConverter(`\n`).linesSE).to.deep.equal([
            { s: 0, e: 0 },
            { s: 1, e: 1 },
        ]);
        expect(strPosConverter(`\n\n`).linesSE).to.deep.equal([
            { s: 0, e: 0 },
            { s: 1, e: 1 },
            { s: 2, e: 2 },
        ]);
        expect(strPosConverter(`\r\n\r\r\n`).linesSE).to.deep.equal([
            { s: 0, e: 0 },
            { s: 2, e: 2 },
            { s: 3, e: 3 },
            { s: 5, e: 5 },
        ]);
    });

    it("strPosToRCConverter.fromPos", () => {
        const conv = strPosConverter(`dd\n123 abc \r\n  абв\t `);
        expect(conv.fromPos(5)).to.deep.equal({ r: 2, c: 3 });
    });

    it("strPosToRCConverter.toPos", () => {
        const conv = strPosConverter(`dd\n123 abc \r\n  абв\t `);
        expect(conv.toPos(2, 3)).to.deep.equal(5);
    });

    it("strPosToRC", () => {
        expect(strPosToRC(`dd\n123 abc \r\n  абв\t `, 5)).to.deep.equal({ r: 2, c: 3 });
    });

    it("strRCToPos", () => {
        expect(strRCToPos(`dd\n123 abc \r\n  абв\t `, 2, 3)).to.equal(5);
    });
});
