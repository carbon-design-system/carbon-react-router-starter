/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { http, HttpResponse, type HttpHandler } from 'msw';
import type { RouteHandler, RouteRegistrar } from '../routes/routes.ts';
import type { JsonResponse } from '../service/types.ts';
import type { Networking } from './networking';

/**
 * Registers the app's API routes (see routes/routes.ts) as MSW handlers, so tests
 * run the real route handlers with a minimal Express-like request and response.
 */
export const getRouter = (mocks: HttpHandler[], networking: Networking): RouteRegistrar => ({
  get: <P>(path: string, handler: RouteHandler<P>) => {
    mocks.push(
      http.get(path, async ({ params, request }) => {
        networking.addRequests(path);

        let status = 200;
        let body: unknown;
        const res: JsonResponse = {
          status(code) {
            status = code;
            return this;
          },
          json(data) {
            body = data;
            return this;
          },
        };
        const query = Object.fromEntries(new URL(request.url).searchParams);

        // MSW matched `path`, so its params are this route's params
        await handler({ params: params as P, query }, res);

        networking.removeRequest(path);
        return new HttpResponse(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
      }),
    );
  },
});
