import { yconsole } from "./consoleMsg.js";

export const globalHandler = (callback: (args?: any) => void | Promise<void>) =>
    async function (args?: any) {
        try {
            await callback(args);
        } catch (e: any) {
            yconsole.fatal(`CODE00000114`, e);
        }
    };
