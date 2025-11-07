import { SideNavLink, SideNavMenu, SideNavMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';
import { useTranslation } from 'react-i18next';

const destinationProps = (path, carbon, currentPath) =>
  path
    ? {
        as: RouterLink,
        isActive: path === currentPath,
      }
    : {
        href: carbon.href,
      };

export const NavSideItems = ({ routesInSideNav, currentPath }) => {
  const { t } = useTranslation();

  return (
    <>
      {routesInSideNav.map(({ path, carbon }) =>
        !carbon.inSubMenu && carbon?.label ? (
          carbon.subMenu ? (
            <SideNavMenu
              key={path ?? carbon.label}
              renderIcon={carbon.icon}
              title={t(carbon.labelKey, carbon.label)}
            >
              {carbon.subMenu.map((subRoute) => (
                <SideNavMenuItem
                  key={subRoute.path ?? subRoute.carbon.label}
                  {...destinationProps(
                    subRoute.path,
                    subRoute.carbon,
                    currentPath,
                  )}
                >
                  {t(subRoute.carbon.labelKey, subRoute.carbon.label)}
                </SideNavMenuItem>
              ))}
            </SideNavMenu>
          ) : (
            <SideNavLink
              key={path ?? carbon.label}
              renderIcon={carbon.icon}
              {...destinationProps(path, carbon, currentPath)}
            >
              {t(carbon.labelKey, carbon.label)}
            </SideNavLink>
          )
        ) : null,
      )}
    </>
  );
};
