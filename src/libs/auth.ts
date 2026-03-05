import { userCategoryService } from '@/features/app/user-category/service';
import { useAuthStore } from '@/stores';

export async function handleLogin(data: any) {
  const service = userCategoryService;
  const response = await service.getDetail(data?.user_category_id, {
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
  });
  const accessRights = response?.data?.access_rights;

  const authStore = useAuthStore.getState();
  authStore.setAuth({ ...data, access_rights: accessRights });
}
