import { WEB_URL } from '@/constants/web-url';
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const LoginPage = React.lazy(() => import('@/features/auth/login'));
const RegisterPage = React.lazy(() => import('@/features/auth/register'));
const VerifyEmailPage = React.lazy(
  () => import('@/features/auth/verify-email'),
);

const AppPage = React.lazy(() => import('@/features/app'));
const CompanyPage = React.lazy(() => import('@/features/app/company'));
const UserCategoryPage = React.lazy(
  () => import('@/features/app/user-category'),
);
const UserPage = React.lazy(() => import('@/features/app/user'));
const DocumentCategoryPage = React.lazy(
  () => import('@/features/app/document-category'),
);
const DocumentPage = React.lazy(() => import('@/features/app/document'));
const DocumentUserPage = React.lazy(
  () => import('@/features/app/document-user'),
);

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
    path: WEB_URL.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: WEB_URL.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
  {
    path: WEB_URL.APP,
    element: <AppPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/document" replace />,
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
      {
        path: WEB_URL.DOCUMENT_CATEGORY + '/*',
        element: <DocumentCategoryPage />,
      },
      {
        path: WEB_URL.DOCUMENT + '/*',
        element: <DocumentPage />,
      },
      {
        path: WEB_URL.DOCUMENT_USER + '/*',
        element: <DocumentUserPage />,
      },
    ],
  },
]);
