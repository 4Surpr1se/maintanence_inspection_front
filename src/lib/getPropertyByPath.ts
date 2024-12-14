import { Path, PathValue } from "react-hook-form";
import { Paths } from "./paths";
import { isNotNil } from "./isNotNil";

const getProperty = <T extends Record<string, any>>(
  obj: T,
  path: Paths<T>,
): T[keyof T] | undefined => {
  if (!isNotNil(path) || !path.length || typeof obj !== "object" || !isNotNil(obj)) return;
  return path.length === 1 ? obj[path[0]] : getProperty(obj[path[0]], path.slice(1) as Paths<T>);
};

export const getPropertyByPath = <T extends Record<string, any>, P extends Path<T>>(
  obj: T | undefined,
  path: P,
) =>
  (isNotNil(obj) ? getProperty(obj, path.split(".") as Paths<T>) : undefined) as PathValue<
    T,
    P
  > | undefined;
