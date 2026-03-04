import { WEB_URL } from '@/constants/web-url';
import { ModuleProvider } from './context';
import { companyService } from './service';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { MODULE, SUB_MODULE } from '@/constants';

const IndexPage = React.lazy(() => import('./pages/index-page'));
const FormPage = React.lazy(() => import('./pages/form-page'));
const DetailPage = React.lazy(() => import('./pages/detail-page'));

export default function Company() {
  return (
    <ModuleProvider
      config={{
        service: companyService,
        webUrl: WEB_URL.COMPANY,
        subModuleTitle: 'Configuration',
        subModule: SUB_MODULE[MODULE.CONFIGURATION]['COMPANY'] as string,
      }}
    >
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="update/:id" element={<FormPage />} />
        <Route path="detail/:id" element={<DetailPage />} />
      </Routes>
    </ModuleProvider>
  );
}
