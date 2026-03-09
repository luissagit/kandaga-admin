import { createModuleContext } from '@/context/base-module.context';
import type { Document, DocumentService } from './service';

export const [ModuleProvider, useModuleContext] = createModuleContext<
  Document,
  DocumentService
>();
