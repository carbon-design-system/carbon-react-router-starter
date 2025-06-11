/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable */
import { setupServer } from 'msw/node';
import { getNetworking } from './networking';
import { getRouter } from './router';
import { getRoutes } from '../routes/routes';

const _setupServer = (...args) => {
  const mocks = [];
  const networking = getNetworking();

  getRoutes(getRouter(mocks, networking));

  const server = setupServer(...mocks, ...args);
  server.networking = networking;
  return server;
};

export const server = _setupServer();
