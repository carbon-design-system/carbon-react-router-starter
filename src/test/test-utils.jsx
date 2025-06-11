/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line import/namespace
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { StrictMode } from 'react';
import { PageWrapper } from '../components/wrapper/PageWrapper';

export function render(ui, { route = '/', ...renderOptions } = {}) {
  // Push the route we want to test
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return (
      <StrictMode>
        <BrowserRouter>
          <PageWrapper>{children}</PageWrapper>
        </BrowserRouter>
      </StrictMode>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
