import { AuthLayout } from '@/components/layout';
import { Button, Card, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from './services';
import { handleLogin } from '@/libs/auth';
import { LOGO_FULL } from '@/assets';
import { useAuthStore } from '@/stores';

export default function LoginPage() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const token = authStore?.auth?.token;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(payload: any) {
    try {
      setLoading(true);
      const { data } = await authService.login(payload);
      await handleLogin(data);
      if (data?.is_verified === false) {
        navigate('/verify-email');
      } else {
        if (data?.is_super_admin) {
          navigate('/app');
        } else {
          navigate('/app/document-user');
        }
      }
    } catch (error: any) {
      notification.error({
        title: error?.data?.errors,
      });
    } finally {
      setLoading(false);
    }
  }

  function checkToken(token: string) {
    if (token) {
      navigate('/app');
    }
  }

  useEffect(() => {
    checkToken(token);
  }, [token]);

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
          <div className="mt-[32px]">
            <Button htmlType="submit" loading={loading} type="primary">
              Login
            </Button>

            <p className="mt-2">
              Belum punya akun? <Link to={'/register'}>Daftar Disini</Link>
            </p>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
}
