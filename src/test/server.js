/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

/**
 * Mock Service Worker (MSW) server for testing
 *
 * In React Router Framework mode, API routes are handled by the framework.
 * This server provides mock responses for external API calls made during tests.
 */
const _setupServer = (...args) => {
  // Mock external API endpoints that the application might call
  const externalMocks = [
    // Mock external post API
    http.get('/api/external/post/:id', ({ params }) => {
      return HttpResponse.json({
        id: params.id,
        title: 'Test post title',
        body: 'Test post body content',
        userId: 1,
      });
    }),

    // Mock external comments API
    http.get('/api/external/comments', ({ request }) => {
      const url = new URL(request.url);
      const postId = url.searchParams.get('postId');
      return HttpResponse.json([
        {
          id: 1,
          postId: parseInt(postId),
          name: 'Test comment 1',
          email: 'test1@example.com',
          body: 'Test comment 1 body',
        },
        {
          id: 2,
          postId: parseInt(postId),
          name: 'Test comment 2',
          email: 'test2@example.com',
          body: 'Test comment 2 body',
        },
      ]);
    }),
  ];

  return setupServer(...externalMocks, ...args);
};

export const server = _setupServer();
