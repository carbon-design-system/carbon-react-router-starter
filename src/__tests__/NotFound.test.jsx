/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n.client';
import NotFound from '../pages/not-found/NotFound';

function renderNotFound(route = '/unknown-page') {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[route]}>
        <NotFound />
      </MemoryRouter>
    </I18nextProvider>,
  );
}

describe('NotFound', () => {
  test('renders the page title', async () => {
    renderNotFound();

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
  });

  test('renders the description', async () => {
    renderNotFound();

    expect(await screen.findByText('This is not the page you were looking for.')).toBeInTheDocument();
  });

  test('renders the unrecognized route pathname', async () => {
    renderNotFound('/unknown-page');

    expect(await screen.findByText(/The route '\/unknown-page' is not recognized\./)).toBeInTheDocument();
  });

  test('renders the maintainer attribution', async () => {
    renderNotFound();

    expect(await screen.findByText('Maintained by fed-at-ibm, a chapter of the OIC.')).toBeInTheDocument();
  });
});
