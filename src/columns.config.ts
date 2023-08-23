import type { ColumnsType } from 'antd/es/table';
import { TComment } from "./types.ts";

export const columnsConfig: ColumnsType<TComment> = [
  {
    title: 'postId',
    dataIndex: 'postId',
    key: 'postId',
    sorter: true,
  },
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
]
