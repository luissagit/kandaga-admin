import { MODULE, SUB_MODULE } from '@/constants';
import { API_URL } from '@/constants/api-url';
import { BaseService } from '@/services/base.service';
import type { BaseType } from '@/types';

export interface Company extends BaseType {
  address: string;
}

export class CompanyService extends BaseService<Company> {
  constructor() {
    super(API_URL[SUB_MODULE[MODULE.CONFIGURATION]['COMPANY'] as string]);
  }
}

export const companyService = new CompanyService();
