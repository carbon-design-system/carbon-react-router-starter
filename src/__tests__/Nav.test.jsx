/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n.client';
import { Nav } from '../components/nav/Nav';
import { NavHeaderItems } from '../components/nav/NavHeaderItems';
import { NavSideItems } from '../components/nav/NavSideItems';

function renderWithRouter(ui, path = '/') {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    </I18nextProvider>,
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

describe('Nav', () => {
  test('renders the header with the app name', () => {
    renderWithRouter(<Nav />);

    expect(screen.getByText('React starter')).toBeInTheDocument();
  });

  test('renders global action buttons', () => {
    renderWithRouter(<Nav />);

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'User profile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'App switcher' })).toBeInTheDocument();
  });

  test('side nav is collapsed by default', () => {
    renderWithRouter(<Nav />);

    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  test('clicking the menu button opens the side nav', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Nav />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
  });

  test('clicking the menu button twice closes the side nav again', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Nav />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('button', { name: 'Close menu' }));

    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  test('profile panel is hidden by default', () => {
    renderWithRouter(<Nav />);

    expect(screen.queryByText('Anne Profile')).not.toBeInTheDocument();
  });

  test('clicking user profile button opens the profile panel', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Nav />);

    await user.click(screen.getByRole('button', { name: 'User profile' }));

    expect(screen.getByText('Anne Profile')).toBeInTheDocument();
  });

  test('clicking user profile button again closes the profile panel', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Nav />);

    await user.click(screen.getByRole('button', { name: 'User profile' }));
    await user.click(screen.getByRole('button', { name: 'User profile' }));

    expect(screen.queryByText('Anne Profile')).not.toBeInTheDocument();
  });
});

// ─── NavHeaderItems ──────────────────────────────────────────────────────────

const flatRoutes = [
  { path: '/dashboard', carbon: { label: 'Dashboard', inHeader: true } },
  { path: '/reports', carbon: { label: 'Reports', inHeader: true } },
];

const subMenuRoutes = [
  {
    path: '/tools',
    carbon: {
      label: 'Tools',
      inHeader: true,
      subMenu: [
        { path: '/tools/alpha', carbon: { label: 'Alpha' } },
        { path: '/tools/beta', carbon: { label: 'Beta' } },
      ],
    },
  },
];

const subMenuItemRoutes = [{ path: '/tools/alpha', carbon: { label: 'Alpha', inHeader: true, inSubMenu: true } }];

describe('NavHeaderItems', () => {
  test('renders flat menu items', () => {
    renderWithRouter(<NavHeaderItems routesInHeader={flatRoutes} currentPath="/other" />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  test('marks the current path item as active', () => {
    renderWithRouter(<NavHeaderItems routesInHeader={flatRoutes} currentPath="/dashboard" />);

    const dashboardLink = screen.getByText('Dashboard').closest('a');

    // Carbon HeaderMenuItem sets aria-current="true" when isActive is true
    expect(dashboardLink).toHaveAttribute('aria-current', 'true');
  });

  test('marks item active when current path is a dynamic child', () => {
    renderWithRouter(<NavHeaderItems routesInHeader={flatRoutes} currentPath="/dashboard/123" />);

    const dashboardLink = screen.getByText('Dashboard').closest('a');

    expect(dashboardLink).toHaveAttribute('aria-current', 'true');
  });

  test('does not mark item active when paths differ', () => {
    renderWithRouter(<NavHeaderItems routesInHeader={flatRoutes} currentPath="/reports" />);

    const dashboardLink = screen.getByText('Dashboard').closest('a');

    expect(dashboardLink).not.toHaveAttribute('aria-current', 'page');
  });

  test('renders a subMenu group with its children', () => {
    renderWithRouter(<NavHeaderItems routesInHeader={subMenuRoutes} currentPath="/" />);

    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  test('does not render items marked as inSubMenu', () => {
    renderWithRouter(<NavHeaderItems routesInHeader={subMenuItemRoutes} currentPath="/" />);

    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });
});

// ─── NavSideItems ─────────────────────────────────────────────────────────────

const sideNavFlatRoutes = [
  { path: '/dashboard', carbon: { label: 'Dashboard', labelKey: 'routes.dashboard', inSideNav: true } },
];

const sideNavExternalRoutes = [
  { path: null, carbon: { label: 'GitHub', labelKey: 'nav.github', href: 'https://github.com', inSideNav: true } },
];

const sideNavSubMenuRoutes = [
  {
    path: '/tools',
    carbon: {
      label: 'Tools',
      labelKey: 'routes.tools',
      inSideNav: true,
      subMenu: [
        { path: '/tools/alpha', carbon: { label: 'Alpha', labelKey: 'routes.alpha' } },
        { path: '/tools/beta', carbon: { label: 'Beta', labelKey: 'routes.beta' } },
      ],
    },
  },
];

const sideNavSubMenuItemRoutes = [
  { path: '/tools/alpha', carbon: { label: 'Alpha', inSideNav: true, inSubMenu: true } },
];

describe('NavSideItems', () => {
  test('renders a flat side nav link with a router path', () => {
    renderWithRouter(<NavSideItems routesInSideNav={sideNavFlatRoutes} currentPath="/other" />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('marks a flat link active when path matches', () => {
    renderWithRouter(<NavSideItems routesInSideNav={sideNavFlatRoutes} currentPath="/dashboard" />);

    const link = screen.getByText('Dashboard').closest('a');

    expect(link).toHaveClass('cds--side-nav__link--current');
  });

  test('renders an external link using href when no path is provided', () => {
    const { container } = renderWithRouter(<NavSideItems routesInSideNav={sideNavExternalRoutes} currentPath="/" />);

    // Carbon SideNavLink spreads the href onto the anchor element
    expect(container.querySelector('a[href="https://github.com"]')).toBeInTheDocument();
    // The label is rendered as visible text in the nav item
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  test('renders a subMenu group with its children', () => {
    renderWithRouter(<NavSideItems routesInSideNav={sideNavSubMenuRoutes} currentPath="/" />);

    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  test('does not render items marked as inSubMenu', () => {
    renderWithRouter(<NavSideItems routesInSideNav={sideNavSubMenuItemRoutes} currentPath="/" />);

    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });
});
