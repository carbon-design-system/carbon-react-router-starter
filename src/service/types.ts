/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Request } from 'express';

/**
 * Handlers are typed against the parts of Express they use, so they stay
 * registrable on an Express app and callable with plain objects in tests.
 */
export type ParamsRequest<P> = Pick<Request<P>, 'params'>;
export type QueryRequest = Pick<Request, 'query'>;
/** Satisfied by Express's Response; declared explicitly because Pick would fix its `this` type to Response */
export interface JsonResponse {
  status(code: number): JsonResponse;
  json(body: unknown): void;
}
