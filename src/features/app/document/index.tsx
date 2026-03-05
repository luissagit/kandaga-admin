import { WEB_URL } from '@/constants/web-url';
import { ModuleProvider } from './context';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { MODULE, SUB_MODULE } from '@/constants';
import { documentService } from './service';

const IndexPage = React.lazy(() => import('./pages/index-page'));
const FormPage = React.lazy(() => import('./pages/form-page'));
const DetailPage = React.lazy(() => import('./pages/detail-page'));

export default function UserCategory() {
  return (
    <ModuleProvider
      config={{
        service: documentService,
        webUrl: WEB_URL.DOCUMENT,
        module: MODULE.TRANSACTION,
        subModuleTitle: 'Transaction',
        subModule: SUB_MODULE[MODULE.TRANSACTION]['DOCUMENT'] as string,
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
