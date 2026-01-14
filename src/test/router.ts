/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { http, HttpResponse, HttpHandler } from 'msw';
import { Networking } from './networking';

interface MockRequest {
  params: Record<string, any>;
  query: Record<string, any>;
}

interface MockResponse {
  json: (data: any) => ReturnType<typeof HttpResponse.json>;
}

type HandlerFunction = (req: MockRequest, res: MockResponse) => any;

export interface Router {
  get: (path: string, noCache: boolean, ...args: HandlerFunction[]) => void;
}

export const getRouter = (
  mocks: HttpHandler[],
  networking: Networking,
): Router => {
  const apiRoute = (
    verb: 'get' | 'post' | 'put' | 'delete',
    path: string,
    handler: HandlerFunction,
  ): void => {
    const mock = http[verb](path, async () => {
      const req: MockRequest = {
        params: {},
        query: {},
      };

      const res: MockResponse = {
        json: (data: any) => {
          networking.removeRequest(path);
          return HttpResponse.json(data);
        },
      };

      networking.addRequests(path);
      return handler(req, res);
    });

    mocks.push(mock);
  };

  return {
    get: (path: string, _noCache: boolean, ...args: HandlerFunction[]) =>
      apiRoute('get', path, args[args.length - 1]),
    // TODO: add other verbs
  };
};
