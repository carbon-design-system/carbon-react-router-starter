/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Third-party imports
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Router } from './routes';

// App level imports
import { initializeTheme } from './utils/theme';

// Initialize theme on client load
initializeTheme();

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
);

// Remove visibility hidden after hydration to prevent FOUC
document.body.classList.add('ready');
