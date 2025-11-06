import { HeaderMenu, HeaderMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';
import { useTranslation } from 'react-i18next';

export const NavHeaderItems = ({ routesInHeader, currentPath }) => {
  const { t } = useTranslation();

  return (
    <>
      {routesInHeader.map(({ path, carbon }) =>
        !carbon.inSubMenu && carbon?.label ? (
          carbon.subMenu ? (
            <HeaderMenu
              aria-label={t(carbon.labelKey, carbon.label)}
              key={path}
              menuLinkName={t(carbon.labelKey, carbon.label)}
            >
              {carbon.subMenu.map((subRoute) => (
                <HeaderMenuItem
                  as={RouterLink}
                  to={subRoute.path}
                  key={subRoute.path}
                  isActive={subRoute.path === currentPath}
                >
                  {t(subRoute.carbon.labelKey, subRoute.carbon.label)}
                </HeaderMenuItem>
              ))}
            </HeaderMenu>
          ) : (
            <HeaderMenuItem
              as={RouterLink}
              key={path}
              to={path}
              isActive={path === currentPath}
            >
              {t(carbon.labelKey, carbon.label)}
            </HeaderMenuItem>
          )
        ) : null,
      )}
    </>
  );
};
