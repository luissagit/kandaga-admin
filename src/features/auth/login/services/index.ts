import { MODULE, SUB_MODULE } from '@/constants';
import { API_URL } from '@/constants/api-url';
import { BaseService } from '@/services/base.service';
import axios from 'axios';

export interface Auth {
  username: string;
  email: string;
  name: string;
}

class AuthService extends BaseService<Auth> {
  constructor() {
    super(API_URL[SUB_MODULE[MODULE.USER_MANAGEMENT]['USER'] as string]);
  }

  async login(payload?: any) {
    const { data } = await axios.request({
      url: this.endpoint + '/login',
      method: 'post',
      data: payload,
    });
    return data;
  }

  async register(payload?: any) {
    const { data } = await axios.request({
      url: this.endpoint + '/register',
      method: 'post',
      data: payload,
    });
    return data;
  }

  async verifyEmail(payload?: any) {
    const { data } = await axios.request({
      url: this.endpoint + '/verify',
      method: 'post',
      data: payload,
    });
    return data;
  }

  async resendEmail(payload?: any) {
    const { data } = await axios.request({
      url: this.endpoint + '/resend-otp',
      method: 'post',
      data: payload,
    });
    return data;
  }
}

export const authService = new AuthService();
