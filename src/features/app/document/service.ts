import { MODULE, SUB_MODULE } from '@/constants';
import { API_URL } from '@/constants/api-url';
import { BaseService } from '@/services/base.service';
import type { BaseType } from '@/types';

export interface Document extends BaseType {
  document_url: string;
  description?: string;
  document_category_id: string;
}

export class DocumentService extends BaseService<Document> {
  constructor() {
    super(API_URL[SUB_MODULE[MODULE.TRANSACTION]['DOCUMENT'] as string]);
  }
}

export const documentService = new DocumentService();
