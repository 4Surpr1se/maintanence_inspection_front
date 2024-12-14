import { AnyObject } from "antd/es/_util/type";
import { ListConfig, OnCell, OnHeaderCell, OnRow, Render } from "./type";
import { Grid, GridProps } from "../Grid";
import { Table, TableProps } from "../Table";
import { Grid as ANTDGrid, Flex } from "antd";
import { useCallback, useMemo } from "react";
import { ColumnTitleProps } from "antd/lib/table/interface";

const { useBreakpoint } = ANTDGrid;

type ListProps<T extends AnyObject> = {
  config: ListConfig<T>;
  tableStyle?: TableProps<T>["style"];
  accordion?: boolean;
} & Omit<GridProps<T> & TableProps<T>, "config" | "style">;

export const List = <T extends AnyObject>({
  config: {
    columns: propsColumns,
    data,
    tableViewBreakPoint = "lg",
    uniqKey,
    filters,
    gridGap,
    header,
    onRow: propsOnRow,
    colSpan,
    expandable,
    tableLayout,
    showHeader,
    sticky,
  },
  bordered,
  loading,
  withWrapper,
  tableStyle,
  scroll,
  locale,
  rowSelection,
  className,
  accordion,
}: ListProps<T>) => {
  const breakPoints = useBreakpoint();
  const isTableView = !!breakPoints?.[tableViewBreakPoint];
  const columns = useMemo(() => {
    return propsColumns.map(({ onCell, onHeaderCell, render, title, ...column }) => {
      return {
        ...column,
        onCell: (data: Parameters<OnCell<T>>[0], index: Parameters<OnCell<T>>[1]) =>
          onCell?.(data, index, isTableView) as ReturnType<OnCell<T>>,
        onHeaderCell: (
          data: Parameters<OnHeaderCell<T>>[0],
          index: Parameters<OnHeaderCell<T>>[1],
        ) => onHeaderCell?.(data, index, isTableView) as ReturnType<OnHeaderCell<T>>,
        render:
          render &&
          ((
            value: Parameters<Render<T>>[0],
            record: Parameters<Render<T>>[1],
            index: Parameters<Render<T>>[2],
          ) => {
            return render?.(value, record, index, isTableView);
          }),
        title:
          typeof title === "function"
            ? (props: ColumnTitleProps<T>) => title(props, isTableView)
            : title,
      };
    });
  }, [isTableView, propsColumns]);

  const onRow: OnRow<T> = useCallback(
    (data, index) => {
      return propsOnRow?.(data, index, isTableView) as ReturnType<OnRow<T>>;
    },
    [isTableView, propsOnRow],
  );

  const list = useMemo(() => {
    return !isTableView ? (
      <Flex vertical style={{ background: "var(--white)", borderRadius: 8 }}>
        <Grid
          config={{ columns, data, uniqKey, gridGap, onRow, colSpan }}
          loading={loading}
          className={`_grid ${className ?? ""}`}
          accordion={accordion}
          header={header}
        />
      </Flex>
    ) : (
      <Table
        config={{
          columns,
          data,
          filters,
          header,
          onRow,
          uniqKey,
          expandable,
          tableLayout,
          showHeader,
          sticky,
        }}
        bordered={bordered}
        withWrapper={withWrapper}
        style={tableStyle}
        loading={loading}
        scroll={scroll}
        locale={locale}
        rowSelection={rowSelection}
        className={`_table ${className ?? ""}`}
      />
    );
  }, [
    isTableView,
    columns,
    data,
    uniqKey,
    gridGap,
    onRow,
    colSpan,
    loading,
    className,
    filters,
    header,
    expandable,
    tableLayout,
    showHeader,
    sticky,
    bordered,
    withWrapper,
    tableStyle,
    scroll,
    locale,
    rowSelection,
    accordion,
  ]);

  return list;
};
