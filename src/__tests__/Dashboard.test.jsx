/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n.client';
import Dashboard from '../pages/dashboard/Dashboard';
import DashboardURLParameters from '../pages/dashboard/DashboardURLParameters';
import DashboardNumberTiles from '../pages/dashboard/DashboardNumberTiles';
import DashboardVisualizations from '../pages/dashboard/DashboardVisualizations';

// DashboardURLParameters uses useParams which requires a matched route to populate params
function renderURLParameters(path, route = '/dashboard') {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={route} element={<DashboardURLParameters />} />
          <Route path={`${route}/:id`} element={<DashboardURLParameters />} />
        </Routes>
      </MemoryRouter>
    </I18nextProvider>,
  );
}

function renderWithI18n(ui) {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    </I18nextProvider>,
  );
}

describe('Dashboard', () => {
  test('renders the page title', async () => {
    renderWithI18n(<Dashboard />);

    // PageHeader renders the title as a heading
    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  });

  test('renders the URL parameters section', async () => {
    renderWithI18n(<Dashboard />);

    expect(await screen.findByText('URL parameters example')).toBeInTheDocument();
  });

  test('renders the number tiles section', async () => {
    renderWithI18n(<Dashboard />);

    const labels = await screen.findAllByText('Active users');

    expect(labels).toHaveLength(4);
  });

  test('renders the visualizations section', async () => {
    renderWithI18n(<Dashboard />);

    expect(await screen.findByText('Visualization')).toBeInTheDocument();
    expect(await screen.findByText('Cool table')).toBeInTheDocument();
  });
});

describe('DashboardURLParameters', () => {
  test('renders the section title and example link without URL params', async () => {
    renderURLParameters('/dashboard');

    expect(await screen.findByText('URL parameters example')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '/dashboard/1234?q=xyz&name=Anne' })).toBeInTheDocument();
  });

  test('does not show greeting or param details when no params are present', async () => {
    renderURLParameters('/dashboard');

    await screen.findByText('URL parameters example');

    expect(screen.queryByText(/Hello/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Path parameter detected/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Query parameter detected/)).not.toBeInTheDocument();
  });

  test('shows path parameter id when present', async () => {
    renderURLParameters('/dashboard/1234');

    expect(await screen.findByText('Path parameter detected (id):')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  test('shows query parameter q when present', async () => {
    renderURLParameters('/dashboard?q=xyz');

    expect(await screen.findByText('Query parameter detected (q):')).toBeInTheDocument();
    expect(screen.getByText('xyz')).toBeInTheDocument();
  });

  test('shows greeting and name query parameter when name is present', async () => {
    renderURLParameters('/dashboard?name=Anne');

    expect(await screen.findByText('Hello Anne! 👋')).toBeInTheDocument();
    expect(screen.getByText('Query parameter detected (name):')).toBeInTheDocument();
    // The dd value "Anne" is rendered as a definition term
    const definitions = screen.getAllByRole('definition');
    expect(definitions.some((dd) => dd.textContent === 'Anne')).toBe(true);
  });

  test('shows all params when path id and query params are combined', async () => {
    renderURLParameters('/dashboard/1234?q=xyz&name=Anne');

    expect(await screen.findByText('Hello Anne! 👋')).toBeInTheDocument();
    expect(screen.getByText('Path parameter detected (id):')).toBeInTheDocument();
    expect(screen.getByText('Query parameter detected (q):')).toBeInTheDocument();
    expect(screen.getByText('Query parameter detected (name):')).toBeInTheDocument();
  });
});

describe('DashboardNumberTiles', () => {
  test('renders four tiles each with an Active users label', async () => {
    renderWithI18n(<DashboardNumberTiles />);

    const labels = await screen.findAllByText('Active users');

    expect(labels).toHaveLength(4);
  });

  test('each tile displays a numeric value', async () => {
    renderWithI18n(<DashboardNumberTiles />);

    await screen.findAllByText('Active users');

    const values = screen.getAllByRole('definition');

    expect(values).toHaveLength(4);
    values.forEach((dd) => {
      expect(Number(dd.textContent)).toBeGreaterThanOrEqual(0);
      expect(Number(dd.textContent)).toBeLessThanOrEqual(1000);
    });
  });
});

describe('DashboardVisualizations', () => {
  test('renders the Visualization tile', () => {
    renderWithI18n(<DashboardVisualizations />);

    expect(screen.getByText('Visualization')).toBeInTheDocument();
  });

  test('renders the Cool table tile', () => {
    renderWithI18n(<DashboardVisualizations />);

    expect(screen.getByText('Cool table')).toBeInTheDocument();
  });
});
