import { expect } from "chai";
import { EnvWithTimers, JobSet } from "./manageableTimer.js";
import { awaitDelay } from "./awaitDelay.js";

describe(`managableTimer.test.ts`, function () {
    it(`JobSet`, async function () {
        const env: EnvWithTimers = { timers: new Set() };
        const jobSet = new JobSet(env, 10, "CODE00000193", "JobSetTest1");
        const log: string[] = [];
        jobSet.add(() => {
            log.push("single-run job 1");
        });
        let counter = 3;
        jobSet.add(() => {
            log.push(`multi-run job ${counter--}`);
            return counter > 0 ? 0 : -1;
        });

        jobSet.add(() => {
            log.push("single-run job 2");
        });

        await awaitDelay(200);
        expect(log).to.deep.equal(["single-run job 1", "multi-run job 3", "single-run job 2", "multi-run job 2", "multi-run job 1"]);
    });
});
