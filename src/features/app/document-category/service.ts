import { MODULE, SUB_MODULE } from '@/constants';
import { API_URL } from '@/constants/api-url';
import { BaseService } from '@/services/base.service';
import type { BaseType } from '@/types';

export interface DocumentCategory extends BaseType {
  type: string;
  file_type: string;
  icon_url: string;
}

export class DocumentCategoryService extends BaseService<DocumentCategory> {
  constructor() {
    super(
      API_URL[SUB_MODULE[MODULE.MASTER_DATA]['DOCUMENT_CATEGORY'] as string],
    );
  }
}

export const documentCategoryService = new DocumentCategoryService();
