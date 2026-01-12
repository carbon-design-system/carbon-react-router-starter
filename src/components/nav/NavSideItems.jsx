import { SideNavLink, SideNavMenu, SideNavMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';

/**
 * Helper function to generate destination props for navigation items.
 * Returns either React Router Link props or standard href props.
 *
 * @param {string} path - Route path for internal navigation
 * @param {Object} carbon - Carbon configuration object
 * @param {string} [carbon.href] - External URL if not using internal routing
 * @param {string} currentPath - Current browser path
 * @returns {Object} Props object for navigation component
 */
const destinationProps = (path, carbon, currentPath) =>
  path
    ? {
        as: RouterLink,
        isActive: path === currentPath,
      }
    : {
        href: carbon.href,
      };

/**
 * Renders navigation items for the side navigation panel.
 * Supports both single links and expandable menus with sub-items.
 * Automatically highlights active routes and handles both internal and external links.
 *
 * @param {Object} props - Component props
 * @param {Array<any>} props.routesInSideNav - Array of route configuration objects for side navigation
 * @param {string} props.currentPath - Current browser path for highlighting active items
 * @returns {JSX.Element} Rendered side navigation items
 *
 * @example
 * <NavSideItems
 *   routesInSideNav={routesConfig}
 *   currentPath="/dashboard"
 * />
 */
export const NavSideItems = ({ routesInSideNav, currentPath }) => (
  <>
    {routesInSideNav.map(({ path, carbon }) =>
      !carbon.inSubMenu && carbon?.label ? (
        carbon.subMenu ? (
          <SideNavMenu
            key={path ?? carbon.label}
            renderIcon={carbon.icon}
            title={carbon.label}
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
                {subRoute.carbon.label}
              </SideNavMenuItem>
            ))}
          </SideNavMenu>
        ) : (
          <SideNavLink
            key={path ?? carbon.label}
            renderIcon={carbon.icon}
            {...destinationProps(path, carbon, currentPath)}
          >
            {carbon.label}
          </SideNavLink>
        )
      ) : null,
    )}
  </>
);
