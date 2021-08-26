import { globalVar } from "./globalVar.js";

export type DbgMonitorValueCallback = () => string;

export function dbgMonitorValue(callback: DbgMonitorValueCallback, interval: number = 300) {
    let oldV = "INITIAL_kalnwe1;23123i4097162e";

    function dbgMonitorValueInstance() {
        let newV;
        try {
            newV = callback();
        } catch (e) {
            newV = `ERROR: ${e.message}`;
        }

        if (newV !== oldV) {
            console.log(newV);
            oldV = newV;
        }
        setTimeout(dbgMonitorValueInstance, interval);
    }

    setTimeout(dbgMonitorValueInstance, interval);
}

// @yinstr-ignore @ts-ignore
globalVar().dbgMonitorValue = dbgMonitorValue;
