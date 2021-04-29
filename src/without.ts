import { deepClone } from "./deepClone.js";

export const removeFields = (value: any, fields: string[]): void => {
    for (const prop in value) {
        if (fields.includes(prop)) delete value[prop];
        else if (value[prop] instanceof Object) removeFields(value[prop], fields);
    }
};

export const without = (value: any, fields: string[]): object => {
    const new_value = deepClone(value);
    removeFields(new_value, fields);
    return new_value;
};
