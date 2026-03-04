import { WEB_URL } from '@/constants/web-url';
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const LoginPage = React.lazy(() => import('@/features/auth/login'));

const AppPage = React.lazy(() => import('@/features/app'));
const CompanyPage = React.lazy(() => import('@/features/app/company'));
const UserCategoryPage = React.lazy(
  () => import('@/features/app/user-category'),
);
const UserPage = React.lazy(() => import('@/features/app/user'));

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
      {
        path: WEB_URL.USER_CATEGORY + '/*',
        element: <UserCategoryPage />,
      },
      {
        path: WEB_URL.USER + '/*',
        element: <UserPage />,
      },
    ],
  },
]);
