import { StringOrNumber } from "./StringOrNumber.js";

export interface IdManager {
    newId(): StringOrNumber;
}
