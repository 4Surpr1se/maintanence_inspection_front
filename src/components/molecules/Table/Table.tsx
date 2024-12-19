import { Table as ANTDTable } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Fragment, memo, useCallback, useMemo } from "react";
import { TableConfig } from "./types";
import { HeaderCell, Row, RowProps } from "./components";
import { TableProps as ANTDTableProps } from "antd/lib";
import { TableWrapper } from "./styles";
import { IEngineer } from "@/store/slices/engineersSlice";

export type TableProps<T> = {
  config: TableConfig<T>;
  withWrapper?: boolean;
} & Pick<
  ANTDTableProps<T>,
  "loading" | "bordered" | "scroll" | "locale" | "rowSelection" | "style" | "className"
>;

const Table = <T extends AnyObject>({
  config: {
    columns: propsColumns,
    data,
    header,
    onRow,
    uniqKey,
    expandable,
    tableLayout,
    showHeader,
    sticky,
  },
  bordered = false,
  withWrapper = true,
  className,
  ...props
}: TableProps<T>) => {
  const columns = useMemo(() => {
    return propsColumns.map(({ dataIndex, align = "center", boldHeader, ...col }) => ({
      ...col,
      align,
      dataIndex: dataIndex?.split("."),
      onHeaderCell: (
        data: Parameters<Required<typeof col>["onHeaderCell"]>[0],
        index: Parameters<Required<typeof col>["onHeaderCell"]>[1],
      ) => {
        const propsOnHeaderCell = {
          ...col.onHeaderCell?.(data, index),
        };
        return {
          ...propsOnHeaderCell,
          style: {
            color: boldHeader ? "#444" : "#7F7F7F",
            background: "#FFF",
            fontWeight: boldHeader ? 700 : 500,
            fontSize: boldHeader ? "18px" : "16px",
            borderBottom: "1px rgba(103, 59, 230, 0.2) solid",
            ...propsOnHeaderCell?.style,
          },
        };
      },
      onCell: (
        data: Parameters<Required<typeof col>["onCell"]>[0],
        index?: Parameters<Required<typeof col>["onCell"]>[1],
      ) => {
        const propsOnCell = {
          ...col.onCell?.(data, index),
        };
        return {
          ...propsOnCell,
          style: {
            paddingTop: 0,
            paddingBottom: 0,
            borderBottom: "1px rgba(103, 59, 230, 0.2) solid",
            ...propsOnCell.style,
          },
        };
      },
    }));
  }, [propsColumns]);

  const Wrapper = useMemo(() => (withWrapper ? TableWrapper : Fragment), [withWrapper]);

  const memoHeader = useCallback(() => {
    return header;
  }, [header]);

  return (
    <Wrapper>
      <ANTDTable
        dataSource={data}
        columns={columns}
        tableLayout={tableLayout}
        bordered={bordered}
        expandable={expandable}
        pagination={false}
        className={className}
        onRow={onRow}
        title={memoHeader}
        showHeader={showHeader}
        rowKey={uniqKey}
        sticky={sticky}
        components={{
          header: {
            cell: HeaderCell,
          },
          body: {
            row: (props: RowProps) => <Row {...props} engineerItems={data as IEngineer[]} />,
          },
        }}
        {...props}
      />
    </Wrapper>
  );
};

export const MemoTable = memo(Table) as typeof Table;
