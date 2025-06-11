/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { test, expect } from 'vitest';
// eslint-disable-next-line import/namespace
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../test/test-utils';
import Welcome from '../pages/welcome/Welcome';
import { server } from '../test/server';
import {
  setupBeforeAll,
  setupBeforeEach,
  setupAfterEach,
  setupAfterAll,
} from '../test/setup';

// Setup test environment
beforeAll(() => setupBeforeAll(server));
beforeEach(() => setupBeforeEach(server));
afterEach(() => setupAfterEach(server));
afterAll(() => setupAfterAll(server));

test('renders received message', async () => {
  render(<Welcome />);

  // Wait for the expected text to appear
  expect(
    await screen.findByText(/Welcome to the Carbon React starter template/i),
  ).toBeInTheDocument();
});
