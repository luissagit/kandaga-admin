import { IndexPageWrapper, IndexTable } from '@/components';
import type { ColumnsType } from 'antd/es/table';

export default function IndexPage() {
  const columns: ColumnsType = [
    {
      title: 'Code',
      key: 'code',
      dataIndex: ['code'],
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: ['name'],
    },
    {
      title: 'Address',
      key: 'address',
      dataIndex: ['address'],
    },
  ];
  return (
    <IndexPageWrapper>
      <IndexTable columns={columns} />
    </IndexPageWrapper>
  );
}
