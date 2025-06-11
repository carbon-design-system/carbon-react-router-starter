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

// App level imports
import { PageWrapper } from './components/wrapper/PageWrapper.jsx';

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <BrowserRouter>
      <PageWrapper />
    </BrowserRouter>
  </StrictMode>,
);
