/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line import/namespace
import { getMessage } from '../service/message.js';

export const routeHandlers = {
  getMessage,
};

/**
 * Registers all API routes on the given Express app instance.
 *
 * This function is reusable in both production and unit tests,
 * and allows swapping out route handlers for mocks if needed.
 * @param app - Express app instance OR msw router in case of unit testing
 * @param handlers - Route handlers (can be mocked for testing)
 */
export const getRoutes = (app, handlers = routeHandlers) => {
  app.get('/api/message', handlers.getMessage);
};
