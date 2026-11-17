/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SideNavLink, SideNavMenu, SideNavMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';
import type { NavRouteType } from '../../routes/config';
import { useRouteLabel } from './useRouteLabel';

interface NavSideItemsProps {
  routesInSideNav: NavRouteType[];
  currentPath: string;
}

export const NavSideItems = ({ routesInSideNav, currentPath }: NavSideItemsProps) => {
  const routeLabel = useRouteLabel();

  // Routes with a path are router links; routes without one link to carbon.href
  return (
    <>
      {routesInSideNav.map(({ path, carbon }) =>
        !carbon.inSubMenu && carbon.label ? (
          carbon.subMenu ? (
            <SideNavMenu key={path ?? carbon.label} renderIcon={carbon.icon} title={routeLabel(carbon)}>
              {carbon.subMenu.map((subRoute) =>
                subRoute.path ? (
                  <SideNavMenuItem
                    key={subRoute.path}
                    as={RouterLink}
                    to={subRoute.path}
                    isActive={subRoute.path === currentPath}
                  >
                    {routeLabel(subRoute.carbon)}
                  </SideNavMenuItem>
                ) : (
                  <SideNavMenuItem key={subRoute.carbon.label} href={subRoute.carbon.href}>
                    {routeLabel(subRoute.carbon)}
                  </SideNavMenuItem>
                ),
              )}
            </SideNavMenu>
          ) : path ? (
            <SideNavLink key={path} renderIcon={carbon.icon} as={RouterLink} to={path} isActive={path === currentPath}>
              {routeLabel(carbon)}
            </SideNavLink>
          ) : (
            <SideNavLink key={carbon.label} renderIcon={carbon.icon} href={carbon.href}>
              {routeLabel(carbon)}
            </SideNavLink>
          )
        ) : null,
      )}
    </>
  );
};
