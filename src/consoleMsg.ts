import { Severity, severityLongStr } from "./Severity.js";
import { globalObj } from "./globalObj.js";

export const isoDateFormat = "YYYY-MM-DD HH:mm:ss";
export const prefixSize = 19;

export interface YConsoleMsg {
    ts: string;
    cpl: string;
    severity: Severity;
    prefix: string;
    message: string;
    data?: any[];
}

export const yconsoleFormatMsg = (m: YConsoleMsg) =>
    `${severityLongStr(m.severity)} ${m.cpl} ${m.ts} ${(m.prefix + "                             ").substr(0, prefixSize)} - ${m.message}`;

export const debugMsgFactory = (prefix: string) => {
    if (globalObj().process.env.DEBUG) {
        const splitted = globalObj().process.env.DEBUG.split(" ");

        for (const s of splitted)
            if (prefix.startsWith(s))
                return (cpl: string, message: string, ...data: any[]) => {
                    const m: YConsoleMsg = {
                        ts: new Date().toISOString(),
                        cpl,
                        severity: "D",
                        prefix,
                        message,
                        data,
                    };

                    if (!globalObj().logger || globalObj().logger(m) === true) console.log(yconsoleFormatMsg(m), ...data);
                };
        // Implementation with debug - not working in VSCode...
        // const debugFunc = debugjs(prefix);
        // return (cpl: string, ...args: any[]) =>
        //     debugFunc(cpl, (new Date()).toISOString(), " - ", ...args);
    }

    return (() => {}) as any;
};

export const yconsole = {
    debug: (cpl: string, message: string | Error, ...data: any[]) => {
        if (message instanceof Error) {
            data = [message.stack, ...data];
            message = message.message;
        }

        const m: YConsoleMsg = {
            ts: new Date().toISOString(),
            cpl,
            severity: "D",
            prefix: "",
            message,
            data,
        };

        if (!globalObj().logger || globalObj().logger(m)) console.log(yconsoleFormatMsg(m), ...data);
    },

    log: (cpl: string, message: string | Error, ...data: any[]) => {
        if (message instanceof Error) {
            data = [message.stack, ...data];
            message = message.message;
        }

        const m: YConsoleMsg = {
            ts: new Date().toISOString(),
            cpl,
            severity: "I",
            prefix: "",
            message,
            data,
        };

        if (!globalObj().logger || globalObj().logger(m)) console.log(yconsoleFormatMsg(m), ...data);
    },

    warn: (cpl: string, message: string | Error, ...data: any[]) => {
        if (message instanceof Error) {
            data = [message.stack, ...data];
            message = message.message;
        }

        const m: YConsoleMsg = {
            ts: new Date().toISOString(),
            cpl,
            severity: "W",
            prefix: "",
            message,
            data,
        };

        if (!globalObj().logger || globalObj().logger(m)) console.warn(yconsoleFormatMsg(m), ...data);
    },

    error: (cpl: string, message: string | Error, ...data: any[]) => {
        if (message instanceof Error) {
            data = [message.stack, ...data];
            message = message.message;
        }

        const m: YConsoleMsg = {
            ts: new Date().toISOString(),
            cpl,
            severity: "E",
            prefix: "",
            message,
            data,
        };

        if (!globalObj().logger || globalObj().logger(m)) console.error(yconsoleFormatMsg(m), ...data);
    },

    fatal: (cpl: string, message: string | Error, ...data: any[]) => {
        if (message instanceof Error) {
            data = [message.stack, ...data];
            message = message.message;
        }

        const m: YConsoleMsg = {
            ts: new Date().toISOString(),
            cpl,
            severity: "F",
            prefix: "",
            message,
            data,
        };

        if (!globalObj().logger || globalObj().logger(m)) console.trace(yconsoleFormatMsg(m), ...data);
    },
};
