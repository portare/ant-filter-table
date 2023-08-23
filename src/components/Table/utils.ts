import { TTableParams } from "./index.tsx";
import { AnyObject } from "antd/es/_util/type";
import { SortOrder } from "antd/es/table/interface";

const orderMap: Record<string, string> = {
  ascend: 'asc',
  descend: 'desc',
}

export const defaultSerializeParams = (filters: TTableParams<AnyObject>) => {

  // refactor if need multiple sorting
  const _sort = Array.isArray(filters.sort) ? filters.sort[0].columnKey : filters.sort?.columnKey;
  const _order = Array.isArray(filters.sort) ? orderMap[String(filters.sort[0].order)] : orderMap[String(filters.sort?.order)];

  return {
    _limit: filters.pagination?.pageSize,
    _start: (Number(filters.pagination?.current) - 1) * Number(filters.pagination?.pageSize) + 1,
    _sort,
    _order
  }
}
