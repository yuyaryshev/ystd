/**
 *
 */
export function __STACK__(offset: number = 0): any {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
        return stack;
    };
    const err = new Error();
    Error.captureStackTrace(err); //, arguments.callee);
    const stack = err.stack;
    Error.prepareStackTrace = orig;
    (stack as any).splice(0, offset + 1);
    return stack;
}

export const __FILENAME__ = (offset: number = 0) => {
    return __STACK__(offset + 1)[0].getFileName();
};

export const __LINE__ = (offset: number = 0) => {
    return __STACK__(offset + 1)[0].getLineNumber();
};

export const __FUNCTIONNAME__ = (offset: number = 0) => {
    return __STACK__(offset + 1)[0].getFunctionName();
};

export interface SMSourceLocation {
    line: number;
    column: number;
    functionName: string;
    fileName: string;
    str: string;
}

export const __FULLSOURCELOCATION__ = (offset: number = 0): SMSourceLocation => {
    const sourceLocation0 = __STACK__(offset + 1)[0];
    const line = sourceLocation0.getLineNumber();
    const column = sourceLocation0.getColumnNumber();
    const typeName = sourceLocation0.getTypeName();
    const methodName = sourceLocation0.getMethodName();
    const evalOrigin = sourceLocation0.getEvalOrigin();
    const functionName = sourceLocation0.getFunctionName() || (typeName ? typeName + "." + methodName : undefined) || evalOrigin;
    const functionName2 = `functon '${functionName}' at `;
    const fileName = sourceLocation0.getFileName();
    const str = `${functionName2}${fileName}:${line}:${column}`;

    return { functionName, fileName, line, column, str };
};

export const __METHODNAME__ = (offset: number = 0) => {
    return __STACK__(offset + 1)[0].getMethodName();
};
