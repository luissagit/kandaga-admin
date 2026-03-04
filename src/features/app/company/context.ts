import { createModuleContext } from '@/context/base-module.context';
import type { Company, CompanyService } from './service';

export const [ModuleProvider, useModuleContext] = createModuleContext<
  Company,
  CompanyService
>();
