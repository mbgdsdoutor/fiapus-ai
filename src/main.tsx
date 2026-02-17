import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { theme } from '@/theme/theme';

import { queryClientConfig } from './data/query-client';
import './index.css';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClientConfig.queryClient}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
