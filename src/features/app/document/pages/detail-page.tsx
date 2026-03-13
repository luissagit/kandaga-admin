import {
  DetailPageWrapper,
  RenderImage,
  RenderPdf,
  RenderText,
} from '@/components';
import { Col, Form, Row } from 'antd';

export default function DetailPage() {
  return (
    <DetailPageWrapper showUpdate={false}>
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
            <Form.Item
              label="Document Category"
              name={['document_category', 'name']}
            >
              <RenderText />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item shouldUpdate noStyle>
              {({ getFieldsValue }) => {
                const values = getFieldsValue();
                const documentCategory = values?.document_category;
                const fileType = documentCategory?.file_type;

                if (fileType === 'pdf') {
                  return (
                    <Form.Item label="Document" name={['document_url']}>
                      <RenderPdf />
                    </Form.Item>
                  );
                }

                if (fileType === 'image') {
                  return (
                    <Form.Item label="Document" name={['document_url']}>
                      <RenderImage />
                    </Form.Item>
                  );
                }

                return <></>;
              }}
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Form.Item name={['document_category']} noStyle></Form.Item>
    </DetailPageWrapper>
  );
}
