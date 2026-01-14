import { HeaderMenu, HeaderMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';
import { useTranslation } from 'react-i18next';

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

export const NavHeaderItems = ({ routesInHeader, currentPath }) => {
  const { t } = useTranslation();

  return (
    <>
      {routesInHeader.map(({ path, carbon }) =>
        !carbon.inSubMenu && carbon?.label ? (
          carbon.subMenu ? (
            <HeaderMenu
              aria-label={
                carbon.labelKey
                  ? t(carbon.labelKey, carbon.label)
                  : carbon.label
              }
              key={path}
              menuLinkName={
                carbon.labelKey
                  ? t(carbon.labelKey, carbon.label)
                  : carbon.label
              }
            >
              {carbon.subMenu.map((subRoute) => (
                <HeaderMenuItem
                  as={RouterLink}
                  to={subRoute.path}
                  key={subRoute.path}
                  isActive={isPathActive(subRoute.path, currentPath)}
                >
                  {subRoute.carbon.labelKey
                    ? t(subRoute.carbon.labelKey, subRoute.carbon.label)
                    : subRoute.carbon.label}
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
              {carbon.labelKey
                ? t(carbon.labelKey, carbon.label)
                : carbon.label}
            </HeaderMenuItem>
          )
        ) : null,
      )}
    </>
  );
};
