/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { http, HttpResponse, HttpHandler } from 'msw';
import { setupServer, SetupServer } from 'msw/node';
import { getNetworking, Networking } from './networking';
import { getRouter } from './router';
import { getRoutes } from '../routes/routes';
import { baseUrl } from '../config/server-config';

export interface TestServer extends SetupServer {
  networking: Networking;
}

const _setupServer = (...args: HttpHandler[]): TestServer => {
  const mocks: HttpHandler[] = [];
  const networking = getNetworking();

  // Set up internal API routes (including external mock routes)
  getRoutes(getRouter(mocks, networking));

  // Mock external API calls from postHandlers to our local external endpoints
  // These intercept the fetch calls made by postHandlers.js
  const externalMocks: HttpHandler[] = [
    http.get(`${baseUrl}/api/external/post/:id`, ({ params }) => {
      return HttpResponse.json({
        id: params.id,
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
          postId: parseInt(postId || '0', 10),
          name: 'Test comment 1',
          email: 'test1@example.com',
          body: 'Test comment 1 body',
        },
        {
          id: 2,
          postId: parseInt(postId || '0', 10),
          name: 'Test comment 2',
          email: 'test2@example.com',
          body: 'Test comment 2 body',
        },
      ]);
    }),
  ];

  const server = setupServer(...mocks, ...externalMocks, ...args);

  // Extend the server object with networking property
  const testServer: TestServer = Object.assign(server, {
    networking,
  });

  return testServer;
};

export const server = _setupServer();
