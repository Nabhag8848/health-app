import { Outlet, useLocation } from 'react-router-dom';
import { StrictMode } from 'react';
import { PageTitle } from '@/ui/utilities/page-title/components/page-title';
import { getPageTitleFromPath } from '@/ui/utilities/page-title/utils/get-page-title-from-path';
import QueryClientProvider from '@/app/context/query-client/query-client-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const AppRouterProviders = () => {
  const { pathname } = useLocation();
  const pageTitle = getPageTitleFromPath(pathname);
  return (
    <StrictMode>
      <QueryClientProvider>
        <PageTitle title={pageTitle} />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
};
