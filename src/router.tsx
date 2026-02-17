import { createBrowserRouter, Navigate } from 'react-router-dom';

import { reportRoutes } from '@/modules/report/report-routes';

import AppShell from './components/layout/app-shell/app-shell';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [...reportRoutes],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
