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
      <Form.Item label="Types" name={['types']}>
        <Select
          allowClear
          placeholder="Select"
          options={['external', 'internal'].map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </Form.Item>
      <Form.Item label="Descriptions" name={['descriptions']}>
        <Select
          mode="tags"
          open={false}
          suffixIcon={<></>}
          placeholder="Type and click enter"
        />
      </Form.Item>
      <Form.Item label="File Types" name={['file_types']}>
        <Select
          allowClear
          placeholder="Select"
          options={['image', 'pdf'].map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </Form.Item>
      <Form.Item label="Statuses" name={['statuses']}>
        <Select
          allowClear
          placeholder="Select"
          options={['active', 'inactive'].map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </Form.Item>
    </div>
  );
}
