import {
  notificationFailed,
  SelectPaginate,
  UploadFile,
  UploadImage,
} from '@/components';
import { Button, Form, Input, Spin } from 'antd';
import { documentTransformer, FileType } from '../helpers';
import { API_URL, MODULE, SUB_MODULE } from '@/constants';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useModuleContext } from '../context';
import { documentCategoryService } from '../../document-category/service';
import { useAuthStore } from '@/stores';

export default function FormUpload() {
  const { documentCategoryId } = useParams();
  const module = useModuleContext();
  const navigate = useNavigate();
  const auth = useAuthStore();

  const user = auth?.auth;
  const webUrl = module.config?.webUrl;
  const service = module.config.service;
  const documentCategorySvc = documentCategoryService;

  const transformer = documentTransformer;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  async function getDetailDocumentCategory() {
    if (!documentCategoryId) return;
    try {
      setLoading(true);
      const { data } = await documentCategorySvc.getDetail(documentCategoryId);
      form.setFieldsValue({ document_category: data });
    } catch (error: any) {
      notificationFailed({
        message: error?.message,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(payload: any) {
    try {
      setLoadingSave(true);
      const transformedPayload = transformer?.create
        ? transformer?.create(payload)
        : payload;
      const response = await service.create({
        ...transformedPayload,
        company_id: user?.company?.id,
      });
      if (response?.data) {
        navigate(`${webUrl}/create/${documentCategoryId}`);
      }
    } catch (error: any) {
      notificationFailed({
        message: error?.message?.error ?? error?.message,
      });
    } finally {
      setLoadingSave(false);
    }
  }

  function onClickCancel() {
    navigate(`${webUrl}/create/${documentCategoryId}`);
  }

  useEffect(() => {
    getDetailDocumentCategory();
  }, [documentCategoryId]);

  return (
    <Spin
      spinning={loading || loadingSave}
      className="h-full"
      classNames={{
        container: 'h-full',
      }}
    >
      <Form
        form={form}
        layout="vertical"
        className="h-full"
        onFinish={handleSubmit}
      >
        <div className="max-w-[300px]">
          <Form.Item shouldUpdate noStyle>
            {({ getFieldsValue, setFieldsValue }) => {
              const values = getFieldsValue();
              const documentCategory = values?.document_category;
              const currentFileType = documentCategory?.file_type as FileType;
              function onChange(value: any) {
                const fileType = value?.file_type;
                if (currentFileType !== fileType) {
                  setFieldsValue({
                    document_url: null,
                  });
                }
              }
              return (
                <Form.Item
                  label="Document Category"
                  name={['document_category']}
                  required
                  rules={[{ required: true }]}
                >
                  <SelectPaginate
                    isDisabled
                    dataSourceUrl={
                      API_URL[
                        SUB_MODULE[MODULE.MASTER_DATA][
                          'DOCUMENT_CATEGORY'
                        ] as string
                      ]
                    }
                    onChange={onChange}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {({ getFieldsValue }) => {
              const values = getFieldsValue();
              const documentCategory = values?.document_category;
              const fileType = documentCategory?.file_type as FileType;

              if (fileType === 'pdf') {
                return (
                  <Form.Item
                    label="File"
                    name={['document_url']}
                    required
                    rules={[{ required: true, message: 'Please select file' }]}
                  >
                    <UploadFile />
                  </Form.Item>
                );
              }

              if (fileType === 'image') {
                return (
                  <Form.Item
                    label="File"
                    name={['document_url']}
                    required
                    rules={[{ required: true, message: 'Please select file' }]}
                  >
                    <UploadImage />
                  </Form.Item>
                );
              }

              return <></>;
            }}
          </Form.Item>
          <Form.Item label="Description" name={['description']}>
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>
        <div className="flex gap-2 flex-wrap items-center absolute bottom-0">
          <Button htmlType="submit" loading={loadingSave} type="primary">
            Simpan
          </Button>
          <Button onClick={onClickCancel} disabled={loading || loadingSave}>
            Batal
          </Button>
        </div>
      </Form>
    </Spin>
  );
}
