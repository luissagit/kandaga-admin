import { MODULE, SUB_MODULE } from '@/constants';
import { API_URL } from '@/constants/api-url';
import { BaseService } from '@/services/base.service';
import type { BaseType } from '@/types';
import axios from 'axios';

export interface UserCategory extends BaseType {
  address: string;
}

export class UserCategoryService extends BaseService<UserCategory> {
  private accessRightEndpoint: string =
    API_URL[SUB_MODULE[MODULE.USER_MANAGEMENT]['ACCESS_RIGHT'] as string];

  constructor() {
    super(
      API_URL[SUB_MODULE[MODULE.USER_MANAGEMENT]['USER_CATEGORY'] as string],
    );
  }

  async toggleAccessRight(payload: any) {
    const { data } = await axios.put(
      `${this.accessRightEndpoint}/${payload?.id}`,
      payload,
    );
    return data;
  }
}

export const userCategoryService = new UserCategoryService();
