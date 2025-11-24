import { HeaderMenu, HeaderMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';

/**
 * Check if a menu path should be active based on the current path
 * Handles both exact matches and dynamic route segments
 */
const isPathActive = (menuPath, currentPath) => {
  if (!menuPath || !currentPath) return false;
  // Exact match
  if (menuPath === currentPath) return true;
  // Match dynamic routes: /dashboard should be active for /dashboard/123
  return currentPath.startsWith(`${menuPath}/`);
};

export const NavHeaderItems = ({ navigationItems, currentPath }) => (
  <>
    {navigationItems.map((item) =>
      item.label ? (
        item.subMenu ? (
          <HeaderMenu
            aria-label={item.label}
            key={item.path}
            menuLinkName={item.label}
          >
            {item.subMenu.map((subItem) => (
              <HeaderMenuItem
                as={RouterLink}
                to={subItem.path}
                key={subItem.path}
                isActive={isPathActive(subItem.path, currentPath)}
              >
                {subItem.label}
              </HeaderMenuItem>
            ))}
          </HeaderMenu>
        ) : (
          <HeaderMenuItem
            as={RouterLink}
            key={item.path}
            to={item.path}
            isActive={isPathActive(item.path, currentPath)}
          >
            {item.label}
          </HeaderMenuItem>
        )
      ) : null,
    )}
  </>
);
