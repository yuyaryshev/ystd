import { ITokenLike, Lexer } from "./lexer.js";
import { Severity, severityLongStr } from "./Severity.js";

export interface SourcePos {
    line: number;
    linep: number;
    p: number;
}

export interface AnySourcePos {
    sourcePath?: string | undefined;
    source?: string | undefined;
    line?: number;
    linep?: number;
    p?: number;
}

export interface SourceFullPos {
    sourcePath: string;
    source: string;
    line: number;
    linep: number;
    p: number;
}

export function posToLinep(s: string, p: number): SourcePos {
    let linep = p + 1;
    const lines = s.split("\n");
    for (let line = 0; line < lines.length; line++) {
        const ll = lines[line].length;
        if (linep > ll + 1) linep -= ll + 1;
        else return { line: line + 1, linep, p };
    }
    return { line: lines.length, linep: 1, p };
}

export function normalizeSourcePos(anySourcePos: AnySourcePos | undefined): SourceFullPos {
    const sourcePos: AnySourcePos = { ...((anySourcePos || ({} as any as AnySourcePos)) as any) };
    if (!sourcePos?.source && (sourcePos as any)?.s) sourcePos.source = (sourcePos as any).s;
    if (sourcePos?.p && sourcePos?.source && (!sourcePos?.line || !sourcePos?.linep))
        Object.assign(sourcePos, posToLinep(sourcePos?.source, sourcePos.p));
    if (!sourcePos.sourcePath) sourcePos.sourcePath = "UNKNOWN_PATH";
    return sourcePos as any as SourceFullPos;
}

export function posAdd(firstPos: AnySourcePos, len: number): SourcePos {
    if (firstPos.linep) firstPos.linep += len;
    if (firstPos.p) firstPos.p += len;
    if (firstPos.source) {
        delete firstPos.linep;
        delete firstPos.line;
    }
    return normalizeSourcePos(firstPos);
}

export function linePosStr(anySourcePos: AnySourcePos | undefined) {
    const sp = normalizeSourcePos(anySourcePos);
    return `\n\tat source file p = ${sp.p} (${sp.sourcePath}:${sp?.line || "?"}:${sp?.linep || "?"})`;
}

/**
 *
 */
export function tokenPosStr(token: ITokenLike<any> | undefined) {
    if (!token) return `Unknown location - see cpl if available`;
    return linePosStr({ ...token, sourcePath: token?.lexer?.sourcePath, source: token?.lexer?.s });
}

/**
 *
 */
export function afterTokenPosStr(token: ITokenLike<any> | undefined) {
    if (!token) return `Unknown location - see cpl if available`;
    return linePosStr(
        posAdd(
            {
                ...token,
                sourcePath: token?.lexer?.sourcePath,
                source: token?.lexer?.s,
            },
            token.len || 1,
        ),
    );
}

/**
 *
 */
export function lexerPosStr(lexer: AnySourcePos | undefined) {
    if (!lexer) return `Unknown location`;
    return linePosStr({
        sourcePath: lexer.sourcePath,
        source: lexer?.source || (lexer as any)?.s || "",
        p: lexer.p,
        line: lexer.line,
        linep: (lexer as any)?.linestartp ? lexer?.p || 0 - (lexer as any)?.linestartp || 0 : undefined,
    });
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

    constructor(severity: Severity, cpl: string, where: AnySourcePos | undefined, shortMessage: string) {
        let lexer: Lexer<CompilationContextT> | AnySourcePos | ITokenLike | undefined = isLexer(where) ? where : undefined;
        const token: ITokenLike | undefined = !lexer && where && (where as any).line ? (where as any) : undefined;
        if (token) lexer = token.lexer as Lexer<CompilationContextT> | undefined;

        let positionStr: string = "";
        if (token) positionStr = tokenPosStr(token);
        else if (lexer) positionStr = lexerPosStr(lexer);
        else positionStr = linePosStr(where);

        super(`${severityLongStr(severity)} ${cpl} ${shortMessage}${positionStr}`);
        this.compilationContext = lexer
            ? ((lexer as any)?.context as CompilationContextT)
            : token && token.lexer
            ? (token.lexer.context as CompilationContextT)
            : undefined;
        this.lexer = lexer as any;
        this.severity = severity;
        this.cpl = cpl;
        this.token = token;
        this.shortMessage = shortMessage;
    }
}
