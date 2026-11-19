/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getPost, getComments } from '../service/postHandlers.ts';
import { getExternalPost, getExternalComments } from '../service/externalHandlers.ts';
import type { JsonResponse, ParamsRequest, QueryRequest } from '../service/types.ts';

export type RouteHandler<P> = (req: ParamsRequest<P> & QueryRequest, res: JsonResponse) => Promise<void>;

/** The part of an Express app (or the MSW test router) that route registration needs. */
export interface RouteRegistrar {
  get<P>(path: string, handler: RouteHandler<P>): unknown;
}

/**
 * Registers all API routes on the given Express app instance.
 *
 * This function is reusable in both production and unit tests,
 * and allows swapping out route handlers for mocks if needed.
 * @param app - Express app instance OR msw router in case of unit testing
 * @param handlers - Route handlers (can be mocked for testing)
 * @param externalHandlers - External API mock handlers (can be mocked for testing)
 */
export const getRoutes = (
  app: RouteRegistrar,
  handlers = { getPost, getComments },
  externalHandlers = { getExternalPost, getExternalComments },
): void => {
  // Client-facing API routes (these call the external routes below)
  app.get('/api/post/:id', handlers.getPost);
  app.get('/api/comments', handlers.getComments);

  // Mock "external" API routes (simulate external services)
  app.get('/api/external/post/:id', externalHandlers.getExternalPost);
  app.get('/api/external/comments', externalHandlers.getExternalComments);
};
