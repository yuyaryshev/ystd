/// <reference types="node" />
import { Decoder } from '@mojotech/json-type-validation';
import { Duration } from 'moment';

export declare const __FILENAME__: (offset?: number) => any;

export declare const __FULLSOURCELOCATION__: (offset?: number) => SMSourceLocation;

export declare const __FUNCTIONNAME__: (offset?: number) => any;

export declare const __LINE__: (offset?: number) => any;

export declare const __METHODNAME__: (offset?: number) => any;

/**
 *
 */
export declare function __STACK__(offset?: number): any;

export declare interface AbstractPool<T extends Poolable> {
    factory: Factory<T>;
    get(): Promise<T> | T;
    release(client: T): void;
    exec(callback: PoolCallback<T>): any;
    close(): void;
    call(funcName: string, ...args: any[]): Promise<any> | any;
}

/**
 * Increments <b>value</b> of <b>object</b>[<b>field</b>]. If <b>field</b> is undefined it is assigned to <b>value</b>.
 */
export declare function addToField(object: any, field: string, value: any): any;

/**
 *
 */
export declare function afterTokenPosStr(token: ITokenLike<any> | undefined): string;

/**
 *
 */
export declare function aggDuration(durationObj: DurationObj, aggDurationSettings?: AggDurationSettings): DurationObj;

export declare interface AggDurationSettings {
    HoursPerDay?: number;
    DaysPerWeek?: number;
    DaysPerMonth?: number;
    WeeksPerMonth?: number;
    WeeksPerYear?: number;
    DaysPerYear?: number;
    MonthPerYear?: number;
}

export declare interface AnimatedDataItem {
    ms: number;
    [key: string]: any;
}

export declare interface AnyObject {
    [key: string]: any;
}

export declare const approxWorkAggDurationSettings: AggDurationSettings;

/**
 *
 */
export declare function arrayExpectOne<T>(array: T[], cond: (v: T) => boolean, msg?: string): T;

export declare const asBoolean: (a: any) => boolean;

export declare const asNumber: (a: any) => number;

export declare const assertDbg: (x: boolean, message?: string | undefined) => void;

/**
 *
 */
export declare function assertNever(x: never, msg?: string, data?: any): never;

/**
 *
 */
export declare function assertNeverNoThrow(x: never, msg?: string, data?: any): never;

export declare const assertRel: (x: boolean, message?: string | undefined) => void;

export declare const asString: (a: any) => string;

export declare class AvgCounter {
    part?: IPart;
    parts: IPart[];
    maxParts: number;
    closed: boolean;
    constructor(maxParts: number, interval: number);
    next_part(): IPart;
    inc(key?: string | number): void;
    stats(n?: number): {
        keys: number;
        values: number;
    };
    full(n?: number): {
        keys: number;
        values: number;
    } & {
        m: Map<any, any>;
    };
    close(): void;
}

/**
 *
 */
export declare function awaitDelay(ms: number): Promise<unknown>;

export declare type BreakpointCallback = (token: IToken) => void;

export declare type CancelFunction = () => Promise<void> | void;

export declare type CompareFunc<T> = <T = any>(a: T, b: T) => number;

export declare class CompilationError<CompilationContextT> extends Error {
    compilationContext?: CompilationContextT | undefined;
    lexer?: Lexer<CompilationContextT> | undefined;
    severity: Severity;
    cpl: string;
    token?: ITokenLike | undefined;
    shortMessage: string;
    constructor(severity: Severity, cpl: string, where: Lexer<CompilationContextT> | ITokenLike | undefined, shortMessage: string);
}

export declare const consoleLogFile: (filePath: string, content: string) => void;

/**
 *
 */
export declare function containerAdd<T>(cont: T[] | Set<T>, value: T): T | undefined;

/**
 *
 */
export declare function containerDelete<T>(cont: T[] | Set<T> | undefined, value: T): T | undefined;

export declare type Cpl = string;

export declare const dateAdd: (date: Date, milliseconds: number) => Date;

export declare const dateDiff: (a: Date | string, b: Date | string) => number;

export declare const Days = 86400000;

export declare const dbgStr: (v: any, depth?: number, indent?: string, set?: any) => string;

/**
 *
 */
export declare function dbgStringify(v: any): string;

export declare const dbgStrOld: (v: any) => string;

export declare const dbgToString: (v: any) => string;

export declare const debugMsgFactory: (prefix: string) => any;

export declare const debugStringify: (value: any) => string;

export declare const decoderPrimitiveArray: Decoder<PrimitiveArray>;

export declare const deepClone: any;

export declare const deepEqual: (a: any, b: any) => boolean;

export declare type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};

export declare const defaultCompare: <T = any>(a: T, b: T) => 1 | -1 | 0;

/**
 *
 */
export declare function deleteKeys(o: any, keys?: string[] | Set<string>): void;

/**
 *
 */
export declare function dummyFunc1(a: number, b: number): number;

export declare type DurationEngStr = string;

/**
 *
 */
export declare function durationEngStrToDurationObj(vv: DurationEngStr): DurationObj;

export declare type DurationMs = number;

export declare interface DurationObj {
    sign?: number;
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

/**
 *
 */
export declare function durationObjToEngStr(durationObj: DurationObj, maxParts?: number): DurationEngStr;

export declare type DurationRusStr = string;

export declare const encodeURIParams: (data: {
    [key: string]: string | number | boolean;
}) => string;

export declare interface EnvWithTimers {
    timers: Set<ManageableTimer>;
}

export declare const equal: (a: any, b: any) => boolean;

/**
 *
 */
export declare function escapeRegex(s: string): string;

export declare const exceptFunctions: (v: any) => any;

/**
 *
 */
export declare function execOnce(symbolOrObject: Symbol | Object, delay: number, callback: () => Promise<any> | any): Promise<void>;

/**
 *
 */
export declare function expectOne<T, R>(container: T[] | Set<T>, filterFunc: ExpectOneCallback<T, R>): R;

export declare type ExpectOneCallback<T, R> = (item: T, index: number) => R | undefined;

/**
 *
 */
export declare function expectOnlyMsDuration(durationObj: DurationObj | undefined): DurationMs;

export declare const expectThrow: (callback: () => any, expectedProps?: AnyObject) => Promise<void> | void;

export declare const extractFields: (v: AnyObject, fields: string[]) => any;

export declare interface Factory<T extends Poolable> {
    produce(): Promise<T> | T;
}

/**
 *
 */
export declare function filterObject(object: any, keysOrFilterCallback: string[] | ((key: string, object: any) => boolean), invert?: boolean): any;

export declare interface FilterSettings {
    keepFunctions?: boolean;
    excluded?: string[] | string;
    included?: string[] | string;
    reduce?: string[] | string;
}

export declare const firstCharLower: (s: string) => string;

export declare const firstCharUpper: (s: string) => string;

/**
 *
 */
export declare function fjmap<T>(array: T[], sep: string, callback: (item: T, index: number) => string | number | undefined | null): string;

/**
 *
 */
export declare function fmap<T, R>(array: T[], callback: (item: T, index: number) => R | null | undefined): R[];

export declare const formatSql: (sqlSourceCode: string) => string;

export declare const formatTypescript: (typescriptSourceCode: string) => string;

export declare const getClassName: (v: any) => string | undefined;

/**
 *
 */
export declare function getSqlWhereOperator(mode: string): "=" | "<" | ">" | "like" | "in" | "is null" | ">=" | "<=";

export declare const globalHandler: (callback: (args?: any) => void | Promise<void>) => (args?: any) => Promise<void>;

/**
 *
 */
export declare function globalObj(): (Window & typeof globalThis) | (NodeJS.Global & typeof globalThis);

export declare const Hours = 3600000;

export declare interface IntervalsSqlRow {
    id: number;
    m: number;
    c: number;
}

export declare type IntId = number;

export declare class IntIdManager {
    readonly defaultInterval: IntInterval;
    protected _intervals: IntInterval[];
    changed: boolean;
    constructor(defaultInterval?: IntInterval);
    removeInvalidIntervals(): void;
    get intervals(): IntInterval[];
    set intervals(v: IntInterval[]);
    removeId(id: IntId): void;
    newId(): IntId;
    clear(): void;
    makeIntervalsSql(tableName: string, limit?: number): string;
    intervalsSqlRowsToIntervals(orderedIntervalsSqlRows: IntervalsSqlRow[]): void;
}

export declare interface IntInterval {
    a: number;
    b: number;
}

export declare interface IPart {
    m: Map<any, any>;
    keys: number;
    values: number;
}

export declare const isAnyObject: (v: any) => v is AnyObject;

/**
 *
 */
export declare function isNumber(v: any): v is number;

export declare const isoDateFormat = "YYYY-MM-DD HH:mm:ss";

/**
 *
 */
export declare function isOnlyMsDuration(durationObj: DurationObj | undefined): boolean;

export declare const isPrimitiveArray: (v: any) => v is PrimitiveArray;

export declare interface IToken<T = ITokenValueType> extends ITokenLike<T> {
    lexer: Lexer<unknown>;
    token_type: number;
    t: string;
    p: number;
    line: number;
    linep?: number;
    len: number;
    v: T;
}

export declare type ITokenFilterType = string | number | string[];

export declare interface ITokenLike<T = ITokenValueType> {
    lexer?: Lexer<unknown>;
    token_type?: number;
    t?: string;
    p?: number;
    line?: number;
    linep?: number;
    len?: number;
    v: T;
}

export declare type ITokenValueType = string | number | undefined;

export declare type Jsonable = undefined | string | number | boolean | JsonableObject | JsonableArray;

export declare interface JsonableArray extends Array<Jsonable> {
}

export declare interface JsonableObject {
    [x: string]: Jsonable;
}

/**
 *
 */
export declare function lexAll<CompilationContextT = unknown>(s: string, filePath: string, context: CompilationContextT): IToken[];

export declare class Lexer<CompilationContextT = unknown> {
    context: CompilationContextT;
    filePath: string;
    s: string;
    line: number;
    linestartp: number;
    p: number;
    next_tokens: IToken[];
    max_token_length: number;
    skip_spaces: boolean;
    skip_comments: boolean;
    breakpoint?: number | undefined;
    onBreakpoint: BreakpointCallback | undefined;
    constructor(s: string, filePath: string, context: CompilationContextT);
    debugString(cursorStr?: string): string;
    setBreakpoint(position: number | string, breakpointCallback?: BreakpointCallback): void;
    readToken<T = string>(len: number, token_type?: number, parserFunc?: TokenValueParser<T>): IToken<T>;
    emptyToken(): IToken<undefined>;
    advance(opts?: LexerReadOpts | undefined): IToken<ITokenValueType> | undefined;
    done(opts?: LexerReadOpts | undefined): boolean;
    substr_with_adjusted_linenums(len: number): string;
    read_fixed(len: number): IToken<string>;
    read_till(regexp_or_regexps: string | string[] | RegExp | RegExp[]): ReadTillResult;
    split(regexp_or_regexps: RegExp | RegExp[], callback?: SplitCallback): IToken<string>[];
    next(offset?: number, opts?: LexerReadOpts | undefined): IToken | undefined;
    uncache_next_tokens(): void;
    read(token_filter: 32 | 64 | 96, opts?: LexerReadOpts | undefined): IToken<number> | undefined;
    read(token_filter: 1 | 2 | 4 | 128 | 256 | 512 | 896 | (128 | 256 | 512), opts?: LexerReadOpts | undefined): IToken<string> | undefined;
    read(token_filter: ITokenFilterType, opts?: LexerReadOpts | undefined): IToken | undefined;
    expect(token_filter: 32 | 64, expected_name?: string, cpl?: string): IToken<number>;
    expect(token_filter: 1 | 2 | 4 | 128 | 256 | 512 | 2048, expected_name?: string, cpl?: string): IToken<string>;
    expect(token_filter: ITokenFilterType, expected_name?: string, cpl?: string): IToken;
    read_next_token_identifier(): IToken<string>;
    read_next_token_number(): IToken | undefined;
    read_next_token_space(): IToken | undefined;
    read_next_token_singleline_comment(): IToken | undefined;
    read_next_token_multiline_comment(): IToken | undefined;
    read_next_token_code(): IToken | undefined;
    read_next_token_squoted(): IToken | undefined;
    read_next_token_dquoted(): IToken | undefined;
    read_next_token_tquoted(): IToken | undefined;
    read_all(): IToken[];
    read_next_token(opts?: LexerReadOpts | undefined): IToken | undefined;
}

export declare class LexerError<CompilationContextT> extends CompilationError<CompilationContextT> {
}

/**
 *
 */
export declare function lexerPosStr(lexer: Lexer<any> | undefined): string;

export declare interface LexerReadOpts {
    disableStrings?: boolean;
}

/**
 *
 */
export declare function linearDataInterpolation<T extends AnimatedDataItem>(items: T[], timePos?: number, timeScale?: number): T;

/**
 *
 */
export declare function makeMomentInterval(vv: string): Duration;

/**
 *
 */
export declare function makeMomentIntervals(vv: string): Duration[];

export declare const makeParallel: () => {
    add: (promise_or_promises: Promise<any> | Promise<any>[]) => void;
    wait: () => Promise<void>;
};

export declare const makePool: <T extends Poolable>(settings: PoolSettings<T>) => AbstractPool<T>;

/**
 *
 */
export declare function makePromise<T>(): SavedPromise<T>;

export declare interface MakePromiseVoid {
    promise: Promise<void>;
    resolve: () => void;
    reject: (e: Error) => void;
}

export declare const makePromiseVoid: () => MakePromiseVoid;

/**
 *
 */
export declare function makeTokenWriter(lexer: Lexer): {
    lexer: Lexer<unknown>;
    parts: WriterPart[];
    replace: (token: IToken<string>, replacement: string) => void;
    keep(token: IToken<string>): void;
    generateWithOutSourcemap(): string;
};

export declare const makeYDictGenericClass: <K, CV extends new (...args: any) => any>(elemClass: CV, prop: string) => {
    new (): {
        getKey(v: InstanceType<CV>): K;
        setKey(v: InstanceType<CV>, k: K): void;
        construct(k: K): InstanceType<CV>;
        m: Map<K, InstanceType<CV>>;
        has(k: K): boolean;
        get(k: K): InstanceType<CV> | undefined;
        delete(k: K): boolean;
        add(v: InstanceType<CV>): Map<K, InstanceType<CV>>;
        getOrCreate(k: K): InstanceType<CV>;
        expect(k: K): InstanceType<CV>;
        createOrThrow(k: K): InstanceType<CV>;
        setEmptyOrThrow(k: K, v: InstanceType<CV>): void;
        deleteOrThrow(k: K): void;
        rekeyOrThrow(oldKey: K, newKey: K): void;
        addOrThrow(v: InstanceType<CV>): void;
        [Symbol.iterator](): Generator<InstanceType<CV>, void, unknown>;
    };
};

/**
 *
 */
export declare function manageableSetInterval<Env extends EnvWithTimers = EnvWithTimers>(callback: () => void | Promise<void>, timeout: number, env: Env, cpl: string, name: string): void;

/**
 *
 */
export declare function manageableSetTimeout<Env extends EnvWithTimers = EnvWithTimers>(callback: () => void | Promise<void>, timeout: number, env: Env, cpl: string, name: string): void;

export declare interface ManageableTimer<Env extends EnvWithTimers = EnvWithTimers> {
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
export declare function manageableTimer<Env extends EnvWithTimers = EnvWithTimers>(env: Env, timeout: number, cpl: string, name: string, callback: () => void | Promise<void>): ManageableTimer<Env>;

export declare const mapMirrorDelta: <K, V>(m: Map<K, V>) => {
    deleted: Map<K, V>;
    mapSet: (k: K, v: V) => void;
};

/**
 *
 */
export declare function mapToObject<K extends string, V>(m: Map<K, V>): {
    [key: string]: V;
};

export declare type MaybePromise<T> = Promise<T> | T;

export declare const maybePromiseApply: <S, R>(v: MaybePromise<S>, f: (v: S) => R) => MaybePromise<R>;

/**
 *
 */
export declare function mergeConditions(conds: (string | null | undefined)[], sep: string): string;

export declare const messageStringify: (value: any) => string;

export declare const MilliSeconds = 1;

export declare const Minutes = 60000;

/**
 *
 */
export declare function moveToContainer<T extends ObjectWithCont<T>>(cont: T[] | Set<T> | undefined, value: T): void;

export declare const newId: () => string;

export declare const newIdNoSep: () => string;

export declare const newStringBuilder: () => any;

/**
 *
 */
export declare function nonEmptyStr(a: string | undefined | null): boolean;

export declare const noop: (...args: any[]) => void;

export declare const noopTrue: (...args: any[]) => boolean;

export declare const objectFilter: (v: any, filterSettings?: FilterSettings | undefined) => any;

export declare type ObjectId = string;

export declare type ObjectIds = ObjectId[];

/**
 *
 */
export declare function objectIterator(o: any): [string, any][];

export declare interface ObjectWithCont<T> {
    container: T[] | Set<T> | undefined;
}

export declare interface ObjectWithId {
    id: ObjectId;
}

declare type Omit_2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export { Omit_2 as Omit }

export declare type OptionalPromise<T> = Promise<T | undefined> | T | undefined;

export declare type OptsWithDefaults<Opts, Defaults> = Exclude<Opts, Defaults> & Partial<Defaults>;

/**
 *
 */
export declare function optsWithDefaults<Opts, Defaults>(opts0: OptsWithDefaults<Opts, Defaults> | undefined, defaults: Defaults): Opts;

export declare const pad: (v: number, strLength: number) => string;

export declare const parseCODEBlock: (s: string) => string;

export declare const parseEscapedStringValue: (s: string) => string;

/**
 * Pool stores pool-objects (example - connection to database) allowing reuse of them. This allows to mitigate time needed for
 * pool-object initialization. Pool also limits number of concurrent pool-objects. Example: for database reducing connections number reduces
 * RAM usage and increases queries perfomance.
 */
export declare class Pool<T extends Poolable> extends PoolBase<T> implements AbstractPool<T> {
    freeClients: T[];
    allClients: T[];
    waitingQueue: SavedPromiseArray<T>;
    maxCount: number;
    minCount: number;
    worksetCount: number;
    regularWorkDelay: number;
    regularWorkScheduled: boolean;
    regularWorkRuns: number;
    regularWorkRunsLeft: number;
    /**
     * Creates a new Pool<T>
     *
     * @param settings - PoolSettings
     */
    constructor(settings: PoolSettings<T>);
    get freeCount(): number;
    get totalCount(): number;
    get busyCount(): number;
    scheduleRegularWork(): void;
    /**
     * Private. Should not be used directly.
     * Calculates workset and adjusts current pool-object count accordingly, runs periodically on setTimeout.
     *
     * @internal
     */
    _regularWork(): Promise<void>;
    /**
     * Obtains a pool-object from pool. If no free DbClients available a new one will be created.
     * If connectionLimit is reached - will wait for a free pool-object.
     *
     * UNSAFE! Better use exec(callback)
     *
     */
    get(): Promise<T> | T;
    release(client: T): void;
    /**
     * Closes all corresponding pool-objects and the pool
     */
    close(forced?: boolean): Promise<void> | void;
}

export declare interface Poolable {
    pool?: AbstractPool<any>;
    close(forced?: boolean): Promise<void> | void;
}

/**
 * Pool stores pool-objects (example - connection to database) allowing reuse of them. This allows to mitigate time needed for
 * pool-object initialization. Pool also limits number of concurrent pool-objects. Example: for database reducing connections number reduces
 * RAM usage and increases queries perfomance.
 */
export declare abstract class PoolBase<T extends Poolable> {
    factory: Factory<T>;
    closing?: SavedPromise<void>;
    protected constructor(settings: PoolSettings<T>);
    abstract get(): Promise<T> | T;
    abstract release(t: T): void;
    exec(callback: PoolCallback<T>): Promise<any>;
    call(funcName: string, ...args: any[]): Promise<any>;
}

export declare type PoolCallback<T extends Poolable> = (resource: T, pool?: AbstractPool<T>) => Promise<any> | any;

export declare interface PoolSettings<T extends Poolable> {
    factory: Factory<T>;
    singleConnection?: boolean;
    maxClients?: number;
    minClients?: number;
    regularWorkRuns?: number;
}

export declare const prefixSize = 19;

export declare type PrimitiveArray = PrimitiveValue[];

export declare interface PrimitiveObject {
    [key: string]: PrimitiveValueOrArray;
}

export declare type PrimitiveValue = undefined | null | boolean | number | string | Date;

export declare type PrimitiveValueOrArray = PrimitiveValue | PrimitiveValue[];

export declare class ProducedClass {
    x: number;
    constructor();
}

export declare interface ReadTillMatched extends IToken<string> {
    matched: true;
    matchedWith: string | RegExp;
    matchedStr: string;
    input: string;
    groups: {
        [key: string]: string;
    } | undefined;
    values: string[] | undefined;
}

export declare interface ReadTillResult {
    prefix: IToken<string>;
    matched: ReadTillMatched | undefined;
}

export declare const recursiveDeleteKey: (v: any, ...keys: string[]) => void;

/**
 *
 */
export declare function removeDublicates<T>(a: T[]): T[];

/**
 *
 */
export declare function removeEmpty<T>(data: T): T;

export declare const removeFields: (value: any, fields: string[]) => void;

export declare const removePrefix: (s: string, prefix: string) => string;

export declare const removeSecurityData: (obj: any, security_keys: string[]) => any;

export declare const removeSuffix: (s: string, suffix: string) => string;

/**
 *
 */
export declare function removeUndefined<T extends {
    [key: string]: any;
}>(obj: T): T;

export declare interface ReversePromise {
    cpl?: string;
    c: number;
    e?: Error;
    resolveItem: () => void;
    rejectItem: (e: Error) => void;
    promise: Promise<void>;
    resolvePromise: () => void;
    rejectPromise: (e: Error) => void;
}

export declare const reversePromise: (c: number, cpl?: string | undefined) => ReversePromise;

export declare const reversePromiseRejectItem: (reversePromise: ReversePromise | undefined, e: Error) => void;

export declare const reversePromiseResolveItem: (reversePromise: ReversePromise | undefined) => void;

export declare interface SavedPromise<T> {
    promise: Promise<T>;
    resolve: (v: T) => void;
    reject: (err: any) => void;
}

export declare type SavedPromiseArray<T> = Array<SavedPromise<T>>;

export declare const Seconds = 1000;

export declare const setIntervalEx: (callback: SetIntervalExCallback, intervalBetweenCalls: number) => void;

export declare type SetIntervalExCallback = () => boolean | undefined;

export declare type Severity = "F" | "E" | "W" | "I" | "D";

export declare type SeverityLong = "FATAL" | "ERROR" | "WARN " | "INFO " | "DEBUG";

export declare const severityLongStr: (severity: Severity) => SeverityLong;

/**
 *
 */
export declare function single<T>(array: T[]): T;

/**
 * Not really a pool implementation. Uses one and only pool-object, but behaves like a pool.
 */
export declare class SingleConnectionPool<T extends Poolable> extends PoolBase<T> implements AbstractPool<T> {
    client?: T;
    isFree: boolean;
    waitingQueue: SavedPromiseArray<T>;
    /**
     * Creates a new SingleConnectionPool<T>
     * Not really a pool. Always uses just one pool-object.
     * The pool-object is created on the first get()
     */
    constructor(settings: PoolSettings<T>);
    /**
     * Obtains a pool-object from pool. If no free DbClients available a new one will be created.
     * If connectionLimit is reached - will wait for a free pool-object.
     *
     * UNSAFE! Better use exec(callback)
     *
     */
    get(): Promise<T> | T;
    release(client: T): void;
    /**
     * Closes all corresponding pool-objects and the pool
     */
    close(forced?: boolean): Promise<void> | void;
}

export declare interface SMSourceLocation {
    line: number;
    column: number;
    functionName: string;
    fileName: string;
    str: string;
}

/**
 *
 */
export declare function sortBy(fields: string | string[]): (a: any, b: any) => number;

/**
 *
 */
export declare function sorterFuncSrc(fields: string | string[]): string;

/**
 *
 */
export declare function sortObjects(objectsArray: any[], fields: string | string[]): any[];

export declare type SplitCallback = (item: ReadTillMatched | IToken<string>) => boolean | void | undefined;

export declare const splitIfString: (v: any, sep?: any) => any;

export declare const strict24_7_AggDurationSettings: AggDurationSettings;

export declare const strictWorkAggDurationSettings: AggDurationSettings;

/**
 *
 */
export declare function strIntervalsToDurationObjs(vv: DurationEngStr): DurationObj[];

/**
 *
 */
export declare function strNvl(a: string | undefined | null, b: string): string;

/**
 *
 */
export declare function strNvlT(strings: TemplateStringsArray, ...args: (string | undefined | null | number | boolean)[]): string;

/**
 *
 */
export declare function strReplace(containerString: string, sourceString: string, targetString: string): string;

/**
 *
 */
export declare function tokenPosStr(token: ITokenLike<any> | undefined): string;

export declare type TokenValueParser<T> = (s: string) => T;

export declare const trimAll: (s: string) => string;

export declare const tt: {
    none: 0;
    punctuator: 1;
    space: 2;
    identifier: 4;
    int: 32;
    float: 64;
    number: number;
    squoted: 128;
    dquoted: 256;
    tquoted: 512;
    string: 128 | 256 | 512;
    comment: 1024;
    code: 2048;
};

/**
 *
 */
export declare function unaggDuration(durationObj: DurationObj, aggDurationSettings: AggDurationSettings): DurationObj;

/**
 *
 */
export declare function undefinedKeys(o: any, keys?: string[] | Set<string>): void;

export declare const valueByPath: (v: AnyObject, path: string[]) => AnyObject;

/**
 *
 */
export declare function waitAll(...promises: Promise<any>[]): Promise<void>;

export declare const Weeks = 604800000;

export declare interface WithIdAndName<IDT> {
    id: IDT;
    name: string;
}

export declare interface WithName {
    name: string;
}

export declare const without: (value: any, fields: string[]) => object;

export declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};

export declare interface WriterPart {
    s: IToken<string>;
    r: string;
}

export declare const yconsole: {
    debug: (cpl: string, message: string | Error, ...data: any[]) => void;
    log: (cpl: string, message: string | Error, ...data: any[]) => void;
    warn: (cpl: string, message: string | Error, ...data: any[]) => void;
    error: (cpl: string, message: string | Error, ...data: any[]) => void;
    fatal: (cpl: string, message: string | Error, ...data: any[]) => void;
};

export declare const yconsoleFormatMsg: (m: YConsoleMsg) => string;

export declare interface YConsoleMsg {
    ts: string;
    cpl: string;
    severity: Severity;
    prefix: string;
    message: string;
    data?: any[];
}

export declare abstract class YDictGeneric<K, V> {
    m: Map<K, V>;
    abstract getKey(v: V): K;
    constructor();
    construct(k: K): V;
    has(k: K): boolean;
    get(k: K): V | undefined;
    delete(k: K): boolean;
    add(v: V): Map<K, V>;
    getOrCreate(k: K): V;
    expect(k: K): V;
    createOrThrow(k: K): V;
    setEmptyOrThrow(k: K, v: V): void;
    deleteOrThrow(k: K): void;
    rekeyOrThrow(oldKey: K, newKey: K): void;
    addOrThrow(v: V): void;
    [Symbol.iterator](): Generator<V, void, unknown>;
}

export declare class YDictIdNameSequential<IDT, V extends WithIdAndName<IDT>> {
    itemClass: any;
    sequence: V[];
    byIdMap: Map<IDT, V>;
    byNameMap: Map<string, V>;
    constructor(itemClass: any);
    create(...args: any[]): V;
    hasId(k: IDT): boolean;
    hasName(k: string): boolean;
    getById(k: IDT): V | undefined;
    getByName(k: string): V | undefined;
    add(v: V): V;
    getOrCreateById(id: IDT, ...createArgs: any[]): V;
    getOrCreateByName(name: string, ...createArgs: any[]): V;
    expectById(id: IDT): V;
    expectByName(name: string): V;
    createByNameOrThrow(name: string, ...createArgs: any[]): void;
    deleteByV(v: V): void;
    deleteById(id: IDT): void;
    deleteByName(name: string): void;
    deleteByIdOrThrow(id: IDT): void;
    deleteByNameOrThrow(name: string): void;
    renameOrThrow(oldName: string, newName: string): void;
    changeIdOrThrow(oldId: IDT, newId: IDT): void;
    [Symbol.iterator](): Generator<V, void, unknown>;
    map(cb: (v: V, index: number) => any): any[];
    rebuildIndexes(): void;
    get array(): V[];
    get empty(): boolean;
}

export declare class YDictIdNameUnordered<IDT, V extends WithIdAndName<IDT>> {
    itemClass: any;
    byIdMap: Map<IDT, V>;
    byNameMap: Map<string, V>;
    constructor(itemClass: any);
    create(...args: any[]): V;
    hasId(k: IDT): boolean;
    hasName(k: string): boolean;
    getById(k: IDT): V | undefined;
    getByName(k: string): V | undefined;
    add(v: V): void;
    getOrCreateById(id: IDT, ...createArgs: any[]): V;
    getOrCreateByName(name: string, ...createArgs: any[]): V;
    expectById(id: IDT): V;
    expectByName(name: string): V;
    createByNameOrThrow(name: string, ...createArgs: any[]): void;
    deleteByV(v: V): void;
    deleteById(id: IDT): void;
    deleteByName(name: string): void;
    deleteByIdOrThrow(id: IDT): void;
    deleteByNameOrThrow(name: string): void;
    renameOrThrow(oldName: string, newName: string): void;
    changeIdOrThrow(oldId: IDT, newId: IDT): void;
    [Symbol.iterator](): Generator<V, void, unknown>;
    get array(): V[];
    get arrayFromIdMap(): V[];
    get arrayFromNameMap(): V[];
    map(cb: (v: V, index: number) => any): any[];
    rebuildIndexesFromNameIndex(): void;
    rebuildIndexesFromIdIndex(): void;
    get empty(): boolean;
}

export declare class YDictNameSequential<V extends WithName> {
    itemClass: any;
    sequence: V[];
    byNameMap: Map<string, V>;
    constructor(itemClass: any);
    create(...args: any[]): V;
    hasName(k: string): boolean;
    getByName(k: string): V | undefined;
    add(v: V): void;
    getOrCreateByName(name: string, ...createArgs: any[]): V;
    expectByName(name: string): V;
    createByNameOrThrow(name: string, ...createArgs: any[]): void;
    deleteByV(v: V): void;
    deleteByName(name: string): void;
    deleteByNameOrThrow(name: string): void;
    renameOrThrow(oldName: string, newName: string): void;
    [Symbol.iterator](): Generator<V, void, unknown>;
    map(cb: (v: V, index: number) => any): any[];
    rebuildIndexes(): void;
    get array(): V[];
    get empty(): boolean;
}

export declare class YDictNameUnordered<V extends WithName> {
    itemClass: any;
    byNameMap: Map<string, V>;
    constructor(itemClass: any);
    create(...args: any[]): V;
    hasName(k: string): boolean;
    getByName(k: string): V | undefined;
    add(v: V): void;
    getOrCreateByName(name: string, ...createArgs: any[]): V;
    expectByName(name: string): V;
    createByNameOrThrow(name: string, ...createArgs: any[]): void;
    deleteByV(v: V): void;
    deleteByName(name: string): void;
    deleteByNameOrThrow(name: string): void;
    renameOrThrow(oldName: string, newName: string): void;
    [Symbol.iterator](): Generator<V, void, unknown>;
    map(cb: (v: V, index: number) => any): any[];
    get array(): V[];
    get empty(): boolean;
}

export declare const ymutex: typeof ysemaphore;

export declare type YSemaphore = {
    lockCount: number;
    lockCountNow: number;
    lock: <T>(asyncCallback: () => Promise<T>) => Promise<T>;
};

/**
 *
 */
export declare function ysemaphore(n?: number, releaseDelay?: number): YSemaphore;

export declare class YSet<T> extends Set<T> {
    addOrThrow(v: T): void;
    deleteOrThrow(v: T): void;
    rekeyOrThrow(oldKey: T, newKey: T): void;
}

export declare const yyaDeepClone: (aObject: any) => any;

export { }
