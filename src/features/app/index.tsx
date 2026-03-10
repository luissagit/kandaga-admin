import { AppLayout } from '@/components/layout';
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authService } from '../auth/login/services';

export default function AppPage() {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  async function checkUserVerified() {
    const { data } = await authService.getDetail(authStore?.auth?.id);
    if (!data?.is_verified) {
      navigate('/verify-email');
    }
  }

  useEffect(() => {
    checkUserVerified();
  }, []);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
