import { SelectPaginate } from '@/components';
import { API_URL, MODULE, SUB_MODULE } from '@/constants';
import { Form, Select } from 'antd';

export function Filter() {
  return (
    <div>
      <Form.Item label="Usernames" name={['usernames']}>
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
      <Form.Item label="Emails" name={['emails']}>
        <Select
          mode="tags"
          open={false}
          suffixIcon={<></>}
          placeholder="Type and click enter"
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
      <Form.Item label="User Categories" name={['user_categories']}>
        <SelectPaginate
          keySearch="codes[]"
          isMulti
          dataSourceUrl={
            API_URL[
              SUB_MODULE[MODULE.USER_MANAGEMENT]['USER_CATEGORY'] as string
            ]
          }
        />
      </Form.Item>
    </div>
  );
}
