/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MagicWand, LogoGithub } from '@carbon/icons-react';
import Dashboard from '../pages/dashboard/Dashboard';
import NotFound from '../pages/not-found/NotFound';
import Placeholder from '../pages/placeholder/Placeholder';
import Welcome from '../pages/welcome/Welcome';

// type carbonRouteType = {
//   virtualPath: string; // related to path, used for arranging Carbon menu when no path exists
//   label: string;
//   inHeader?: boolean;
//   inSideNav?: boolean;
//   separator?: boolean;
//   icon?: CarbonIconType;
//   subMenu?: routesType[];
//   inSubMenu?: boolean;
//   href?: string,
// };

// type routesType = {
//   path: string;
//   index?: boolean;
//   element?: ({ usingOutlet }: { usingOutlet?: boolean }) => JSX.Element;
//   status?: number;
//   carbon?: carbonRouteType;
// };

export const routes = [
  {
    index: true,
    path: '/',
    element: Welcome,
  },
  {
    path: '/dashboard',
    element: Dashboard,
    carbon: {
      labelKey: 'routes.dashboard',
      label: 'Dashboard',
      inHeader: true,
    },
  },
  {
    path: '/dashboard/:id',
    element: Dashboard,
  },
  {
    path: '/link-1',
    element: Placeholder,
    carbon: {
      labelKey: 'routes.link1',
      label: 'Link 1',
      inHeader: true,
    },
  },
  {
    path: '/link-2',
    element: Placeholder,
    carbon: {
      labelKey: 'routes.link2',
      label: 'Link 2',
      inHeader: true,
    },
  },
  {
    path: '/link-3',
    element: Placeholder,
    carbon: {
      labelKey: 'routes.link3',
      label: 'Link 3',
      inHeader: true,
    },
  },
  {
    path: '/link-4',
    carbon: {
      labelKey: 'routes.link4',
      label: 'Link 4',
      inHeader: true,
    },
  },
  {
    path: '/link-4/sub-link-1',
    element: Placeholder,
    carbon: {
      labelKey: 'routes.link4.subLink1',
      label: 'Sub-link 1',
    },
  },
  {
    path: '/link-4/sub-link-2',
    element: Placeholder,
    carbon: {
      labelKey: 'routes.link4.subLink2',
      label: 'Sub-link 2',
    },
  },
  {
    path: '/link-4/sub-link-3',
    element: Placeholder,
    carbon: {
      labelKey: 'routes.link4.subLink3',
      label: 'Sub-link 3',
    },
  },
  {
    carbon: {
      virtualPath: '/getting-started',
      inSideNav: true,
      labelKey: 'routes.gettingStarted',
      label: 'Getting Started',
      icon: MagicWand,
      href: `https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#get-started`,
    },
  },
  {
    carbon: {
      virtualPath: '/getting-started/how',
      labelKey: 'routes.gettingStarted.how',
      label: 'How does this work',
      href: `https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#how-does-this-work`,
    },
  },
  {
    carbon: {
      virtualPath: '/getting-started/up-to-date',
      labelKey: 'routes.gettingStarted.upToDate',
      label: 'Keeping this up to date',
      href: `https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#keeping-this-up-to-date`,
    },
  },
  {
    carbon: {
      virtualPath: '/getting-started/report',
      labelKey: 'routes.gettingStarted.report',
      label: 'Report problems',
      href: `https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#report-problems`,
    },
  },
  {
    carbon: {
      virtualPath: '/github',
      inSideNav: true,
      labelKey: 'routes.github',
      label: 'GitHub',
      icon: LogoGithub,
      href: `https://github.com/carbon-design-system/carbon-react-router-starter`,
    },
  },

  {
    path: '*',
    element: NotFound,
    status: 404,
  },
];

// The routes config is a flat structure defined for use with react-router.
// Here we organize the routes into a hierarchy for use by the Carbon header and sidenav
// NOTE: The routes are processed outside of a component as they are not dynamic.
const routesProcessed = routes.map((route) => {
  if (!route.carbon) {
    return route;
  }

  const path = route.path || route.carbon.virtualPath;

  const subMenu = routes.filter((subRoute) => {
    // Only include routes with carbon config in navigation menus
    if (!subRoute.carbon) return false;

    const subPath = subRoute.path || subRoute.carbon.virtualPath;
    const childPath = new RegExp(`^${path}/[^/]+$`); // match direct parent only

    return !route.index && subPath && childPath.test(subPath);
  });

  if (subMenu && subMenu.length > 0) {
    // add sub menu to parent
    route.carbon.subMenu = subMenu;

    // mark child as in sub menu
    subMenu.forEach((menu) => {
      const subPath = menu.path || menu.carbon.virtualPath;
      // Carbon should never be blank
      menu.carbon = menu.carbon || { label: subPath };
      menu.carbon.inSubMenu = true;
    });
  }

  return route;
});

export const routesInHeader = routesProcessed.filter(
  (route) => route.carbon && route.carbon.inHeader && !route.carbon.inSubMenu,
);

export const routesInSideNav = routesProcessed.filter(
  (route) => route.carbon && route.carbon.inSideNav && !route.carbon.inSubMenu,
);
