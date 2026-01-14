import { HeaderMenu, HeaderMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';
import { FC } from 'react';
import type { RouteConfigArray } from '../../types/routes';

/**
 * Check if a menu path should be active based on the current path
 * Handles both exact matches and dynamic route segments
 */
const isPathActive = (
  menuPath: string | undefined,
  currentPath: string,
): boolean => {
  if (!menuPath || !currentPath) return false;
  // Exact match
  if (menuPath === currentPath) return true;
  // Match dynamic routes: /dashboard should be active for /dashboard/123
  return currentPath.startsWith(`${menuPath}/`);
};

interface NavHeaderItemsProps {
  routesInHeader: RouteConfigArray;
  currentPath: string;
}

export const NavHeaderItems: FC<NavHeaderItemsProps> = ({
  routesInHeader,
  currentPath,
}) => (
  <>
    {routesInHeader.map(({ path, carbon }) =>
      !carbon?.inSubMenu && carbon?.label ? (
        carbon.subMenu ? (
          <HeaderMenu
            aria-label={carbon.label}
            key={path}
            menuLinkName={carbon.label}
          >
            {carbon.subMenu.map((subRoute) => (
              <HeaderMenuItem
                as={RouterLink}
                to={subRoute.path!}
                key={subRoute.path}
                isActive={isPathActive(subRoute.path, currentPath)}
              >
                {subRoute.carbon?.label}
              </HeaderMenuItem>
            ))}
          </HeaderMenu>
        ) : (
          <HeaderMenuItem
            as={RouterLink}
            key={path}
            to={path!}
            isActive={isPathActive(path, currentPath)}
          >
            {carbon.label}
          </HeaderMenuItem>
        )
      ) : null,
    )}
  </>
);
