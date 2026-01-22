/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Third-party imports
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

// App level imports
import { AppWithCssLoader } from './components/AppWithCssLoader';
import { initializeTheme } from './utils/theme';
import { initializePageCss } from './utils/css-loader';

// Initialize theme on client load
initializeTheme();

// Initialize page CSS tracking
initializePageCss();

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <BrowserRouter>
      <AppWithCssLoader />
    </BrowserRouter>
  </StrictMode>,
);

// Remove visibility hidden after hydration to prevent FOUC
document.body.classList.add('ready');
