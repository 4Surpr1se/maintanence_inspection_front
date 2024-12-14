import { isNotNil } from "./isNotNil";

export const maybe = <T extends Array<any>>(...values: [...T]) =>
  values.find(isNotNil);
