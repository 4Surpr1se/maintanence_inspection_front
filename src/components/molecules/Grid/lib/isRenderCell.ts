import { ReactNode } from "react";
import { Column } from "../types";
import { isPlainObject } from "@/lib/isPlainObject";

type RenderCell<T> = Exclude<ReturnType<Required<Column<T>>["render"]>, ReactNode>;

export const isRenderCell = <T>(
  value: ReturnType<Required<Column<T>>["render"]> | undefined,
): value is RenderCell<T> => {
  return isPlainObject(value) && !("type" in value);
};
