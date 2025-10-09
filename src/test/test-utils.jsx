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
import { ThemeProvider } from '../context/ThemeContext';

export function render(ui, { route = '/', ...renderOptions } = {}) {
  // Push the route we want to test
  window.history.pushState({}, 'Test page', route);

  function Wrapper() {
    return (
      <StrictMode>
        <ThemeProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </StrictMode>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
