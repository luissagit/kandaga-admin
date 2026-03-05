import { DetailPageWrapper, RenderText } from '@/components';
import { Col, Form, Row } from 'antd';

export default function DetailPage() {
  return (
    <DetailPageWrapper breadcrumbItems={[{ title: 'User Management' }]}>
      <div className="max-w-[600px]">
        <Row gutter={[18, 8]}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Username" name={['username']}>
              <RenderText />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Name" name={['name']}>
              <RenderText />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Email" name={['email']}>
              <RenderText />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Phone Number" name={['phone_number']}>
              <RenderText />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="User Category" name={['user_category', 'name']}>
              <RenderText />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Verified" name={['is_verified']}>
              <RenderText
                customRender={(value) => (value === true ? 'Yes' : 'No')}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </DetailPageWrapper>
  );
}
