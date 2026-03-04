import { useModuleContext } from '@/context/base-module.context';
import { HomeOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Form,
  notification,
  Spin,
  type FormProps,
} from 'antd';
import type {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import { useEffect, useState } from 'react';
import {
  PiArrowCircleLeftBold,
  PiNotePencilBold,
  PiTrashBold,
} from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmationModal, type ConfirmationModalProps } from '../common';

interface Props {
  children: React.ReactNode;
  breadcrumbItems?: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
  formProps?: FormProps;
}

export function DetailPageWrapper(props: Props) {
  const children = props?.children;
  const formProps = props?.formProps;
  const breadcrumbItems = props?.breadcrumbItems ?? [];

  const navigate = useNavigate();

  const { id } = useParams();
  const { config, formDetail } = useModuleContext();

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] =
    useState<ConfirmationModalProps>({
      title: '',
      item: null,
      description: '',
      handleConfirm: handleConfirmModalAction,
      handleCancel: handleCancelModalAction,
    });

  const formTitle = 'Detail';
  const service = config?.service;
  const webUrl = config?.webUrl;
  const subModuleTitle = config?.subModuleTitle;

  function onClickSubModule() {
    navigate(webUrl);
  }

  function onClickBack() {
    navigate(webUrl);
  }

  function onClickUpdate() {
    navigate(`${webUrl}/update/${id}`);
  }

  async function getDetailData(id: string): Promise<any> {
    try {
      setLoading(true);
      const { data } = await service.getDetail(id);
      formDetail.setFieldsValue(data);
    } catch (error: any) {
      notification.error({
        title: error?.message,
      });
    } finally {
      setLoading(false);
    }
  }

  function onClickDelete() {
    const item = formDetail.getFieldsValue();
    setConfirmationModal({
      ...confirmationModal,
      item: item,
      open: true,
      danger: true,
      title: `Delete ${subModuleTitle} Confirmation`,
      description: `Are you sure want to delete data with code ${item?.code}`,
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
        navigate(webUrl);
      }
    } catch (error: any) {
      notification.error({
        title: error?.message,
      });
    }
  }

  useEffect(() => {
    if (id) {
      getDetailData(id);
    }
  }, [id]);

  return (
    <div>
      <Form
        form={formDetail}
        layout="vertical"
        className="relative h-full"
        {...formProps}
      >
        <div className="flex justify-between items-center">
          <Breadcrumb
            items={[
              {
                href: '#',
                title: <HomeOutlined />,
              },
              ...breadcrumbItems,
              {
                title: subModuleTitle,
                onClick: onClickSubModule,
                className: 'cursor-pointer',
              },
              {
                title: formTitle,
              },
            ]}
          />
          <div className="flex gap-2 items-center">
            <Button
              type="primary"
              icon={<PiNotePencilBold />}
              onClick={onClickUpdate}
            >
              Update
            </Button>
            <Button danger icon={<PiTrashBold />} onClick={onClickDelete}>
              Delete
            </Button>
            <Button icon={<PiArrowCircleLeftBold />} onClick={onClickBack}>
              Kembali
            </Button>
          </div>
        </div>
        <div className="py-5">
          <div className="mb-4">
            <h3 className="font-semibold text-base">
              {formTitle} {subModuleTitle}
            </h3>
          </div>
          <Spin spinning={loading}>{children}</Spin>
          <Form.Item name={['id']} noStyle></Form.Item>
        </div>

        <ConfirmationModal {...confirmationModal} />
      </Form>
    </div>
  );
}
