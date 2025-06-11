/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Mocking methods which are not implemented in JSDOM
// If some code uses a method which JSDOM (the DOM implementation used by Jest) hasn't implemented yet,
// testing it is not easily possible. This is e.g. the case with window.matchMedia().
// Jest returns TypeError: window.matchMedia is not a function and doesn't properly execute the test.
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom

// In this case, mocking matchMedia in the test file should solve the issue:
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Deprecated
    removeListener: () => {}, // Deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

export function setupBeforeAll(server) {
  console.log('[Test Setup: BeforeAll] Starting server');
  server.listen();
}

export function setupBeforeEach(server) {
  console.log(`[Test Setup: BeforeEach] server?: ${!!server}`);
  // TODO:
}

export async function setupAfterEach(server) {
  console.log('[Test Setup: AfterEach] Cleaning up after test');

  // FIXME: the inflight requests don't settle at this point, need to investigate why and fix
  // await expect(server.networking.getRunningRequestCount()).toBe(0);
  server.networking.clearRunningRequests();
  server.resetHandlers();
}

export function setupAfterAll(server) {
  console.log('[Test Setup: AfterAll] Closing server');
  server.close();
}
