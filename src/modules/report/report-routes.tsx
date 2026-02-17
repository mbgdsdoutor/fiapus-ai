import { type RouteObject } from 'react-router-dom';

import { NewReportPage, ReportListPage } from '@/modules/report/pages';

export const reportRoutesPaths = {
  root: '/',
  list: '/laudos',
  detail: (reportId = ':id') => `/laudos/${reportId}`,
};

export const reportRoutes: RouteObject[] = [
  {
    index: true,
    path: reportRoutesPaths.root,
    element: <NewReportPage />,
  },
  {
    path: reportRoutesPaths.list,
    element: <ReportListPage />,
  },
  {
    path: reportRoutesPaths.detail(),
    element: <ReportListPage />,
  },
];
