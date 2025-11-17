import { Route } from 'react-router-dom';
import {
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AppPath } from '@/app/enums/app-path';
import { AppRouterProviders } from '@/app/components/app-router-providers';
import { DefaultLayout } from '@/ui/layout/components/default-layout';
import { ClinicsPage } from '@/clinic/pages/clinics-page';

export const useCreateRouter = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppRouterProviders />}>
        <Route element={<DefaultLayout />}>
          <Route path={AppPath.ROOT} element={<ClinicsPage />} />
        </Route>
      </Route>
    )
  );
};
