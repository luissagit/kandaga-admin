import { Form, Select } from 'antd';

export function Filter() {
  return (
    <div>
      <Form.Item label="Codes" name={['codes']}>
        <Select
          mode="tags"
          open={false}
          suffixIcon={<></>}
          placeholder="Type and click enter"
        />
      </Form.Item>
      <Form.Item label="Names" name={['names']}>
        <Select
          mode="tags"
          open={false}
          suffixIcon={<></>}
          placeholder="Type and click enter"
        />
      </Form.Item>
      <Form.Item label="For Public" name={['is_for_public']}>
        <Select
          allowClear
          placeholder="Select"
          options={['true', 'false'].map((item) => ({
            label: item === 'true' ? 'Yes' : 'No',
            value: item,
          }))}
        />
      </Form.Item>
      <Form.Item label="Super Admin" name={['is_super_admin']}>
        <Select
          allowClear
          placeholder="Select"
          options={['true', 'false'].map((item) => ({
            label: item === 'true' ? 'Yes' : 'No',
            value: item,
          }))}
        />
      </Form.Item>
    </div>
  );
}
