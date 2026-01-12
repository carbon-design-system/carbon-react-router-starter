import { HeaderMenu, HeaderMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';

/**
 * Check if a menu path should be active based on the current path.
 * Handles both exact matches and dynamic route segments.
 *
 * @param {string} menuPath - The menu item's path
 * @param {string} currentPath - The current browser path
 * @returns {boolean} True if the menu path should be marked as active
 */
const isPathActive = (menuPath, currentPath) => {
  if (!menuPath || !currentPath) return false;
  // Exact match
  if (menuPath === currentPath) return true;
  // Match dynamic routes: /dashboard should be active for /dashboard/123
  return currentPath.startsWith(`${menuPath}/`);
};

/**
 * Renders navigation items for the header navigation bar.
 * Supports both single menu items and dropdown menus with sub-items.
 * Automatically highlights active routes based on current path.
 *
 * @param {Object} props - Component props
 * @param {Array<any>} props.routesInHeader - Array of route configuration objects for header
 * @param {string} props.currentPath - Current browser path for highlighting active items
 * @returns {JSX.Element} Rendered header navigation items
 *
 * @example
 * <NavHeaderItems
 *   routesInHeader={[
 *     { path: '/dashboard', carbon: { label: 'Dashboard', inHeader: true } }
 *   ]}
 *   currentPath="/dashboard"
 * />
 */
export const NavHeaderItems = ({ routesInHeader, currentPath }) => (
  <>
    {routesInHeader.map(({ path, carbon }) =>
      !carbon.inSubMenu && carbon?.label ? (
        carbon.subMenu ? (
          <HeaderMenu
            aria-label={carbon.label}
            key={path}
            menuLinkName={carbon.label}
          >
            {carbon.subMenu.map((subRoute) => (
              <HeaderMenuItem
                as={RouterLink}
                to={subRoute.path}
                key={subRoute.path}
                isActive={isPathActive(subRoute.path, currentPath)}
              >
                {subRoute.carbon.label}
              </HeaderMenuItem>
            ))}
          </HeaderMenu>
        ) : (
          <HeaderMenuItem
            as={RouterLink}
            key={path}
            to={path}
            isActive={isPathActive(path, currentPath)}
          >
            {carbon?.label}
          </HeaderMenuItem>
        )
      ) : null,
    )}
  </>
);
