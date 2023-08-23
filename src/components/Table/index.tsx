import { Table } from "antd";
import { TableProps } from "antd/es/table/InternalTable";
import { AnyObject } from "antd/es/_util/type";
import { useCallback, useEffect, useState } from "react";
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { api } from "../../api.ts";
import { defaultSerializeParams } from "./utils.ts";

export type TTableParams<RecordType> = {
  pagination?: TablePaginationConfig;
  sort?: SorterResult<RecordType> | SorterResult<RecordType>[]
  filters?: Record<string, FilterValue | null>;
}

export type TCustomTableProps<RecordType> = {
  pageSize?: number;
  url: string;
  serializeParams?: (filters: TTableParams<RecordType>) => Record<string, any>;
}

export type TFilterTableProps<RecordType> =
  Omit<TableProps<RecordType>, 'dataSource' | 'loading'>
  & TCustomTableProps<RecordType>;

export const FilterTable = <RecordType extends AnyObject = object>({
  url,
  pageSize = 3,
  serializeParams = defaultSerializeParams,
  ...props
}: TFilterTableProps<RecordType>) => {
  const [data, setData] = useState<RecordType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TTableParams<RecordType>>({
    pagination: {
      current: 1,
      pageSize,
    },
  });

  const loadData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {

      api.get<RecordType[]>(url, {
        params: serializeParams(tableParams)
      }).then(({ data, headers }) => {
        setData(data);

        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: headers['x-total-count'],
          }
        })

      }).catch(() => {
        setData([])
      }).finally(() => {
        setLoading(false);
      })
    }, 1000)
  }, [tableParams])

  const handleTableChange = useCallback<NonNullable<TableProps<RecordType>['onChange']>>((
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sort: SorterResult<RecordType> | SorterResult<RecordType>[],
  ) => {
    setTableParams({
      pagination,
      filters,
      sort,

    });

    /* check if we need to delete prev data until new is loaded
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
    */
  }, []);

  useEffect(() => {
    console.log('%cParams', 'background-color: orange; color: black; font-size: 16px', tableParams);
    loadData();
  }, [JSON.stringify(tableParams)])

  return (
    <Table
      {...props}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  )
}
