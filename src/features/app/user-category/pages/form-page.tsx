import { FormPageWrapper } from '@/components';
import { Checkbox, Form, Input } from 'antd';
import { userCategoryTransformer } from '../helpers';

export default function FormPage() {
  return (
    <FormPageWrapper transformer={userCategoryTransformer}>
      <div className="max-w-[300px]">
        <Form.Item
          label="Code"
          name={['code']}
          required
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name={['name']}
          required
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['is_super_admin']}
          valuePropName="checked"
          className="!m-0"
        >
          <Checkbox>Super Admin</Checkbox>
        </Form.Item>
        <Form.Item
          name={['is_for_public']}
          valuePropName="checked"
          className="!m-0"
        >
          <Checkbox>Public</Checkbox>
        </Form.Item>
      </div>
    </FormPageWrapper>
  );
}
