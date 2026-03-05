import {
  ConfirmationModal,
  renderStatus,
  RowAction,
  type ConfirmationModalProps,
  type RowActionProps,
} from '@/components';
import { useModuleContext } from '@/context/base-module.context';
import { notification, Table, type TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IndexTableProps extends TableProps {
  key?: string;
  rowActionProps?: RowActionProps;
}

export function IndexTable(props: IndexTableProps) {
  const navigate = useNavigate();
  const module = useModuleContext();

  const service = module.config.service;
  const webUrl = module.config.webUrl;
  const subModuleTitle = module.config.subModuleTitle;

  const dataIndex = module.dataIndex;
  const setDataIndex = module.setDataIndex;
  const pagination = module.pagination;
  const setPagination = module.setPagination;

  const columns = props.columns ?? [];
  const rowActionProps = props?.rowActionProps ?? {};

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModalProps>({
      title: '',
      item: null,
      description: '',
      handleConfirm: handleConfirmModalAction,
      handleCancel: handleCancelModalAction,
    });

  const parsedColumns: ColumnsType<any> = [
    {
      title: 'Aksi',
      key: 'action',
      dataIndex: ['action'],
      fixed: 'left',
      render(_, record) {
        return (
          <RowAction
            item={record}
            handleUpdate={handleUpdate}
            handleDetail={handleDetail}
            handleDelete={handleDelete}
            {...rowActionProps}
          />
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: ['status'],
      render(value) {
        return renderStatus({ value });
      },
    },
    ...columns,
  ];

  const tableProps: TableProps = {
    ...props,
    columns: parsedColumns,
    loading: loading,
    dataSource: dataIndex,
    scroll: { x: 'max-content', y: 'calc(100vh - 340px)' },
    pagination: {
      showSizeChanger: true,
      current: pagination?.current,
      pageSize: pagination?.pageSize,
      total: pagination?.total,
      onChange(page, pageSize) {
        const params = {
          current: page,
          pageSize: pageSize,
        };
        setPagination(params);
        getData(params);
      },
    },
  };

  async function getData(params?: any) {
    try {
      setLoading(true);
      const { data, paging } = await service.getIndex({
        page: params?.current ?? pagination?.current,
        size: params?.pageSize ?? pagination?.pageSize,
      });
      if (data) {
        setDataIndex(data);
      }
      if (paging) {
        setPagination({
          current: paging.current_page,
          pageSize: paging.size,
          total: paging?.size * paging?.total_page,
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(item: any) {
    navigate(`${webUrl}/update/${item?.id}`);
  }

  async function handleDetail(item: any) {
    navigate(`${webUrl}/detail/${item?.id}`);
  }

  async function handleDelete(item: any) {
    setConfirmationModal({
      ...confirmationModal,
      item: item,
      open: true,
      danger: true,
      title: `Delete ${subModuleTitle} Confirmation`,
      description: `Are you sure want to delete data with code/name ${item?.code ?? item?.name}`,
    });
  }

  async function handleCancelModalAction() {
    setConfirmationModal({
      ...confirmationModal,
      item: null,
      open: false,
      title: '',
      description: '',
      danger: false,
    });
  }

  async function handleConfirmModalAction(item: any) {
    try {
      const { data } = await service.delete(item?.id);
      if (data) {
        handleCancelModalAction();
        getData();
      }
    } catch (error: any) {
      notification.error({
        title: error?.message,
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table {...tableProps} />
      <ConfirmationModal {...confirmationModal} />
    </div>
  );
}
