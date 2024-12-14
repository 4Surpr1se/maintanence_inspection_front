import { Breakpoint } from "antd";
import { GridConfig } from "../Grid";
import { TableConfig } from "../Table";
import { ReactNode } from "react";
import { ColumnTitleProps } from "antd/lib/table/interface";

type GridTableIntersection<T> = GridConfig<T> & TableConfig<T>;

export type OnCell<T> = Required<GridTableIntersection<T>["columns"][number]>["onCell"];
export type OnHeaderCell<T> = Required<GridTableIntersection<T>["columns"][number]>["onHeaderCell"];
export type Render<T> = Required<GridTableIntersection<T>["columns"][number]>["render"];
export type OnRow<T> = Required<GridTableIntersection<T>>["onRow"];
export type ColTitle<T> = Required<GridTableIntersection<T>["columns"][number]>["title"];

export type ListConfig<T> = {
  tableViewBreakPoint?: Breakpoint;
  onRow?: (
    data: Parameters<OnRow<T>>[0],
    index: Parameters<OnRow<T>>[1],
    isTableView: boolean,
  ) => ReturnType<OnRow<T>>;
  columns: (Omit<
    GridTableIntersection<T>["columns"][number],
    "onCell" | "onHeaderCell" | "render" | "title"
  > & {
    onCell?: (
      data: Parameters<OnCell<T>>[0],
      index: Parameters<OnCell<T>>[1],
      isTableView: boolean,
    ) => ReturnType<OnCell<T>>;
    onHeaderCell?: (
      data: Parameters<OnHeaderCell<T>>[0],
      index: Parameters<OnHeaderCell<T>>[1],
      isTableView: boolean,
    ) => ReturnType<OnHeaderCell<T>>;
    render?: (
      value: Parameters<Render<T>>[0],
      record: Parameters<Render<T>>[1],
      index: Parameters<Render<T>>[2],
      isTableView: boolean,
    ) => ReturnType<Render<T>>;
    title?: ReactNode | ((props: ColumnTitleProps<T>, isTableView: boolean) => ReactNode);
  })[];
} & Omit<GridTableIntersection<T>, "columns" | "onRow">;
