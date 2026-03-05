import { AuthLayout } from '@/components/layout';
import { Button, Card, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from './services';
import { handleLogin } from '@/libs/auth';
import { LOGO_FULL } from '@/assets';

export default function LoginPage() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(payload: any) {
    try {
      setLoading(true);
      const { data } = await authService.login(payload);
      handleLogin(data);
      navigate('/app');
    } catch (error: any) {
      notification.error({
        title: error?.data?.errors,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Card title={<img src={LOGO_FULL} className="h-[78px]" />}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="max-w-[300px]"
        >
          <Form.Item name={['username']} label="Username">
            <Input />
          </Form.Item>
          <Form.Item
            name={['password']}
            label={
              <div className="flex justify-between w-[300px] max-w-screen">
                <div>Password</div>
                <Link to={'/forgot-password'}>Lupa password?</Link>
              </div>
            }
          >
            <Input.Password />
          </Form.Item>
          <div className="mt-[48px]">
            <Button htmlType="submit" loading={loading} type="primary">
              Login
            </Button>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
}
