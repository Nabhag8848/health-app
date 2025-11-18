import { AppPath } from '@/app/enums/app-path';
import { PageTitle } from '@/ui/utilities/page-title/enums/page-title';

export const getPageTitleFromPath = (pathname: string): string => {
  switch (pathname as AppPath) {
    case AppPath.ROOT:
      return PageTitle.ROOT;
    default:
      return 'App';
  }
};
