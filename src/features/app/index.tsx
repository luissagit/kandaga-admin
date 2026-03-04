import { AppLayout } from '@/components/layout';
import { Outlet } from 'react-router-dom';

export default function AppPage() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
