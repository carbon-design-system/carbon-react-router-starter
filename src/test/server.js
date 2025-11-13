/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { setupServer } from 'msw/node';
import { http } from 'msw';
import { getNetworking } from './networking';
import { getRouter } from './router';
import { getRoutes } from '../routes/routes';

const _setupServer = (...args) => {
  const mocks = [];
  const networking = getNetworking();

  // Set up internal API routes
  getRoutes(getRouter(mocks, networking));

  // Mock external API calls to jsonplaceholder
  const externalMocks = [
    http.get('https://jsonplaceholder.typicode.com/posts/:id', ({ params }) => {
      return Response.json({
        id: params.id,
        title: 'Test Post Title',
        body: 'Test post body content',
        userId: 1,
      });
    }),
    http.get('https://jsonplaceholder.typicode.com/comments', ({ request }) => {
      const url = new URL(request.url);
      const postId = url.searchParams.get('postId');
      return Response.json([
        {
          id: 1,
          postId: parseInt(postId),
          name: 'Test Comment 1',
          email: 'test1@example.com',
          body: 'Test comment 1 body',
        },
        {
          id: 2,
          postId: parseInt(postId),
          name: 'Test Comment 2',
          email: 'test2@example.com',
          body: 'Test comment 2 body',
        },
      ]);
    }),
  ];

  const server = setupServer(...mocks, ...externalMocks, ...args);
  server.networking = networking;
  return server;
};

export const server = _setupServer();
