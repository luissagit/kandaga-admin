import { MODULE, SUB_MODULE } from './module';

export const API_URL = {
  [`${SUB_MODULE[MODULE.CONFIGURATION]['COMPANY']}`]: '/companies',
  [`${SUB_MODULE[MODULE.MASTER_DATA]['DOCUMENT_CATEGORY']}`]:
    '/document-categories',
  [`${SUB_MODULE[MODULE.USER_MANAGEMENT]['USER']}`]: '/users',
  [`${SUB_MODULE[MODULE.USER_MANAGEMENT]['USER_CATEGORY']}`]:
    '/user-categories',
  [`${SUB_MODULE[MODULE.TRANSACTION]['DOCUMENT']}`]: '/documents',
};
