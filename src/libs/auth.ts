import { useAuthStore } from '@/stores';

export function handleLogin(data: any) {
  const authStore = useAuthStore.getState();
  authStore.setAuth(data);
}
