/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { StrictMode } from 'react';
import { Router } from '../routes';

/**
 * Renders a component with all providers (Router, etc.)
 * Use this for page components or components that need routing
 */
export function renderWithAllProviders(
  ui,
  { route = '/', ...renderOptions } = {},
) {
  // Push the route we want to test
  window.history.pushState({}, 'Test page', route);

  function Wrapper() {
    return (
      <StrictMode>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </StrictMode>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Renders a component without any providers
 * Use this for pure components that don't depend on any context
 */
export function renderWithoutProviders(ui, renderOptions = {}) {
  function Wrapper({ children }) {
    return <StrictMode>{children}</StrictMode>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
