import { useModuleContext } from '@/context/base-module.context';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Form, Spin, type FormProps } from 'antd';
import type {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { PiArrowCircleLeftBold, PiFloppyDiskBold } from 'react-icons/pi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { notificationFailed } from '../common';
import { useAuthStore } from '@/stores';
import type { Transformer } from '@/types';

interface Props {
  children: React.ReactNode;
  breadcrumbItems?: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
  formProps?: FormProps;
  transformer?: Transformer;
}

export function FormPageWrapper(props: Props) {
  const children = props?.children;
  const formProps = props?.formProps;
  const transformer = props?.transformer;
  // const breadcrumbItems = props?.breadcrumbItems ?? [];

  const user = useAuthStore();
  const navigate = useNavigate();

  const company = user?.auth?.company;

  const { id } = useParams();
  const { pathname } = useLocation();
  const { config, form } = useModuleContext();

  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const isUpdate = !_.isNil(id) || pathname.includes('update');
  const formTitle = isUpdate ? 'Update Data' : 'Create New Data';

  const service = config?.service;
  const webUrl = config?.webUrl;
  const subModuleTitle = config?.subModuleTitle;

  function onClickSubModule() {
    navigate(webUrl);
  }

  function onClickBack() {
    navigate(-1);
  }

  async function getDetailData(id: string): Promise<any> {
    try {
      setLoading(true);
      const { data } = await service.getDetail(id);
      return data;
    } catch (error: any) {
      notificationFailed({
        message: error?.message,
      });
    } finally {
      setLoading(false);
    }
  }

  async function generateDefaultData() {
    if (isUpdate && id) {
      const data = await getDetailData(id);
      form.setFieldsValue(data);
    } else {
      form.resetFields();
      form.setFieldsValue({
        company_id: company?.id,
      });
    }
  }

  async function handleSubmit(payload: any) {
    try {
      setLoadingSave(true);
      let response = null;
      if (isUpdate && id) {
        const transformedPayload = transformer?.update
          ? transformer?.update(payload)
          : payload;
        response = await service.update(id, transformedPayload);
      } else {
        const transformedPayload = transformer?.create
          ? transformer?.create(payload)
          : payload;
        response = await service.create(transformedPayload);
      }
      if (response?.data) {
        navigate(`${webUrl}/detail/${response?.data?.id}`);
      }
    } catch (error: any) {
      notificationFailed({
        message: error?.message,
      });
    } finally {
      setLoadingSave(false);
    }
  }

  useEffect(() => {
    generateDefaultData();
  }, [isUpdate, id]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        className="relative h-full"
        onFinish={handleSubmit}
        {...formProps}
      >
        <div className="flex justify-between items-center">
          <Breadcrumb
            items={[
              {
                href: '#',
                title: <HomeOutlined />,
              },
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
              htmlType="submit"
              loading={loadingSave}
              icon={<PiFloppyDiskBold />}
            >
              Simpan
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
          <Spin spinning={loading || loadingSave}>
            {children}
            <Form.Item name={['company_id']} noStyle></Form.Item>
            <div className="absolute"></div>
          </Spin>
        </div>
      </Form>
    </div>
  );
}
