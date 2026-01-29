/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { test, expect, describe } from 'vitest';
import { routes, routesInHeader, routesInSideNav } from '../routes/config';

describe('routes configuration', () => {
  test('routes array contains expected structure', () => {
    // Check that routes array exists and is an array
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBeGreaterThan(0);

    // Check that the index route is defined correctly
    const indexRoute = routes.find((route) => route.index === true);
    expect(indexRoute).toBeDefined();
    expect(indexRoute.path).toBe('/');
    expect(indexRoute.element).toBeDefined();
    // Check for lazy component (has $$typeof and _payload properties)
    expect(indexRoute.element.$$typeof).toBeDefined();

    // Check that the NotFound route is defined correctly
    const notFoundRoute = routes.find((route) => route.path === '*');
    expect(notFoundRoute).toBeDefined();
    expect(notFoundRoute.element).toBeDefined();
    expect(notFoundRoute.element.$$typeof).toBeDefined();
    expect(notFoundRoute.status).toBe(404);

    // Check that a regular route is defined correctly
    const dashboardRoute = routes.find((route) => route.path === '/dashboard');
    expect(dashboardRoute).toBeDefined();
    expect(dashboardRoute.element).toBeDefined();
    expect(dashboardRoute.element.$$typeof).toBeDefined();
    expect(dashboardRoute.carbon).toBeDefined();
    expect(dashboardRoute.carbon.label).toBe('Dashboard');
    expect(dashboardRoute.carbon.inHeader).toBe(true);
  });

  test('routesInHeader contains only routes with inHeader flag', () => {
    expect(Array.isArray(routesInHeader)).toBe(true);

    // All routes in routesInHeader should have carbon.inHeader === true
    routesInHeader.forEach((route) => {
      expect(route.carbon).toBeDefined();
      expect(route.carbon.inHeader).toBe(true);
      expect(route.carbon.inSubMenu).toBeFalsy();
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
      expect(route.carbon.inSideNav).toBe(true);
      expect(route.carbon.inSubMenu).toBeFalsy();
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
      route.carbon.subMenu.forEach((subRoute) => {
        expect(subRoute.carbon).toBeDefined();
        expect(subRoute.carbon.inSubMenu).toBe(true);
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

  test('route components are lazy-loaded for code splitting', () => {
    // Get all routes with elements
    const routesWithElements = routes.filter((route) => route.element);

    expect(routesWithElements.length).toBeGreaterThan(0);

    routesWithElements.forEach((route) => {
      const element = route.element;

      // Verify it's a lazy component by checking React's internal structure
      // Lazy components have $$typeof symbol and _payload/_init properties
      expect(element).toBeDefined();
      expect(element.$$typeof).toBeDefined();
      expect(typeof element.$$typeof).toBe('symbol');

      // Verify the lazy component has the expected structure
      // _payload contains the import promise, _init is the initialization function
      expect(element._payload).toBeDefined();
      expect(element._init).toBeDefined();
      expect(typeof element._init).toBe('function');
    });
  });

  test('lazy components have correct React.lazy structure', () => {
    // Test that lazy components have the expected React.lazy structure
    const indexRoute = routes.find((route) => route.index === true);
    expect(indexRoute).toBeDefined();
    expect(indexRoute.element).toBeDefined();

    const lazyComponent = indexRoute.element;

    // Verify it has the React lazy component structure
    expect(lazyComponent._payload).toBeDefined();
    expect(lazyComponent._init).toBeDefined();
    expect(typeof lazyComponent._init).toBe('function');

    // Verify the $$typeof is the REACT_LAZY_TYPE symbol
    expect(lazyComponent.$$typeof).toBeDefined();
    expect(typeof lazyComponent.$$typeof).toBe('symbol');
    expect(String(lazyComponent.$$typeof)).toContain('react.lazy');
  });

  test('lazy components can be dynamically imported', async () => {
    // Test that lazy components point to valid importable modules
    // by directly importing the component files
    const componentImports = {
      '/': () => import('../pages/welcome/Welcome'),
      '/dashboard': () => import('../pages/dashboard/Dashboard'),
      '*': () => import('../pages/not-found/NotFound'),
    };

    for (const [path, importFn] of Object.entries(componentImports)) {
      const route = routes.find((r) => r.path === path);
      expect(route).toBeDefined();
      expect(route.element).toBeDefined();

      // Verify the route has a lazy component
      const lazyComponent = route.element;
      expect(lazyComponent.$$typeof).toBeDefined();
      expect(String(lazyComponent.$$typeof)).toContain('react.lazy');

      // Verify we can actually import the component module
      const module = await importFn();
      expect(module).toBeDefined();
      expect(module.default).toBeDefined();
      expect(typeof module.default).toBe('function');

      // Verify it's a valid React component
      const component = module.default;
      const componentName = component.displayName || component.name;
      expect(componentName).toBeDefined();
      expect(typeof componentName).toBe('string');
      expect(componentName.length).toBeGreaterThan(0);
    }
  });
});
