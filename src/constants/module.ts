export const MODULE = {
  CONFIGURATION: 'configuration',
  MASTER_DATA: 'master_data',
  USER_MANAGEMENT: 'user_management',
  TRANSACTION: 'transaction',
};

export const SUB_MODULE = {
  [MODULE.CONFIGURATION]: {
    COMPANY: 'company',
  },
  [MODULE.MASTER_DATA]: {
    DOCUMENT_CATEGORY: 'document_category',
  },
  [MODULE.USER_MANAGEMENT]: {
    USER: 'user',
    USER_CATEGORY: 'user_category',
    ACCESS_RIGHT: 'access_right',
  },
  [MODULE.TRANSACTION]: {
    DOCUMENT: 'document',
  },
};
