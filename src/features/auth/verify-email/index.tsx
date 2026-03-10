import { Button, Card, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../login/services';
import { AuthLayout } from '@/components/layout';
import { LOGO_FULL } from '@/assets';
import { notificationFailed } from '@/components';
import { handleLogin } from '@/libs';
import { useAuthStore } from '@/stores';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingResendEmail, setLoadingResendEmail] = useState(false);

  async function handleSubmit(payload: any) {
    try {
      setLoading(true);
      const { data } = await authService.verifyEmail(payload);
      notification.success({
        title: 'Verifikasi email Berhasil, Silahkan tunggu.',
      });
      await handleLogin(data);
      if (data?.is_super_admin) {
        navigate('/app');
      } else {
        navigate('/app/document-user');
      }
    } catch (error: any) {
      notificationFailed({
        message: error?.message,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleResendEmail() {
    try {
      setLoadingResendEmail(true);
      const { data } = await authService.resendEmail();
      if (data) {
        notification.success({
          title:
            'Email dengan OTP baru telah dikirim, harap melakukan pengecekan.',
        });
      }
    } catch (error: any) {
      notificationFailed({
        message: error?.message,
      });
    } finally {
      setLoadingResendEmail(false);
    }
  }

  async function checkUserVerified() {
    const { data } = await authService.getDetail(authStore?.auth?.id);
    if (data?.is_verified) {
      navigate('/app');
    }
  }

  useEffect(() => {
    checkUserVerified();
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
          <Form.Item name={['otp']} label="OTP" rules={[{ required: true }]}>
            <Input.OTP length={6} />
          </Form.Item>

          <div className="mt-[32px] flex gap-2">
            <Button
              htmlType="submit"
              loading={loading}
              disabled={loadingResendEmail}
              type="primary"
            >
              Verifikasi
            </Button>

            <Button
              onClick={handleResendEmail}
              disabled={loading}
              loading={loadingResendEmail}
            >
              Kirim Kembali Email Verifikasi
            </Button>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
}
