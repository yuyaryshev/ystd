import { Decoder, number, oneOf, string, array } from "yuyaryshev-json-type-validation";

export type StringOrNumber = string | number;
export const decoderStringOrNumber: Decoder<StringOrNumber> = oneOf<StringOrNumber>(string(), number());
export function stringOrNumberToStr(v: StringOrNumber): string {
    return typeof v === "string" ? v : "" + v;
}

export type StringOrNumberOrArr = StringOrNumber | StringOrNumber[];
export const decoderStringOrNumberOrArr: Decoder<StringOrNumberOrArr> = oneOf<StringOrNumberOrArr>(
    decoderStringOrNumber,
    array(decoderStringOrNumber),
);

export function stringOrNumberOrArrToStr(v: StringOrNumberOrArr): string {
    return Array.isArray(v) ? v.join("/") : typeof v === "string" ? v : "" + v;
}

export type StringOrNumberArr = StringOrNumber[];
export const decoderStringOrNumberArr: Decoder<StringOrNumberArr> = oneOf<StringOrNumberArr>(array(decoderStringOrNumber));
export function stringOrNumberArrToStr(v: StringOrNumberOrArr): string {
    if (!Array.isArray(v)) {
        throw new Error(`CODE00001532 Expected stringOrNumberArr, but got non-array value!`);
    }
    return v.join("/");
}

export function isStringOrNumber(v: any): v is StringOrNumber {
    return typeof v === "string" || typeof v === "number";
}
