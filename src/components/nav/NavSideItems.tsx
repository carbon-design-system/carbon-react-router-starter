import { SideNavLink, SideNavMenu, SideNavMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';
import { FC } from 'react';
import type { RouteConfigArray, CarbonRoute } from '../../types/routes';

type DestinationPropsWithPath = {
  as: typeof RouterLink;
  to: string;
  isActive: boolean;
};

type DestinationPropsWithHref = {
  href: string;
};

type DestinationProps = DestinationPropsWithPath | DestinationPropsWithHref;

const destinationProps = (
  path: string | undefined,
  carbon: CarbonRoute,
  currentPath: string,
): DestinationProps =>
  path
    ? {
        as: RouterLink,
        to: path,
        isActive: path === currentPath,
      }
    : {
        href: carbon.href!,
      };

interface NavSideItemsProps {
  routesInSideNav: RouteConfigArray;
  currentPath: string;
}

export const NavSideItems: FC<NavSideItemsProps> = ({
  routesInSideNav,
  currentPath,
}) => (
  <>
    {routesInSideNav.map(({ path, carbon }) =>
      !carbon?.inSubMenu && carbon?.label ? (
        carbon.subMenu ? (
          <SideNavMenu
            key={path ?? carbon.label}
            renderIcon={carbon.icon}
            title={carbon.label}
          >
            {carbon.subMenu.map((subRoute) => (
              <SideNavMenuItem
                key={subRoute.path ?? subRoute.carbon?.label}
                {...destinationProps(
                  subRoute.path,
                  subRoute.carbon!,
                  currentPath,
                )}
              >
                {subRoute.carbon?.label}
              </SideNavMenuItem>
            ))}
          </SideNavMenu>
        ) : (
          <SideNavLink
            key={path ?? carbon.label}
            renderIcon={carbon.icon}
            {...(destinationProps(path, carbon, currentPath) as any)}
          >
            {carbon.label}
          </SideNavLink>
        )
      ) : null,
    )}
  </>
);

// Made with Bob
