import { createModuleContext } from '@/context/base-module.context';
import type { UserCategory, UserCategoryService } from './service';

export const [ModuleProvider, useModuleContext] = createModuleContext<
  UserCategory,
  UserCategoryService
>();
