type any_1 = any;
import { expect } from "chai";
import { lexAll, Lexer, tt } from "./index.js";
import { stringify as JsStringify } from "javascript-stringify";

describe("lexer", () => {
    describe("advance() - basic tests", () => {
        it("2", () => {
            const lex = new Lexer("select", "", undefined);
            const res: any_1 = [];

            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(1);
            expect(res[0].token_type).equal(tt.identifier);
            expect(res[0].t).equal("select");
            expect(res[0].len).equal(6);
        });
        it("3", () => {
            const input = `'Иван Иваныч'`;
            const lex = new Lexer(input, "", undefined);
            const res: any_1 = [];
            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(1);

            expect(res[0].token_type).equal(tt.squoted);
            expect(res[0].v).equal(`Иван Иваныч`);
            expect(res[0].len).equal(input.length);
        });
        it("3.2", () => {
            const input = `"Иван Иваныч"`;
            const lex = new Lexer(input, "", undefined);
            const res: any_1 = [];
            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(1);

            expect(res[0].token_type).equal(tt.dquoted);
            expect(res[0].v).equal(`Иван Иваныч`);
            expect(res[0].len).equal(input.length);
        });
        it("4", () => {
            const lex = new Lexer("2", "", undefined);
            const res: any_1 = [];
            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(1);
            expect(res[0].token_type).equal(tt.int);
            expect(res[0].v).equal(2);
            expect(res[0].len).equal(1);
        });
        it("5", () => {
            const lex = new Lexer("(", "", undefined);
            const res: any_1 = [];
            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(1);
            expect(res[0].token_type).equal(tt.punctuator);
            expect(res[0].t).equal("(");
            expect(res[0].len).equal(1);
        });
        it("6", () => {
            const lex = new Lexer(`"English Symbols"`, "", undefined);
            const res: any_1 = [];
            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(1);
            expect(res[0].token_type).equal(tt.dquoted);
            expect(res[0].v).equal("English Symbols");
        });

        it("single line comment (skip)", () => {
            const lex = new Lexer(`123 // 345\n 678`, "", undefined);
            const res: any_1 = [];
            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(2);
            expect(res[0].token_type).equal(tt.int);
            expect(res[0].v).equal(123);

            expect(res[1].token_type).equal(tt.int);
            expect(res[1].v).equal(678);
        });

        it("single line comment (no skip)", () => {
            const lex = new Lexer(`123 // 345\n 678`, "", undefined);
            lex.skip_comments = false;
            const res: any_1 = [];
            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(3);
            expect(res[0].token_type).equal(tt.int);
            expect(res[0].v).equal(123);

            expect(res[1].token_type).equal(tt.comment);
            expect(res[1].v).equal(`// 345\n`);

            expect(res[2].token_type).equal(tt.int);
            expect(res[2].v).equal(678);
        });

        it("multi line comment (skip)", () => {
            const lex = new Lexer(`123 /* 345\n7*/ 678`, "", undefined);
            const res: any_1 = [];
            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(2);
            expect(res[0].token_type).equal(tt.int);
            expect(res[0].v).equal(123);

            expect(res[1].token_type).equal(tt.int);
            expect(res[1].v).equal(678);
        });

        it("multi line comment (no skip)", () => {
            const lex = new Lexer(`123 /* 345\n7*/ 678`, "", undefined);
            lex.skip_comments = false;
            const res: any_1 = [];
            let token;
            while ((token = lex.advance())) res.push(token);
            expect(res.length).equal(3);
            expect(res[0].token_type).equal(tt.int);
            expect(res[0].v).equal(123);

            expect(res[1].token_type).equal(tt.comment);
            expect(res[1].v).equal(`/* 345\n7*/`);

            expect(res[2].token_type).equal(tt.int);
            expect(res[2].v).equal(678);
        });

        it("CODE{ ... }CODE", () => {
            const input = `123 CODE{ 345\n7 }CODE abcd`;

            const lexed = lexAll(input, "", undefined);
            for (const t of lexed) {
                // @ts-ignore
                delete t.lexer;
            }
            expect(lexed.map((t) => t.v)).to.deep.equal([123, ` 345\n7 `, `abcd`]);
            // expect(lexed).to.deep.equal(["TBD"]);
            //
            // ////////////////////////////////
            //
            // while ((token = lex.advance())) res.push(token);
            // expect(res.length).equal(3);
            // expect(res[0].token_type).equal(tt.int);
            // expect(res[0].v).equal(123);
            //
            // expect(res[1].token_type).equal(tt.code);
            // expect(res[1].v).equal(` 345\n7 `);
            //
            // expect(res[2].token_type).equal(tt.int);
            // expect(res[2].v).equal(678);
        });
    });

    describe("scanRange()", () => {
        it("string", () => {
            const lex = new Lexer(`"string"`, "", undefined);
            const token = lex.read(tt.string);
            expect((token as any_1).v).equal("string");
        });
        it("number", () => {
            const lex = new Lexer(`112`, "", undefined);
            const token = lex.read(tt.number);
            expect((token as any_1).v).equal(112);
        });
        it("punctuator", () => {
            const lex = new Lexer(`++`, "", undefined);
            const token = lex.read(tt.punctuator);
            expect((token as any_1).t).equal("++");
        });
    });

    describe("split to array", () => {
        it("split", () => {
            const parts = new Lexer(`aaaa 1234 CD07 bce CD09 9999 CD11`, "", undefined).split(/[C][D][0-9][0-9]/);
            expect(parts.map((p) => p.v)).to.deep.equal(["aaaa 1234 ", "CD07", " bce ", "CD09", " 9999 ", "CD11", ""]);
        });
    });

    describe("line numbers", () => {
        it("line numbers1", () => {
            const input = `abc 
def CODE{
777 }CODE
   qqqqv  "x8888"
&
            `;

            const lexed = lexAll(input, "", undefined);
            for (const t of lexed) {
                // @ts-ignore
                delete t.lexer;

                // @ts-ignore
                delete t.token_type;
            }
            console.log("Actual:\n", JsStringify(lexed));
            expect(lexed).to.deep.equal([
                {
                    line: 1,
                    linep: 1,
                    p: 0,
                    len: 3,
                    t: "abc",
                    v: "abc",
                },
                {
                    line: 2,
                    linep: 1,
                    p: 5,
                    len: 3,
                    t: "def",
                    v: "def",
                },
                {
                    line: 2,
                    linep: 5,
                    p: 9,
                    len: 15,
                    t: "CODE{\n777 }CODE",
                    v: "\n777 ",
                },
                {
                    line: 4,
                    linep: 4,
                    p: 28,
                    len: 5,
                    t: "qqqqv",
                    v: "qqqqv",
                },
                {
                    line: 4,
                    linep: 11,
                    p: 35,
                    len: 7,
                    t: '"x8888"',
                    v: "x8888",
                },
                {
                    line: 5,
                    linep: 1,
                    p: 43,
                    len: 1,
                    t: "&",
                    v: "&",
                },
            ]);
        });
    });

    describe("big tests from prev errors", () => {
        it("error1", () => {
            const input = `field scalar`;
            const lexed = lexAll(input, "", undefined);
            for (const t of lexed) {
                // @ts-ignore
                delete t.lexer;

                // @ts-ignore
                delete t.linep;

                // @ts-ignore
                delete t.line;
            }
            expect(lexed.map((t) => t.t)).to.deep.equal([`field`, `scalar`]);
            expect(lexed).to.deep.equal([
                {
                    token_type: tt.identifier,
                    p: 0,
                    len: 5,
                    t: "field",
                    v: "field",
                },
                {
                    token_type: tt.identifier,
                    p: 6,
                    len: 6,
                    t: "scalar",
                    v: "scalar",
                },
            ]);
        });

        it("error2", () => {
            const input = `field scalar "91ff802a-7a7d-47cf-b4b2-6cad56ff9c18" parentId string;`;
            const lexed = lexAll(input, "", undefined);
            for (const t of lexed) {
                // @ts-ignore
                delete t.lexer;

                // @ts-ignore
                delete t.linep;

                // @ts-ignore
                delete t.line;
            }

            expect(lexed.map((t) => t.t)).to.deep.equal([`field`, `scalar`, `"91ff802a-7a7d-47cf-b4b2-6cad56ff9c18"`, `parentId`, `string`, `;`]);

            expect(lexed).to.deep.equal([
                {
                    token_type: 4,
                    p: 0,
                    len: 5,
                    t: "field",
                    v: "field",
                },
                {
                    token_type: 4,
                    p: 6,
                    len: 6,
                    t: "scalar",
                    v: "scalar",
                },
                {
                    token_type: 256,
                    p: 13,
                    len: 38,
                    t: '"91ff802a-7a7d-47cf-b4b2-6cad56ff9c18"',
                    v: "91ff802a-7a7d-47cf-b4b2-6cad56ff9c18",
                },
                {
                    token_type: 4,
                    p: 52,
                    len: 8,
                    t: "parentId",
                    v: "parentId",
                },
                {
                    token_type: 4,
                    p: 61,
                    len: 6,
                    t: "string",
                    v: "string",
                },
                {
                    token_type: 1,
                    p: 67,
                    len: 1,
                    t: ";",
                    v: ";",
                },
            ]);
        });
    });
});
