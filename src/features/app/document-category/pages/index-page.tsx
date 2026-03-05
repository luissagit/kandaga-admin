import { IndexPageWrapper, IndexTable } from '@/components';
import { Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Filter } from '../components';

export default function IndexPage() {
  const columns: ColumnsType = [
    {
      title: 'Icon',
      key: 'icon_url',
      dataIndex: ['icon_url'],
      render(value) {
        return (
          <Image
            src={value}
            alt="Icon"
            className="!h-[62px] !w-[62px] object-cover"
          />
        );
      },
    },
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
      title: 'Type',
      key: 'type',
      dataIndex: ['type'],
    },
    {
      title: 'File Type',
      key: 'file_type',
      dataIndex: ['file_type'],
    },
  ];

  return (
    <IndexPageWrapper
      breadcrumbItems={[{ title: 'Master Data' }]}
      filterProps={{ filterComponent: <Filter /> }}
    >
      <IndexTable columns={columns} />
    </IndexPageWrapper>
  );
}
