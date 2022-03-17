export const aggToObject = <D, R>(
    dataItems: D[],
    callback: (dataItem: D) => string | undefined,
    aggregator: { [key: string]: D[] } = {},
): { [key: string]: D[] } => {
    for (const dataItem of dataItems) {
        const aggKey: string | undefined = callback(dataItem);
        if (aggKey === undefined) {
            continue;
        }
        if (!aggregator[aggKey]) {
            aggregator[aggKey] = [dataItem];
        } else {
            aggregator[aggKey].push(dataItem);
        }
    }
    return aggregator;
};

export const aggToMap = <D, R>(dataItems: D[], callback: (dataItem: D) => string, aggregator: Map<string, D[]> = new Map()): Map<string, D[]> => {
    for (const dataItem of dataItems) {
        const aggKey: string | undefined = callback(dataItem);
        if (aggKey === undefined) {
            continue;
        }
        const aggArray = aggregator.get(aggKey);
        if (!aggArray) {
            aggregator.set(aggKey, [dataItem]);
        } else {
            aggArray.push(dataItem);
        }
    }
    return aggregator;
};

export const byTAggregator = <T extends { t: string }>(v: T) => v.t;
export const byNameAggregator = <T extends { name: string }>(v: T) => v.name;
