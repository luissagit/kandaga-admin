import { createModuleContext } from '@/context/base-module.context';
import type { DocumentCategory, DocumentCategoryService } from './service';

export const [ModuleProvider, useModuleContext] = createModuleContext<
  DocumentCategory,
  DocumentCategoryService
>();
