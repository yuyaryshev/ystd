import { ITokenLike, Lexer } from "./lexer.js";
import { Severity, severityLongStr } from "./Severity.js";

/**
 *
 */
export function tokenPosStr(token: ITokenLike<any> | undefined) {
    if (!token) return `Unknown location - see cpl if available`;
    return `at source file (${token?.lexer?.filePath || "Unknown file"}:${token.line}:${token.linep}) p = ${token.p}`;
}

/**
 *
 */
export function afterTokenPosStr(token: ITokenLike<any> | undefined) {
    if (!token) return `Unknown location - see cpl if available`;
    return `at source file (${token?.lexer?.filePath || "Unknown file"}:${token.line}:${(token.linep || 0) + (token.len || 0)}) p = ${
        (token.p || 0) + (token.len || 0)
    }`;
}

/**
 *
 */
export function lexerPosStr(lexer: Lexer<any> | undefined) {
    if (!lexer) return `Unknown location`;
    return `\n\tat source file (${lexer.filePath}:${lexer.line}:${lexer.p - lexer.linestartp}) p = ${lexer.p}`;
}

/**
 *
 */
function isLexer(a: any): a is Lexer {
    return a?.constructor?.name === "Lexer";
}

export class CompilationError<CompilationContextT> extends Error {
    compilationContext?: CompilationContextT | undefined;
    lexer?: Lexer<CompilationContextT> | undefined;
    severity: Severity;
    cpl: string;
    token?: ITokenLike | undefined;
    shortMessage: string;

    constructor(severity: Severity, cpl: string, where: Lexer<CompilationContextT> | ITokenLike | undefined, shortMessage: string) {
        let lexer: Lexer<CompilationContextT> | ITokenLike | undefined = isLexer(where) ? where : undefined;
        const token: ITokenLike | undefined = !lexer && where && (where as any).line ? (where as any) : undefined;
        if (token) lexer = token.lexer as Lexer<CompilationContextT> | undefined;

        let positionStr: string = "";
        if (token && token.lexer) positionStr = `\n\t${tokenPosStr(token)}`;
        //`\n\tat source file (${token.lexer!.filePath}:${token.line}:${token.linep}) p = ${token.p}`;
        else if (lexer && lexer.line) positionStr = `\n\t${lexerPosStr(lexer)}`; //

        super(`${severityLongStr(severity)} ${cpl} ${shortMessage}${positionStr}`);
        this.compilationContext = lexer
            ? (lexer.context as CompilationContextT)
            : token && token.lexer
            ? (token.lexer.context as CompilationContextT)
            : undefined;
        this.lexer = lexer;
        this.severity = severity;
        this.cpl = cpl;
        this.token = token;
        this.shortMessage = shortMessage;
    }
}
