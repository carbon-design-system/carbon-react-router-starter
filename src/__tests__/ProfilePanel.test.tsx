/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { test, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithoutProviders } from '../test/test-utils';
import ProfilePanel from '../components/profilePanel/ProfilePanel';
import { server } from '../test/server';
import {
  setupBeforeAll,
  setupBeforeEach,
  setupAfterEach,
  setupAfterAll,
} from '../test/setup';
import * as themeUtils from '../utils/theme';
import * as cookieUtils from '../utils/cookies';

// Setup test environment
beforeAll(() => setupBeforeAll(server));
beforeEach(() => setupBeforeEach(server));
afterEach(() => setupAfterEach(server));
afterAll(() => setupAfterAll(server));

// Mock the theme utilities
const mockSetThemeSetting = vi.fn();
const mockSetHeaderInverse = vi.fn();

beforeEach(() => {
  // Reset mocks before each test
  mockSetThemeSetting.mockReset();
  mockSetHeaderInverse.mockReset();

  // Mock the theme utility functions
  vi.spyOn(themeUtils, 'setThemeSetting').mockImplementation(
    mockSetThemeSetting,
  );
  vi.spyOn(themeUtils, 'setHeaderInverse').mockImplementation(
    mockSetHeaderInverse,
  );

  // Mock cookie utilities to return default values
  vi.spyOn(cookieUtils, 'getThemeFromCookies').mockReturnValue({
    themeSetting: 'light',
    headerInverse: false,
  });

  // Mock getThemeSettings to return the same values
  vi.spyOn(themeUtils, 'getThemeSettings').mockReturnValue({
    themeSetting: 'light',
    headerInverse: false, // boolean value
  });
});

// Debug test to understand the DOM structure
test('debug DOM structure', () => {
  renderWithoutProviders(<ProfilePanel />);
});

test('renders profile panel with user information', () => {
  renderWithoutProviders(<ProfilePanel />);

  // Check if user information is displayed
  expect(screen.getByText('Anne Profile')).toBeInTheDocument();
  expect(screen.getByText('anne.profile@ibm.com')).toBeInTheDocument();

  // Check if theme settings are displayed
  expect(screen.getByText('Complement menu theme')).toBeInTheDocument();
});

test('changes theme when theme switcher is used', async () => {
  const user = userEvent.setup();
  renderWithoutProviders(<ProfilePanel />);

  // Find all buttons in the theme switcher area
  // This is more resilient than looking for specific text
  const buttons = screen.getAllByRole('tab');

  // Find the dark theme button - it should be one of the buttons
  // We can look for buttons near the theme switcher area
  const darkButton = Array.from(buttons).find((button) => {
    // Look for a button that might represent dark theme
    // This could be by text content, aria-label, or other attributes
    return (
      button.textContent?.toLowerCase().includes('dark') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('dark')
    );
  });

  // If we found a button that looks like the dark theme button, click it
  if (darkButton) {
    await user.click(darkButton);

    // Verify that setThemeSetting was called with 'dark'
    await waitFor(() => {
      expect(mockSetThemeSetting).toHaveBeenCalledWith('dark');
    });
  } else {
    // If we couldn't find a button that looks like the dark theme button,
    // log the available buttons to help with debugging
    console.log(
      'Available buttons:',
      buttons.map((b) => ({
        text: b.textContent,
        ariaLabel: b.getAttribute('aria-label'),
      })),
    );
    throw new Error('Could not find dark theme button');
  }
});

test('toggles menu complement when checkbox is clicked', async () => {
  const user = userEvent.setup();
  renderWithoutProviders(<ProfilePanel />);

  // Find the menu complement checkbox by its label
  const complementLabel = screen.getByText('Complement menu theme');

  // Find the closest checkbox to this label
  // This is more resilient than trying to navigate the DOM structure directly
  const checkboxes = screen.getAllByRole('checkbox');
  const complementCheckbox = checkboxes.find((checkbox) => {
    // Check if this checkbox is associated with the label
    const labelFor = complementLabel.getAttribute('for');
    if (labelFor && labelFor === checkbox.id) {
      return true;
    }

    // Check if the checkbox is contained within the label
    return (
      complementLabel.contains(checkbox) ||
      complementLabel.parentElement?.contains(checkbox)
    );
  });

  // If we found the checkbox, click it
  if (complementCheckbox) {
    await user.click(complementCheckbox);

    // Verify that setHeaderInverse was called
    // The checkbox starts unchecked (false), so clicking it should set it to true
    await waitFor(() => {
      expect(mockSetHeaderInverse).toHaveBeenCalledWith(true);
    });
  } else {
    // If we couldn't find the checkbox, try clicking the label itself
    // This often works because labels are associated with checkboxes
    await user.click(complementLabel);

    // Verify that setHeaderInverse was called
    await waitFor(() => {
      expect(mockSetHeaderInverse).toHaveBeenCalledWith(true);
    });
  }
});
