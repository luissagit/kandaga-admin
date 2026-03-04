import { WEB_URL } from '@/constants/web-url';
import { ModuleProvider } from './context';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { MODULE, SUB_MODULE } from '@/constants';
import { userService } from './service';

const IndexPage = React.lazy(() => import('./pages/index-page'));
const FormPage = React.lazy(() => import('./pages/form-page'));
const DetailPage = React.lazy(() => import('./pages/detail-page'));

export default function UserCategory() {
  return (
    <ModuleProvider
      config={{
        service: userService,
        webUrl: WEB_URL.USER,
        subModuleTitle: 'User',
        subModule: SUB_MODULE[MODULE.USER_MANAGEMENT]['USER'] as string,
      }}
    >
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="update/:id" element={<FormPage />} />
        <Route path="create" element={<FormPage />} />
        <Route path="detail/:id" element={<DetailPage />} />
      </Routes>
    </ModuleProvider>
  );
}
