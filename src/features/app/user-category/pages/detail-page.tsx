import { DetailPageWrapper, RenderText } from '@/components';
import { Form } from 'antd';
import { AccessRightForm } from '../components';

export default function DetailPage() {
  return (
    <DetailPageWrapper breadcrumbItems={[{ title: 'User Management' }]}>
      <div className="max-w-[400px]">
        <Form.Item label="Code" name={['code']}>
          <RenderText />
        </Form.Item>
        <Form.Item label="Name" name={['name']}>
          <RenderText />
        </Form.Item>
      </div>
      <Form.Item name={['access_rights']}>
        <AccessRightForm />
      </Form.Item>
    </DetailPageWrapper>
  );
}
