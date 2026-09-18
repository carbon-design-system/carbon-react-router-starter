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
import Placeholder from '../pages/placeholder/Placeholder';

function renderPlaceholder(route = '/link-1') {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[route]}>
        <Placeholder />
      </MemoryRouter>
    </I18nextProvider>,
  );
}

describe('Placeholder', () => {
  test('renders the page title', async () => {
    renderPlaceholder();

    expect(await screen.findByText('This page is not ready yet')).toBeInTheDocument();
  });

  test('renders the under-construction description', async () => {
    renderPlaceholder();

    expect(await screen.findByText('Generally not a good idea to have pages under construction.')).toBeInTheDocument();
  });

  test('renders the navigation description', async () => {
    renderPlaceholder();

    expect(await screen.findByText('This page is here to help demonstrate the global navigation.')).toBeInTheDocument();
  });

  test('renders the current route pathname in the route info text', async () => {
    renderPlaceholder('/link-1');

    expect(await screen.findByText(/You are at the location served from route '\/link-1'/)).toBeInTheDocument();
  });

  test('renders the maintainer attribution', async () => {
    renderPlaceholder();

    expect(await screen.findByText('Maintained by fed-at-ibm, a chapter of the OIC.')).toBeInTheDocument();
  });
});
