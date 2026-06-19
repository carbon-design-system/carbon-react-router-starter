/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { test, expect, describe } from 'vitest';
import {
  routes,
  routesInHeader,
  routesInSideNav,
  isDirectChildPath,
} from '../routes/config';

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

describe('isDirectChildPath', () => {
  test('returns true for direct child paths', () => {
    expect(isDirectChildPath('/link-4', '/link-4/sub-link-1')).toBe(true);
    expect(isDirectChildPath('/dashboard', '/dashboard/123')).toBe(true);
    expect(isDirectChildPath('/api', '/api/users')).toBe(true);
    expect(isDirectChildPath('/a', '/a/b')).toBe(true);
  });

  test('returns false for nested child paths (grandchildren)', () => {
    expect(isDirectChildPath('/link-4', '/link-4/sub-link-1/nested')).toBe(
      false,
    );
    expect(isDirectChildPath('/dashboard', '/dashboard/123/details')).toBe(
      false,
    );
    expect(isDirectChildPath('/api', '/api/users/profile')).toBe(false);
    expect(isDirectChildPath('/a', '/a/b/c')).toBe(false);
  });

  test('returns false when paths are identical', () => {
    expect(isDirectChildPath('/dashboard', '/dashboard')).toBe(false);
    expect(isDirectChildPath('/link-4', '/link-4')).toBe(false);
    expect(isDirectChildPath('/', '/')).toBe(false);
  });

  test('returns false for non-matching paths', () => {
    expect(isDirectChildPath('/link-4', '/link-5')).toBe(false);
    expect(isDirectChildPath('/dashboard', '/profile')).toBe(false);
    expect(isDirectChildPath('/api', '/app')).toBe(false);
  });

  test('returns false for paths that start similarly but are not children', () => {
    expect(isDirectChildPath('/link', '/link-4')).toBe(false);
    expect(isDirectChildPath('/dash', '/dashboard')).toBe(false);
    expect(isDirectChildPath('/api', '/api-v2')).toBe(false);
  });

  test('handles edge cases with null, undefined, and empty strings', () => {
    expect(isDirectChildPath(null, '/path')).toBe(false);
    expect(isDirectChildPath('/path', null)).toBe(false);
    expect(isDirectChildPath(undefined, '/path')).toBe(false);
    expect(isDirectChildPath('/path', undefined)).toBe(false);
    expect(isDirectChildPath('', '/path')).toBe(false);
    expect(isDirectChildPath('/path', '')).toBe(false);
    expect(isDirectChildPath('', '')).toBe(false);
  });

  test('handles paths with special characters', () => {
    expect(isDirectChildPath('/user-profile', '/user-profile/settings')).toBe(
      true,
    );
    expect(isDirectChildPath('/api_v2', '/api_v2/endpoint')).toBe(true);
    expect(isDirectChildPath('/path.name', '/path.name/child')).toBe(true);
  });

  test('handles trailing slashes correctly', () => {
    // Parent with trailing slash should not match (different path structure)
    expect(isDirectChildPath('/link-4/', '/link-4/sub-link-1')).toBe(false);
    // Child with trailing slash contains '/' in remainder, so not a direct child
    expect(isDirectChildPath('/link-4', '/link-4/sub-link-1/')).toBe(false);
    // Without trailing slashes works correctly
    expect(isDirectChildPath('/link-4', '/link-4/sub-link-1')).toBe(true);
  });

  test('is case-sensitive', () => {
    expect(isDirectChildPath('/Link-4', '/link-4/sub-link-1')).toBe(false);
    expect(isDirectChildPath('/link-4', '/Link-4/sub-link-1')).toBe(false);
  });

  test('works with root path', () => {
    // Root path '/' + '/' = '//', so '/dashboard' doesn't start with '//'
    // This is expected behavior - root path needs special handling if needed
    expect(isDirectChildPath('/', '/dashboard')).toBe(false);

    // For actual use case, routes don't use '/' as parent in the config
    // But if they did, this would be the correct behavior
    expect(isDirectChildPath('/', '//dashboard')).toBe(true);
    expect(isDirectChildPath('/', '//dashboard/123')).toBe(false);
  });

  test('handles URL parameters correctly', () => {
    // Dynamic route parameters (common in React Router)
    expect(isDirectChildPath('/dashboard', '/dashboard/:id')).toBe(true);
    expect(isDirectChildPath('/users', '/users/:userId')).toBe(true);
    expect(isDirectChildPath('/api', '/api/:version')).toBe(true);

    // Multiple parameters
    expect(isDirectChildPath('/users/:userId', '/users/:userId/posts')).toBe(
      true,
    );
    expect(
      isDirectChildPath('/users/:userId/posts', '/users/:userId/posts/:postId'),
    ).toBe(true);

    // Should not match nested parameters
    expect(isDirectChildPath('/users', '/users/:userId/posts/:postId')).toBe(
      false,
    );
  });

  test('handles query strings and hash fragments', () => {
    // Query strings should be treated as part of the path
    expect(isDirectChildPath('/search', '/search/results?q=test')).toBe(true);
    expect(isDirectChildPath('/api', '/api/data?format=json')).toBe(true);

    // Hash fragments
    expect(isDirectChildPath('/docs', '/docs/intro#section')).toBe(true);

    // Combined
    expect(isDirectChildPath('/page', '/page/view?id=1#top')).toBe(true);

    // Should not match if there's a nested path before query/hash
    expect(isDirectChildPath('/api', '/api/v1/data?format=json')).toBe(false);
  });

  test('handles special URL characters', () => {
    // Encoded characters
    expect(isDirectChildPath('/search', '/search/hello%20world')).toBe(true);
    expect(isDirectChildPath('/files', '/files/document.pdf')).toBe(true);

    // Special characters that are valid in URLs
    expect(isDirectChildPath('/items', '/items/item-123')).toBe(true);
    expect(isDirectChildPath('/tags', '/tags/tag_name')).toBe(true);
    expect(isDirectChildPath('/docs', '/docs/v1.0.0')).toBe(true);
    expect(isDirectChildPath('/api', '/api/~user')).toBe(true);

    // Parentheses (sometimes used in routing)
    expect(isDirectChildPath('/routes', '/routes/(auth)')).toBe(true);

    // Plus sign
    expect(isDirectChildPath('/search', '/search/C++')).toBe(true);
  });

  test('handles wildcard and catch-all patterns', () => {
    // Asterisk (catch-all routes)
    expect(isDirectChildPath('/files', '/files/*')).toBe(true);
    expect(isDirectChildPath('/docs', '/docs/*')).toBe(true);

    // Should not match nested wildcards
    expect(isDirectChildPath('/files', '/files/subfolder/*')).toBe(false);
  });

  test('handles optional segments notation', () => {
    // Optional segments (React Router syntax)
    expect(isDirectChildPath('/users', '/users/:id?')).toBe(true);
    expect(isDirectChildPath('/posts', '/posts/:slug?')).toBe(true);

    // Splat parameters
    expect(isDirectChildPath('/files', '/files/*filepath')).toBe(true);
  });

  test('handles real-world routing scenarios', () => {
    // API versioning
    expect(isDirectChildPath('/api', '/api/v1')).toBe(true);
    expect(isDirectChildPath('/api', '/api/v1/users')).toBe(false);

    // Locale routing
    expect(isDirectChildPath('/en', '/en/dashboard')).toBe(true);
    expect(isDirectChildPath('/en', '/en/dashboard/settings')).toBe(false);

    // Admin routes
    expect(isDirectChildPath('/admin', '/admin/users')).toBe(true);
    expect(isDirectChildPath('/admin', '/admin/users/edit')).toBe(false);

    // Resource routes (RESTful)
    expect(isDirectChildPath('/posts', '/posts/new')).toBe(true);
    expect(isDirectChildPath('/posts', '/posts/:id')).toBe(true);
    expect(isDirectChildPath('/posts/:id', '/posts/:id/edit')).toBe(true);
    expect(isDirectChildPath('/posts/:id', '/posts/:id/comments')).toBe(true);
    expect(
      isDirectChildPath('/posts/:id', '/posts/:id/comments/:commentId'),
    ).toBe(false);
  });

  test('prevents ReDoS by avoiding regex', () => {
    // These patterns would be problematic with regex but are safe with string methods
    const maliciousPath = '/a'.repeat(100);
    const maliciousSubPath = maliciousPath + '/b';

    // Should complete quickly without hanging
    const startTime = Date.now();
    const result = isDirectChildPath(maliciousPath, maliciousSubPath);
    const endTime = Date.now();

    expect(result).toBe(true);
    expect(endTime - startTime).toBeLessThan(10); // Should be nearly instant
  });
});
