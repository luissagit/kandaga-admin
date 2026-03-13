import { DetailPageWrapper, RenderImage, RenderText } from '@/components';
import { Col, Form, Row } from 'antd';
import { capitalize } from 'lodash';

export default function DetailPage() {
  return (
    <DetailPageWrapper breadcrumbItems={[{ title: 'User Management' }]}>
      <div className="max-w-[600px]">
        <Row gutter={[18, 8]}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Code" name={['code']}>
              <RenderText />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Name" name={['name']}>
              <RenderText />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Type" name={['type']}>
              <RenderText customRender={(value) => capitalize(value)} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="File Type" name={['file_type']}>
              <RenderText />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item label="Icon" name={['id']}>
              <RenderImage />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </DetailPageWrapper>
  );
}
