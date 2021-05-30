// @ts-ignore
import { v4 } from "uuid";

export const newId: () => string = v4;
export const newIdNoSep: () => string = () => v4().replace(/[-]/g, "");
