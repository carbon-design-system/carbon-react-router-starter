/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from 'react';
import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
} from '@carbon/react';

import { Search, Switcher as SwitcherIcon } from '@carbon/icons-react';
import { Link as RouterLink, useLocation } from 'react-router';

import { routesInHeader, routesInSideNav } from '../../routes/config';

const destinationProps = (path, carbon, currentPath) =>
  path
    ? {
        as: RouterLink,
        isActive: path === currentPath,
      }
    : {
        href: carbon.href,
      };

const NavSideItems = ({ routesInSideNav, currentPath }) => (
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

const NavHeaderItems = ({ routesInHeader, currentPath }) => (
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
                isActive={subRoute.path === currentPath}
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
            isActive={path === currentPath}
          >
            {carbon?.label}
          </HeaderMenuItem>
        )
      ) : null,
    )}
  </>
);
export const Nav = () => {
  const location = useLocation();
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  const toggleNav = () => {
    // Reason for this implementation of state change through an updater function:
    // https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
    setIsSideNavExpanded((isExpanded) => !isExpanded);
  };

  return (
    <>
      <Header aria-label="fed-at-ibm">
        <SkipToContent />
        <HeaderMenuButton
          aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
          onClick={toggleNav}
          isCollapsible={true}
          isActive={isSideNavExpanded}
          aria-expanded={isSideNavExpanded}
        />
        <HeaderName as={RouterLink} to="/" prefix="Carbon">
          React starter template
        </HeaderName>
        {routesInHeader.length > 0 && (
          <HeaderNavigation aria-label="fed-at-ibm">
            <NavHeaderItems
              routesInHeader={routesInHeader}
              currentPath={location.pathname}
            />
          </HeaderNavigation>
        )}
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Search">
            <Search size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App switcher" tooltipAlignment="end">
            <SwitcherIcon size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        isPersistent={false}
      >
        <SideNavItems>
          {routesInHeader.length > 0 && (
            <HeaderSideNavItems hasDivider>
              <NavHeaderItems
                routesInHeader={routesInHeader}
                currentPath={location.pathname}
              />
            </HeaderSideNavItems>
          )}

          <NavSideItems
            routesInSideNav={routesInSideNav}
            currentPath={location.pathname}
          />
        </SideNavItems>
      </SideNav>
    </>
  );
};
