import { Table } from "antd";
import { TableProps } from "antd/es/table/InternalTable";
import { AnyObject } from "antd/es/_util/type";

export type TProps<RecordType> = TableProps<RecordType> & {
  columns: TableProps<RecordType>['columns'];
};


export const FilterTable = <RecordType extends AnyObject = object>(props: TProps<RecordType>) => {
  return <Table {...props} />
}