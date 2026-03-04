import { FormPageWrapper } from '@/components';
import { Form, Input } from 'antd';

export default function FormPage() {
  return (
    <FormPageWrapper>
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
          label="Address"
          name={['address']}
          required
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </div>
    </FormPageWrapper>
  );
}
