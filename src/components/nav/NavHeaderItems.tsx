/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HeaderMenu, HeaderMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';
import type { NavRouteType } from '../../routes/config';
import { useRouteLabel } from './useRouteLabel';

interface NavHeaderItemsProps {
  routesInHeader: NavRouteType[];
  currentPath: string;
}

/**
 * Check if a menu path should be active based on the current path
 * Handles both exact matches and dynamic route segments
 */
const isPathActive = (menuPath: string, currentPath: string): boolean =>
  // Exact match, or a dynamic route: /dashboard should be active for /dashboard/123
  menuPath === currentPath || currentPath.startsWith(`${menuPath}/`);

export const NavHeaderItems = ({ routesInHeader, currentPath }: NavHeaderItemsProps) => {
  const routeLabel = useRouteLabel();

  return (
    <>
      {routesInHeader.map(({ path, carbon }) =>
        !carbon.inSubMenu && carbon.label ? (
          carbon.subMenu ? (
            <HeaderMenu aria-label={routeLabel(carbon)} key={path} menuLinkName={routeLabel(carbon)}>
              {carbon.subMenu.map((subRoute) =>
                // Header entries are router links, so entries without a path are skipped
                subRoute.path ? (
                  <HeaderMenuItem
                    as={RouterLink}
                    to={subRoute.path}
                    key={subRoute.path}
                    isActive={isPathActive(subRoute.path, currentPath)}
                  >
                    {routeLabel(subRoute.carbon)}
                  </HeaderMenuItem>
                ) : null,
              )}
            </HeaderMenu>
          ) : path ? (
            <HeaderMenuItem as={RouterLink} key={path} to={path} isActive={isPathActive(path, currentPath)}>
              {routeLabel(carbon)}
            </HeaderMenuItem>
          ) : null
        ) : null,
      )}
    </>
  );
};
