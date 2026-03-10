import { useAuthStore } from '@/stores';
import { Button, Card, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../login/services';
import { AuthLayout } from '@/components/layout';
import { LOGO_FULL } from '@/assets';
import { notificationFailed } from '@/components';
import { companyService } from '@/features/app/company/service';

export default function RegisterPage() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const token = authStore?.auth?.token;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(payload: any) {
    try {
      setLoading(true);
      const response = await authService.register({
        ...payload,
        company_id: 'c22977d8-e406-423b-9eb6-b5be31526514',
      });
      notification.success({
        title: 'Pendaftaran Berhasil, Silahkan Login.',
      });
      console.log({ response });
      navigate('/login');
    } catch (error: any) {
      notificationFailed({
        message: error?.message,
      });
    } finally {
      setLoading(false);
    }
  }

  function checkToken(token: string) {
    if (token) {
      navigate('/app/document');
    }
  }

  async function getCompany() {
    const company = await companyService.getIndex();
    console.log(company);
  }

  useEffect(() => {
    checkToken(token);
  }, [token]);

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <AuthLayout>
      <Card title={<img src={LOGO_FULL} className="h-[78px]" />}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="max-w-[300px] min-w-[280px]"
        >
          <h2 className="font-bold text-lg mb-4">Registrasi Akun Kandaga</h2>
          <Form.Item
            name={['username']}
            label="NIK"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['name']} label="Nama" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['password']}
            label={'Kata Sandi'}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={['email']}
            label={'Email'}
            rules={[{ required: true }, { type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['phone_number']}
            label={'Nomor Telepon'}
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

          <div className="mt-[32px]">
            <Button htmlType="submit" loading={loading} type="primary">
              Register
            </Button>

            <p className="mt-2">
              Sudah punya akun? <Link to={'/login'}>Masuk Disini</Link>
            </p>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
}
