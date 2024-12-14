import { TableProps } from "antd";
import { ColumnType } from "antd/lib/table";
import { ReactNode } from "react";
import { Path } from "react-hook-form";

export type Column<T> = Pick<
  ColumnType<T>,
  | "align"
  | "key"
  | "width"
  | "title"
  | "render"
  | "onCell"
  | "onCellClick"
  | "onHeaderCell"
  | "sorter"
  | "fixed"
> & { dataIndex?: Path<T>; boldHeader?: boolean };

export type TableConfig<T> = {
  header?: ReactNode;
  columns: Column<T>[];
  data: T[];
  filters?: void;
  onRow?: TableProps<T>["onRow"];
  uniqKey: keyof T;
  expandable?: TableProps<T>["expandable"];
  tableLayout?: TableProps<T>["tableLayout"];
  showHeader?: TableProps<T>["showHeader"];
  sticky?: TableProps<T>["sticky"];
};
