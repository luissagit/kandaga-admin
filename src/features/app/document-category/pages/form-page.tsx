import { FormPageWrapper, UploadImage } from '@/components';
import { Form, Input, Select } from 'antd';
import {
  documentCategoryTransformer,
  documentTypeOptions,
  fileTypeOptions,
} from '../helpers';

export default function FormPage() {
  return (
    <FormPageWrapper
      transformer={documentCategoryTransformer}
      breadcrumbItems={[{ title: 'Master Data' }]}
    >
      <div className="max-w-[300px]">
        <Form.Item
          label="Code"
          name={['code']}
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="Input code" />
        </Form.Item>
        <Form.Item
          label="Name"
          name={['name']}
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="Input name" />
        </Form.Item>
        <Form.Item
          label="Type"
          name={['type']}
          required
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Type" options={documentTypeOptions} />
        </Form.Item>
        <Form.Item
          label="File Type"
          name={['file_type']}
          required
          rules={[{ required: true }]}
        >
          <Select placeholder="Select File Type" options={fileTypeOptions} />
        </Form.Item>
        <Form.Item
          label="Icon"
          name={['icon_url']}
          required
          rules={[{ required: true }]}
        >
          <UploadImage />
        </Form.Item>
      </div>
    </FormPageWrapper>
  );
}
