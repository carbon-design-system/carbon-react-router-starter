/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { test, expect, describe, vi } from 'vitest';
import { findMatchingRoute, getStatusCodeForPath } from '../routes/utils';
import * as configModule from '../routes/config';

// Mock the routes from config.js
vi.mock('../routes/config', () => {
  return {
    routes: [
      {
        path: '/',
        index: true,
        element: vi.fn(),
      },
      {
        path: '/dashboard',
        element: vi.fn(),
        carbon: {
          label: 'Dashboard',
          inHeader: true,
        },
      },
      {
        path: '/nested/*',
        element: vi.fn(),
      },
      {
        path: '*',
        element: vi.fn(),
        status: 404,
      },
    ],
  };
});

// Routes without a wildcard entry, used to test the null fallback
const routesWithoutWildcard = [
  { path: '/', element: vi.fn() },
  { path: '/dashboard', element: vi.fn() },
];

describe('routes utils', () => {
  describe('findMatchingRoute', () => {
    test('finds exact match for root path', () => {
      const route = findMatchingRoute('/');
      expect(route).toBeDefined();
      expect(route.path).toBe('/');
      expect(route.index).toBe(true);
    });

    test('finds exact match for dashboard path', () => {
      const route = findMatchingRoute('/dashboard');
      expect(route).toBeDefined();
      expect(route.path).toBe('/dashboard');
      expect(route.carbon.label).toBe('Dashboard');
    });

    test('finds nested wildcard match', () => {
      const route = findMatchingRoute('/nested/something');
      expect(route).toBeDefined();
      expect(route.path).toBe('/nested/*');
    });

    test('returns wildcard route for non-existent path', () => {
      const route = findMatchingRoute('/non-existent');
      expect(route).toBeDefined();
      expect(route.path).toBe('*');
      expect(route.status).toBe(404);
    });

    test('handles paths with or without leading slash', () => {
      const routeWithSlash = findMatchingRoute('/dashboard');
      const routeWithoutSlash = findMatchingRoute('dashboard');

      expect(routeWithSlash).toEqual(routeWithoutSlash);
      expect(routeWithSlash.path).toBe('/dashboard');
    });

    test('skips routes without a path property', () => {
      // A route without path should be skipped; falls through to the wildcard
      vi.spyOn(configModule, 'routes', 'get').mockReturnValue([
        { element: vi.fn() }, // no path — should be skipped
        { path: '*', element: vi.fn(), status: 404 },
      ]);

      const route = findMatchingRoute('/anything');
      expect(route.path).toBe('*');

      vi.restoreAllMocks();
    });

    test('returns null when no wildcard route exists and nothing matches', () => {
      vi.spyOn(configModule, 'routes', 'get').mockReturnValue(routesWithoutWildcard);

      const route = findMatchingRoute('/no-match');
      expect(route).toBeNull();

      vi.restoreAllMocks();
    });
  });

  describe('getStatusCodeForPath', () => {
    test('returns 200 for existing routes', () => {
      expect(getStatusCodeForPath('/')).toBe(200);
      expect(getStatusCodeForPath('/dashboard')).toBe(200);
    });

    test('returns 404 for non-existent routes', () => {
      expect(getStatusCodeForPath('/non-existent')).toBe(404);
    });

    test('handles undefined status gracefully', () => {
      // Temporarily modify the wildcard route to remove status
      const originalRoutes = [...configModule.routes];
      const modifiedRoutes = [...originalRoutes];
      const wildcardIndex = modifiedRoutes.findIndex((route) => route.path === '*');

      if (wildcardIndex !== -1) {
        const wildcardRoute = { ...modifiedRoutes[wildcardIndex] };
        delete wildcardRoute.status;
        modifiedRoutes[wildcardIndex] = wildcardRoute;

        // Replace routes with our modified version
        vi.spyOn(configModule, 'routes', 'get').mockReturnValue(modifiedRoutes);

        // Should return default 200 when status is undefined
        expect(getStatusCodeForPath('/non-existent')).toBe(200);

        // Restore original routes
        vi.spyOn(configModule, 'routes', 'get').mockReturnValue(originalRoutes);
      }
    });
  });
});
