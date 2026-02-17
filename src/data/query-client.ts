/**
 * Configuration file for the query client.
 */

import { QueryClient } from '@tanstack/react-query';

// import { t } from 'i18next'

/**
 * The time in milliseconds after which a query is considered stale.
 */
const QUERY_STALE_TIME = 1000 * 30; // 30sec

/**
 * The time in milliseconds to wait before retrying a stale query.
 */
const QUERY_RETRY_STALE_TIME = 10000 * 60; // 1min

/**
 * The time in milliseconds to cache query results.
 */
const QUERY_CACHE_TIME = 1000 * 60 * 5; // 5min

/**
 * Configuration options for query retries.
 */
const queryRetryConfigs = {
  staleTime: QUERY_STALE_TIME,
  retryDelay: QUERY_RETRY_STALE_TIME,
};

/**
 * The react-query client instance.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: QUERY_CACHE_TIME,
      staleTime: QUERY_STALE_TIME,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

export const queryClientConfig = {
  queryClient,
  queryRetryConfigs,
};
