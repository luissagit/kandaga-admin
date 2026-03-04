import { DetailPageWrapper, RenderText } from '@/components';
import { Form } from 'antd';

export default function DetailPage() {
  return (
    <DetailPageWrapper>
      <div className="max-w-[400px]">
        <Form.Item label="Code" name={['code']}>
          <RenderText />
        </Form.Item>
        <Form.Item label="Name" name={['name']}>
          <RenderText />
        </Form.Item>
        <Form.Item label="Address" name={['address']}>
          <RenderText />
        </Form.Item>
      </div>
    </DetailPageWrapper>
  );
}
