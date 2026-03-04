import { MODULE, SUB_MODULE } from '@/constants';
import { API_URL } from '@/constants/api-url';
import { BaseService } from '@/services/base.service';
import type { BaseType } from '@/types';
import axios from 'axios';

export interface User extends BaseType {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  user_category_id: string;
}

export class UserService extends BaseService<User> {
  constructor() {
    super(API_URL[SUB_MODULE[MODULE.USER_MANAGEMENT]['USER'] as string]);
  }

  async create(payload: any) {
    const { data } = await axios.post(`${this.endpoint}/create`, payload);
    return data;
  }
}

export const userService = new UserService();
