import { Checkbox, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { capitalize } from 'lodash';
import { useState } from 'react';
import { useModuleContext } from '../context';
import { notificationFailed } from '@/components';

export interface AccessRightFormProps {
  value?: any;
  onChange?(payload: any): any;
}

export function AccessRightForm(props: AccessRightFormProps) {
  const value = props?.value ?? [];
  const onChange = props?.onChange;

  const module = useModuleContext();
  const config = module.config;
  const service = config.service;

  const [loading, setLoading] = useState(false);

  async function onChangeChecked(event: any, type: string, record: any) {
    try {
      setLoading(true);
      const checked = event.target.checked;
      const { data } = await service.toggleAccessRight({
        ...record,
        [type]: checked,
      });
      const newValue = value?.map((item: any) => {
        if (item?.id === data?.id) {
          return data;
        }
        return item;
      });
      if (onChange) {
        onChange(newValue);
      }
    } catch (error: any) {
      notificationFailed({ message: error?.message });
    } finally {
      setLoading(false);
    }
  }

  function renderCheckAccess(type: string, record: any) {
    return (
      <Checkbox
        checked={record[type]}
        onChange={(event) => onChangeChecked(event, type, record)}
      ></Checkbox>
    );
  }

  const columns: ColumnsType<any> = [
    {
      title: 'Module',
      key: 'module',
      dataIndex: ['module'],
      render(value) {
        return capitalize(value?.split('_')?.join(' '));
      },
    },
    {
      title: 'Create',
      key: 'create',
      dataIndex: ['create'],
      render(_, record) {
        return renderCheckAccess('create', record);
      },
    },
    {
      title: 'Read',
      key: 'read',
      dataIndex: ['read'],
      render(_, record) {
        return renderCheckAccess('read', record);
      },
    },
    {
      title: 'Update',
      key: 'update',
      dataIndex: ['update'],
      render(_, record) {
        return renderCheckAccess('update', record);
      },
    },
    {
      title: 'Delete',
      key: 'delete',
      dataIndex: ['delete'],
      render(_, record) {
        return renderCheckAccess('delete', record);
      },
    },
  ];

  return (
    <div>
      <h4 className="font-semibold">Access Rights</h4>
      <Table
        loading={loading}
        className="mt-4"
        columns={columns}
        dataSource={value}
      />
    </div>
  );
}
