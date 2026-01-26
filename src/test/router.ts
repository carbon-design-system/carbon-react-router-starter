/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { http, HttpResponse, HttpHandler } from 'msw';
import type { Request, Response, RequestHandler } from 'express';
import { Networking } from './networking';
import { baseUrl } from '../config/server-config';
import type { RouteRegistrar } from '../routes/routes';

interface MockRequest {
  params: Record<string, string>;
  query: Record<string, string>;
}

interface MockResponse {
  status: (code: number) => MockResponse;
  json: (data: unknown) => ReturnType<typeof HttpResponse.json>;
}

type HandlerFunction = (req: MockRequest, res: MockResponse) => unknown;

export interface Router {
  get: (path: string, handler: HandlerFunction) => void;
}

/**
 * Adapts an Express RequestHandler to work with the mock router's handler signature.
 * This allows Express handlers to be used in tests without type assertions.
 */
const adaptExpressHandler = (
  expressHandler: RequestHandler,
): HandlerFunction => {
  return (req: MockRequest, res: MockResponse) => {
    // Create Express-compatible request object
    const mockExpressReq = {
      params: req.params,
      query: req.query,
    } as Request;

    // Create Express-compatible response object
    let statusCode = 200;
    const mockExpressRes = {
      status: (code: number) => {
        statusCode = code;
        return mockExpressRes;
      },
      json: (data: unknown) => {
        return res.status(statusCode).json(data);
      },
    } as unknown as Response;

    return expressHandler(mockExpressReq, mockExpressRes, () => {}) as unknown;
  };
};

export const getRouter = (
  mocks: HttpHandler[],
  networking: Networking,
): RouteRegistrar => {
  const apiRoute = (
    verb: 'get' | 'post' | 'put' | 'delete',
    path: string,
    handler: RequestHandler,
  ): void => {
    // Adapt Express handler to work with our mock router
    const adaptedHandler: HandlerFunction = adaptExpressHandler(handler);

    // Convert relative path to absolute URL for MSW
    const absolutePath = path.startsWith('http') ? path : `${baseUrl}${path}`;
    const mock = http[verb](absolutePath, async ({ request, params }) => {
      // Extract query parameters from URL
      const url = new URL(request.url);
      const query: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        query[key] = value;
      });

      const req: MockRequest = {
        params: params as Record<string, string>,
        query,
      };

      let statusCode = 200;

      const res: MockResponse = {
        status: (code: number) => {
          statusCode = code;
          return res;
        },
        json: (data: unknown) => {
          networking.removeRequest(path);
          return HttpResponse.json(data as Record<string, unknown>, {
            status: statusCode,
          });
        },
      };

      networking.addRequests(path);
      const result = adaptedHandler(req, res);
      // Ensure we return a proper MSW response
      return result as ReturnType<typeof HttpResponse.json>;
    });

    mocks.push(mock);
  };

  return {
    get: (path: string, handler: RequestHandler) =>
      apiRoute('get', path, handler),
    // TODO: add other verbs
  };
};
