import { createModuleContext } from '@/context/base-module.context';
import type { User, UserService } from './service';

export const [ModuleProvider, useModuleContext] = createModuleContext<
  User,
  UserService
>();
