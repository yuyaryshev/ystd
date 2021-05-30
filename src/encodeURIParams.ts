export const encodeURIParams = (data: { [key: string]: string | number | boolean }): string => {
    const ret = [];
    for (const d in data) ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d].toString()));
    return ret.join("&");
};
