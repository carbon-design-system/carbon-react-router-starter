/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { http, HttpResponse, type HttpHandler } from 'msw';
import { setupServer } from 'msw/node';
import { getNetworking } from './networking';
import { getRouter } from './router';
import { getRoutes } from '../routes/routes';
import { baseUrl } from '../config/server-config';

const _setupServer = (...handlers: HttpHandler[]) => {
  const mocks: HttpHandler[] = [];
  const networking = getNetworking();

  // Set up internal API routes (including external mock routes)
  getRoutes(getRouter(mocks, networking));

  // Mock the "external" API that postHandlers calls at the server's base URL
  const externalMocks = [
    http.get(`${baseUrl}/api/external/post/:id`, ({ params }) => {
      return HttpResponse.json({
        id: Number(params['id']),
        title: 'Test post title',
        body: 'Test post body content',
        userId: 1,
      });
    }),
    http.get(`${baseUrl}/api/external/comments`, ({ request }) => {
      const url = new URL(request.url);
      const postId = url.searchParams.get('postId');
      return HttpResponse.json([
        {
          id: 1,
          postId: Number(postId),
          name: 'Test comment 1',
          email: 'test1@example.com',
          body: 'Test comment 1 body',
        },
        {
          id: 2,
          postId: Number(postId),
          name: 'Test comment 2',
          email: 'test2@example.com',
          body: 'Test comment 2 body',
        },
      ]);
    }),
  ];

  return Object.assign(setupServer(...mocks, ...externalMocks, ...handlers), { networking });
};

export const server = _setupServer();

export type TestServer = typeof server;
