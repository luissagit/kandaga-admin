import { IndexPageWrapper, IndexTable } from '@/components';
import type { ColumnsType } from 'antd/es/table';
import { PiSealCheckBold, PiXCircleBold } from 'react-icons/pi';
import { Filter } from '../components';

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
      title: 'Super Admin',
      key: 'is_super_admin',
      dataIndex: ['is_super_admin'],
      className: 'text-center',
      render(value) {
        return (
          <div className="flex justify-center">
            {value ? (
              <PiSealCheckBold size={20} />
            ) : (
              <PiXCircleBold size={20} />
            )}
          </div>
        );
      },
    },
    {
      title: 'Public',
      key: 'is_for_public',
      dataIndex: ['is_for_public'],
      className: 'text-center',
      render(value) {
        return (
          <div className="flex justify-center">
            {value ? (
              <PiSealCheckBold size={20} />
            ) : (
              <PiXCircleBold size={20} />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <IndexPageWrapper
      breadcrumbItems={[{ title: 'User Management' }]}
      filterComponent={<Filter />}
    >
      <IndexTable
        columns={columns}
        rowActionProps={{
          showDelete(item) {
            if (item?.is_super_admin) return false;
            return true;
          },
        }}
      />
    </IndexPageWrapper>
  );
}
