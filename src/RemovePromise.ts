export type RemovePromise<T> = T extends Promise<infer T2> ? T2 : T;
