import { IndexPageWrapper, IndexTable } from '@/components';
import type { ColumnsType } from 'antd/es/table';
import { Filter } from '../components';
import { documentTransformer } from '../helpers';

export default function IndexPage() {
  const columns: ColumnsType = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: ['name'],
    },
    {
      title: 'Document Category',
      key: 'document_category.name',
      dataIndex: ['document_category', 'name'],
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: ['description'],
    },
  ];

  return (
    <IndexPageWrapper filterProps={{ filterComponent: <Filter /> }}>
      <IndexTable
        columns={columns}
        filterProps={{ transformFilter: documentTransformer.filter }}
      />
    </IndexPageWrapper>
  );
}
