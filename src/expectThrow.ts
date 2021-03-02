import { AnyObject } from "./AnyObject";
import {deepEqual} from "./deepEqual";

export const expectThrow = (callback: () => any, expectedProps: AnyObject = {}): Promise<void> | void => {
    let e = "no error thrown" as any;
    try {
        let r = callback();
        if (r instanceof Promise) {
            return (async () => {
                let e3 = "no error thrown" as any;
                try {
                    await r;
                } catch (e4) {
                    e3 = {} as AnyObject;
                    for (let p in expectedProps) e3[p] = e4[p];
                }

                if(!deepEqual(e3, expectedProps)) throw new Error(`Expected to deeply equal 'e3' to 'expectedProps'!`);
            })();
        }
    } catch (e2) {
        e = e2;
        e = {} as AnyObject;
        for (let p in expectedProps) e[p] = e2[p];
    }
    if(!deepEqual(e, expectedProps)) throw new Error(`Expected to deeply equal 'e' to 'expectedProps'!`);
};
