import React from 'react';
import { SideNavLink, SideNavMenu, SideNavMenuItem } from '@carbon/react';
import { Link as RouterLink } from 'react-router';

const destinationProps = (item, currentPath) =>
  item.path && !item.href
    ? {
        as: RouterLink,
        to: item.path,
        isActive: item.path === currentPath,
      }
    : {
        href: item.href,
      };

export const NavSideItems = ({ navigationItems, currentPath }) => (
  <>
    {navigationItems.map((item) =>
      item.label ? (
        item.subMenu ? (
          <SideNavMenu
            key={item.path ?? item.label}
            renderIcon={item.icon}
            title={item.label}
          >
            {item.subMenu.map((subItem) => (
              <SideNavMenuItem
                key={subItem.path ?? subItem.label}
                {...destinationProps(subItem, currentPath)}
              >
                {subItem.label}
              </SideNavMenuItem>
            ))}
          </SideNavMenu>
        ) : (
          <SideNavLink
            key={item.path ?? item.label}
            renderIcon={item.icon}
            {...destinationProps(item, currentPath)}
          >
            {item.label}
          </SideNavLink>
        )
      ) : null,
    )}
  </>
);
