export type OptsWithDefaults<Opts, Defaults> = Exclude<Opts, Defaults> & Partial<Defaults>;

export function optsWithDefaults<Opts, Defaults>(opts0: OptsWithDefaults<Opts, Defaults> | undefined, defaults: Defaults): Opts {
    return {...defaults, ...(opts0 as any)} as Opts;
}