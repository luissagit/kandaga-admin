import { FormPageWrapper, SelectPaginate } from '@/components';
import { Checkbox, Col, Form, Input, Row } from 'antd';
import { userTransformer } from '../helpers';
import { API_URL, MODULE, SUB_MODULE } from '@/constants';
import { useLocation, useParams } from 'react-router-dom';
import _ from 'lodash';

export default function FormPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isUpdate = !_.isNil(id) || pathname.includes('update');

  return (
    <FormPageWrapper
      transformer={userTransformer}
      breadcrumbItems={[{ title: 'User Management' }]}
    >
      <div className="max-w-[600px]">
        <Row gutter={[18, 8]}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Username"
              name={['username']}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Name"
              name={['name']}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Password"
              name={['password']}
              rules={[{ required: isUpdate ? false : true }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Email"
              name={['email']}
              rules={[{ required: true }, { type: 'email' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Phone Number"
              name={['phone_number']}
              rules={[
                { required: true },
                {
                  pattern: /^[0-9]+$/,
                  message: 'Phone number must be number only',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="User Category"
              name={['user_category']}
              rules={[{ required: true }]}
            >
              <SelectPaginate
                keySearch="codes[]"
                dataSourceUrl={
                  API_URL[
                    SUB_MODULE[MODULE.USER_MANAGEMENT][
                      'USER_CATEGORY'
                    ] as string
                  ]
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item name={['is_verified']} valuePropName="checked">
              <Checkbox>Verified</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </FormPageWrapper>
  );
}
