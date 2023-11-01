export interface EnvWithTimers {
    timers: Set<ManageableTimer>;
}

export interface ManageableTimer<Env extends EnvWithTimers = EnvWithTimers> {
    env: Env;
    cpl: string;
    name: string;
    lastRun?: Date | undefined;
    timeout: number;
    disabled?: boolean;
    timeoutHandle?: any;

    stop: () => void;
    cancel: () => void;
    setTimeout: (timeoutOverride?: number) => void;
    setInterval: (timeoutOverride?: number) => void;
    notSoonerThan: () => undefined | Promise<void>;
    disable: () => void;
    enable: () => void;
    executeNow: () => Promise<void>;
}

/**
 *
 */
export function manageableTimer<Env extends EnvWithTimers = EnvWithTimers>(
    env: Env,
    timeout: number,
    cpl: string,
    name: string,
    callback: () => void | Promise<void>,
) {
    if (!env) {
        throw new Error(`${cpl} ERROR Can't create manageableTimer because 'env' is empty!`);
    }

    /**
     *
     */
    async function directRun() {
        pthis.lastRun = new Date();
        try {
            await callback();
        } catch (e) {
            pthis.lastRun = new Date();
            console.error(`CODE00000194`, `Unhandled exception in timer!`);
        }
    }

    /**
     *
     */
    function stop() {
        if (pthis.timeoutHandle) {
            clearTimeout(pthis.timeoutHandle);
            delete pthis.timeoutHandle;
            env?.timers.delete(pthis);
        }
    }

    /**
     *
     */
    function mSetTimeout(timeoutOverride?: number) {
        if (!env) {
            throw new Error(`${cpl} ERROR Can't start timer because 'env' is empty!`);
        }
        stop();
        if (pthis.disabled) return;
        env.timers.add(pthis);
        pthis.timeoutHandle = setTimeout(
            async () => {
                stop();
                await directRun();
            },
            timeoutOverride === undefined ? timeout : timeoutOverride,
        );
    }

    /**
     *
     */
    function mSetInterval(timeoutOverride?: number) {
        if (!env) {
            throw new Error(`${cpl} ERROR Can't start timer because 'env' is empty!`);
        }
        stop();
        if (pthis.disabled) return;
        env.timers.add(pthis);
        pthis.timeoutHandle = setInterval(
            async () => {
                await directRun();
            },
            timeoutOverride === undefined ? timeout : timeoutOverride,
        );
    }

    /**
     *
     */
    async function executeNow() {
        stop();
        await directRun();
    }

    /**
     *
     */
    function notSoonerThan(): undefined | Promise<void> {
        if (!pthis.lastRun || new Date().valueOf() - (pthis.lastRun ? pthis.lastRun.valueOf() : 0) > timeout) return executeNow();
        return undefined;
    }

    /**
     *
     */
    function disable() {
        pthis.disabled = true;
        stop();
    }

    /**
     *
     */
    function enable() {
        delete pthis.disabled;
    }

    const pthis: ManageableTimer<Env> = {
        env,
        cpl,
        name,
        timeout,
        stop,
        cancel: stop,
        setTimeout: mSetTimeout,
        setInterval: mSetInterval,
        disable,
        enable,
        executeNow,
        notSoonerThan,
    };

    return pthis;
}

// Синоним. Но список параметров совместим со стандартным setTimeout
/**
 *
 */
export function manageableSetTimeout<Env extends EnvWithTimers = EnvWithTimers>(
    callback: () => void | Promise<void>,
    timeout: number,
    env: Env,
    cpl: string,
    name: string,
) {
    return manageableTimer(env, timeout, cpl, name, callback).setTimeout();
}

// Синоним. Но список параметров совместим со стандартным setTimeout
/**
 *
 */
export function manageableSetInterval<Env extends EnvWithTimers = EnvWithTimers>(
    callback: () => void | Promise<void>,
    timeout: number,
    env: Env,
    cpl: string,
    name: string,
) {
    return manageableTimer(env, timeout, cpl, name, callback).setInterval();
}

export type JobSetJobRes = number | undefined | boolean | void | null;
export type JobSetJob = () => JobSetJobRes | Promise<JobSetJobRes>;
export class JobSet {
    public readonly timeout: number;
    public readonly cpl: string;
    public readonly name: string;
    private jobs: Set<JobSetJob> = new Set();
    private mTimer: ManageableTimer;

    constructor(env: EnvWithTimers, timeout: number, cpl: string, name: string) {
        if (!env) {
            throw new Error(`${cpl} ERROR Can't create JobSet 'env' is empty!`);
        }
        this.timeout = timeout;
        this.cpl = cpl;
        this.name = name;
        const JobSet_doJobs = async () => {
            for (const job of this.jobs) {
                let r: JobSetJobRes;
                try {
                    r = await job();
                } catch (e: any) {
                    console.warn(`CODE00000195 Jobs in JobSet shouldn't throw!`, e);
                    r = -1;
                }
                if (r === undefined || r === null || r === false || (typeof r === "number" && r < 0)) {
                    this.remove(job);
                }
            }
            if (this.jobs.size) {
                this.mTimer.setTimeout();
            }
        };
        this.mTimer = manageableTimer(env, timeout, cpl, name, JobSet_doJobs);
    }

    add(job: JobSetJob) {
        this.jobs.add(job);
        this.mTimer.enable();
        this.mTimer.setTimeout();
    }

    remove(job: JobSetJob) {
        this.jobs.delete(job);
    }
}
