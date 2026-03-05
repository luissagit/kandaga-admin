import {
  FormPageWrapper,
  SelectPaginate,
  UploadFile,
  UploadImage,
} from '@/components';
import { Form, Input } from 'antd';
import { documentTransformer, FileType } from '../helpers';
import { API_URL, MODULE, SUB_MODULE } from '@/constants';

export default function FormPage() {
  return (
    <FormPageWrapper transformer={documentTransformer}>
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
    </FormPageWrapper>
  );
}
