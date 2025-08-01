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

import {
  LogoGithub,
  MagicWand,
  Search,
  Switcher as SwitcherIcon,
} from '@carbon/icons-react';
import { useLocation, Link } from 'react-router';

function NavigationItems({ location }) {
  return (
    <>
      <HeaderMenuItem
        as={Link}
        to="/dashboard"
        isActive={location.pathname === '/dashboard'}
      >
        Dashboard
      </HeaderMenuItem>
      <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
      <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
      <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
        <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
        <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
        <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
      </HeaderMenu>
    </>
  );
}

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
        <HeaderName as={Link} to="/" prefix="Carbon">
          React starter template
        </HeaderName>
        <HeaderNavigation aria-label="fed-at-ibm">
          {/* Render navigation items for viewports equal to or larger than the "Large" breakpoint.
          This applies to desktop views. */}
          <NavigationItems location={location} />
        </HeaderNavigation>
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
          <HeaderSideNavItems hasDivider>
            {/* Render navigation items for viewports smaller than the "Large" breakpoint.
              This applies to mobile and small tablet views. */}
            <NavigationItems location={location} />
          </HeaderSideNavItems>
          <SideNavMenu renderIcon={MagicWand} title="Getting started">
            <SideNavMenuItem href="#">Install</SideNavMenuItem>
            <SideNavMenuItem href="#">Guide</SideNavMenuItem>
            <SideNavMenuItem href="#">FAQ</SideNavMenuItem>
          </SideNavMenu>
          <SideNavLink renderIcon={LogoGithub} href="#">
            GitHub
          </SideNavLink>
        </SideNavItems>
      </SideNav>
    </>
  );
};
