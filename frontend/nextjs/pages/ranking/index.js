import { Fragment } from 'react';
import Link from 'next/link';

import data from './data';

import TableWrapper from '../../components/TableWrapper';

import { Card } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => String(a.name).localeCompare(String(b.name)),
    searchable: true,
  },
  {
    title: 'Wealth',
    dataIndex: 'wealth',
    defaultSortOrder: 'descend',
    sorter: (a, b) => String(a.name).localeCompare(String(b.name)),
    searchable: true,
  },

]


export default function Ranking() {
  return (
    <Fragment>
      <TableWrapper bordered columns={columns} dataSource={data} />
    </Fragment>
  );
}