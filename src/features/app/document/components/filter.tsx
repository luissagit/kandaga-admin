import { SelectPaginate } from '@/components';
import { API_URL, MODULE, SUB_MODULE } from '@/constants';
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
      <Form.Item label="Descriptions" name={['descriptions']}>
        <Select
          mode="tags"
          open={false}
          suffixIcon={<></>}
          placeholder="Type and click enter"
        />
      </Form.Item>
      <Form.Item label="Document Categories" name={['document_categories']}>
        <SelectPaginate
          keySearch="codes[]"
          isMulti
          dataSourceUrl={
            API_URL[
              SUB_MODULE[MODULE.MASTER_DATA]['DOCUMENT_CATEGORY'] as string
            ]
          }
        />
      </Form.Item>
      <Form.Item label="Creator" name={['creators']}>
        <SelectPaginate
          keySearch="usernames[]"
          isMulti
          dataSourceUrl={
            API_URL[SUB_MODULE[MODULE.USER_MANAGEMENT]['USER'] as string]
          }
        />
      </Form.Item>
      <Form.Item label="Editor" name={['editors']}>
        <SelectPaginate
          keySearch="usernames[]"
          isMulti
          dataSourceUrl={
            API_URL[SUB_MODULE[MODULE.USER_MANAGEMENT]['USER'] as string]
          }
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
