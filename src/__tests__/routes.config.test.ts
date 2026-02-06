/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { test, expect, describe } from 'vitest';
import { routes, routesInHeader, routesInSideNav } from '../routes/config';
import Dashboard from '../pages/dashboard/Dashboard';
import NotFound from '../pages/not-found/NotFound';
import Welcome from '../pages/welcome/Welcome';

describe('routes configuration', () => {
  test('routes array contains expected structure', () => {
    // Check that routes array exists and is an array
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThan(0);

    // Check that the index route is defined correctly
    const indexRoute = routes.find((route) => route.index === true);
    expect(indexRoute).toBeDefined();
    expect(indexRoute?.path).toBe('/');
    expect(indexRoute?.element).toBe(Welcome);

    // Check that the NotFound route is defined correctly
    const notFoundRoute = routes.find((route) => route.path === '*');
    expect(notFoundRoute).toBeDefined();
    expect(notFoundRoute?.element).toBe(NotFound);
    expect(notFoundRoute?.status).toBe(404);

    // Check that a regular route is defined correctly
    const dashboardRoute = routes.find((route) => route.path === '/dashboard');
    expect(dashboardRoute).toBeDefined();
    expect(dashboardRoute?.element).toBe(Dashboard);
    expect(dashboardRoute?.carbon).toBeDefined();
    expect(dashboardRoute?.carbon?.label).toBe('Dashboard');
    expect(dashboardRoute?.carbon?.inHeader).toBe(true);
  });

  test('routesInHeader contains only routes with inHeader flag', () => {
    expect(Array.isArray(routesInHeader)).toBe(true);

    // All routes in routesInHeader should have carbon.inHeader === true
    routesInHeader.forEach((route) => {
      expect(route.carbon).toBeDefined();
      expect(route.carbon?.inHeader).toBe(true);
      expect(route.carbon?.inSubMenu).toBeFalsy();
    });

    // Check that all routes with inHeader flag are included
    const headerRoutesCount = routes.filter(
      (route) =>
        route.carbon && route.carbon.inHeader && !route.carbon.inSubMenu,
    ).length;
    expect(routesInHeader.length).toBe(headerRoutesCount);
  });

  test('routesInSideNav contains only routes with inSideNav flag', () => {
    expect(Array.isArray(routesInSideNav)).toBe(true);

    // All routes in routesInSideNav should have carbon.inSideNav === true
    routesInSideNav.forEach((route) => {
      expect(route.carbon).toBeDefined();
      expect(route.carbon?.inSideNav).toBe(true);
      expect(route.carbon?.inSubMenu).toBeFalsy();
    });

    // Check that all routes with inSideNav flag are included
    const sideNavRoutesCount = routes.filter(
      (route) =>
        route.carbon && route.carbon.inSideNav && !route.carbon.inSubMenu,
    ).length;
    expect(routesInSideNav.length).toBe(sideNavRoutesCount);
  });

  test('routes with subMenu have their children marked as inSubMenu', () => {
    const routesWithSubMenu = routes.filter(
      (route) =>
        route.carbon && route.carbon.subMenu && route.carbon.subMenu.length > 0,
    );

    routesWithSubMenu.forEach((route) => {
      route.carbon?.subMenu?.forEach((subRoute) => {
        expect(subRoute.carbon).toBeDefined();
        expect(subRoute.carbon?.inSubMenu).toBe(true);
      });
    });
  });

  test('routes support all required properties for React Router', () => {
    routes.forEach((route) => {
      // Every route should have either a path or a carbon.virtualPath
      expect(
        route.path || (route.carbon && route.carbon.virtualPath),
      ).toBeDefined();

      // Routes with path should have an element or be a parent route
      if (route.path && !route.carbon?.subMenu) {
        expect(route.element).toBeDefined();
      }

      // Check that index routes are properly configured
      if (route.index) {
        expect(route.path).toBeDefined();
      }

      // Check that status is a number if defined
      if (route.status !== undefined) {
        expect(typeof route.status).toBe('number');
      }
    });
  });
});
