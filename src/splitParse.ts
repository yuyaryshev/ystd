const isWhitespaceChar = (c: string) => {
    return c === " " || c === "\t";
};

const isAlfaNumericChar = (c: string) => {
    return ("a" <= c && c <= "z") || ("A" <= c && c <= "Z") || c === "_";
};

type PatternPart = {
    sep: string;
    name: string;
};

export class SplitParser<T = { [key: string]: string }> {
    private patternTokens: PatternPart[] = [];
    parse: (s: string) => T;
    constructor(pattern: string) {
        const n = pattern.length;
        let i = 0;
        for (; i < n; ) {
            let name: string = "";
            for (; i < n && isAlfaNumericChar(pattern[i]); i++) {
                name += pattern[i];
            }

            let sep: string = "";
            for (; i < n && !isAlfaNumericChar(pattern[i]); i++) {
                sep += pattern[i];
            }
            if (sep !== "") {
                sep = sep.trim();
                if (sep === "") {
                    sep = " ";
                }
            }

            this.patternTokens.push({ sep, name });
        }

        this.parse = (s: string) => {
            let r: any = {};
            let ctIndex = 0;
            let ct = this.patternTokens[ctIndex];

            const n = s.length;
            let i = 0;
            let token = "";
            for (; i < n; i++) {
                for (; i < n && ct; ) {
                    if ((ct.sep === " " && isWhitespaceChar(s[i])) || (s[i] === ct.sep[0] && s.substr(i, ct.sep.length) === ct.sep)) {
                        r[ct.name] = token.trim();
                        i += ct.sep.length;
                        while (isWhitespaceChar(s[i])) {
                            i++;
                        }
                        ct = this.patternTokens[++ctIndex];
                        token = "";
                    } else {
                        token += s[i];
                        i++;
                    }
                }
            }
            if (ct.sep === "") {
                if (ctIndex < this.patternTokens.length - 1) {
                    throw new Error(`CODE00000210 SplitParser couldn't fully parse expression!`);
                }
                r[ct.name] = token.trim();
                return r;
            } else {
                if (ctIndex < this.patternTokens.length) {
                    throw new Error(`CODE00000211 SplitParser couldn't fully parse expression!`);
                }
                return r;
            }
        };
    }
}

export const splitParse = (s: string, pattern: string) => {
    return new SplitParser(pattern).parse(s);
};
