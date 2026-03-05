import { IndexPageWrapper, IndexTable } from '@/components';
import type { ColumnsType } from 'antd/es/table';
import { PiSealCheckBold, PiXCircleBold } from 'react-icons/pi';
import { Filter } from '../components';
import { userTransformer } from '../helpers';

export default function IndexPage() {
  const columns: ColumnsType = [
    {
      title: 'Username',
      key: 'username',
      dataIndex: ['username'],
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: ['name'],
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: ['email'],
    },
    {
      title: 'User Category',
      key: 'user_category.name',
      dataIndex: ['user_category', 'name'],
    },
    {
      title: 'Phone Number',
      key: 'phone_number',
      dataIndex: ['phone_number'],
    },
    {
      title: 'Verified',
      key: 'is_verified',
      dataIndex: ['is_verified'],
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
      filterProps={{
        filterComponent: <Filter />,
      }}
    >
      <IndexTable
        filterProps={{
          transformFilter: userTransformer.filter,
        }}
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
