import { strSwitchEndsWith, strSwitchStartsWith } from "./strSwitch.js";
import { expectDeepEqual } from "./expectDeepEqual.js";

describe("strSwitch", () => {
    it("strSwitchEndsWith", () => {
        const switchDict = {
            ab: 1,
            bc: 2,
            cd: 3,
        } as const;
        expectDeepEqual(strSwitchEndsWith("abcd", switchDict), 3);
        expectDeepEqual(strSwitchEndsWith("abc", switchDict), 2);
        expectDeepEqual(strSwitchEndsWith("ab", switchDict), 1);
        expectDeepEqual(strSwitchEndsWith("a", switchDict), undefined);
    });

    it("strSwitchStartsWith", () => {
        const switchDict = {
            ab: 1,
            bc: 2,
            cd: 3,
        } as const;
        expectDeepEqual(strSwitchStartsWith("abcd", switchDict), 1);
        expectDeepEqual(strSwitchStartsWith("bcd", switchDict), 2);
        expectDeepEqual(strSwitchStartsWith("cd", switchDict), 3);
        expectDeepEqual(strSwitchStartsWith("d", switchDict), undefined);
    });
});
