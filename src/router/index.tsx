import { WEB_URL } from '@/constants/web-url';
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const LoginPage = React.lazy(() => import('@/features/auth/login'));

const AppPage = React.lazy(() => import('@/features/app'));
const CompanyPage = React.lazy(() => import('@/features/app/company'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={WEB_URL.APP} replace />,
  },
  {
    path: WEB_URL.LOGIN,
    element: <LoginPage />,
  },
  {
    path: WEB_URL.APP,
    element: <AppPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/company" replace />,
      },
      {
        path: WEB_URL.COMPANY + '/*',
        element: <CompanyPage />,
      },
    ],
  },
]);
