import { ColProps } from "antd";
import { Breakpoint } from "antd/lib";
import { ColumnType } from "antd/lib/table";
import { ReactNode } from "react";
import { Path } from "react-hook-form";

export type Column<T> = Pick<
  ColumnType<T>,
  "key" | "title" | "render" | "onCell" | "onCellClick" | "onHeaderCell" | "fixed"
> & {
  dataIndex?: Path<T>;
  boldHeader?: boolean;
  emptyValue?: ReactNode;
  span?: {
    titleSpan: number;
    contentSpan: number;
  };
  gridTitletitle?: ReactNode | ((record: T) => ReactNode);
};

export type GridConfig<T> = {
  columns: Column<T>[];
  data: T[];
  uniqKey: keyof T;
  onRow?: (data: T, index: number) => React.HTMLAttributes<HTMLDivElement>;
  gridGap?: number;
  colSpan?: { [K in Breakpoint]?: ColProps["span"] };
};
