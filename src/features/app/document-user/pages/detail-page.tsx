import {
  DetailPageWrapper,
  RenderImage,
  RenderPdf,
  RenderText,
} from '@/components';
import { Col, Form, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useModuleContext } from '../context';

export default function DetailPage() {
  const navigate = useNavigate();
  const { documentCategoryId } = useParams();
  const module = useModuleContext();

  const webUrl = module?.config?.webUrl;

  function handleClickBack() {
    navigate(`${webUrl}/create/${documentCategoryId}`);
  }

  return (
    <DetailPageWrapper
      showUpdate={false}
      handleClickBack={handleClickBack}
      handleAfterDelete={handleClickBack}
    >
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
