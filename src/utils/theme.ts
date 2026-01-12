/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getThemeFromCookies, setThemeInCookies } from './cookies';
import type { ThemeSetting } from '../types/theme';

/**
 * Theme settings return type
 */
interface ThemeSettings {
  themeSetting: ThemeSetting;
  headerInverse: boolean;
}

/**
 * Get current theme settings from cookies
 * @returns Object with themeSetting and headerInverse values
 */
export function getThemeSettings(): ThemeSettings {
  return getThemeFromCookies();
}

/**
 * Update theme setting and apply to HTML
 * @param themeSetting - Theme setting (system, light, dark)
 */
export function setThemeSetting(themeSetting: ThemeSetting): void {
  // Update cookie
  setThemeInCookies({ themeSetting });

  // Update HTML attribute immediately (no re-render needed)
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme-setting', themeSetting);
  }
}

/**
 * Update header inverse setting and apply to HTML
 * @param headerInverse - Header inverse setting
 */
export function setHeaderInverse(headerInverse: boolean): void {
  // Update cookie
  setThemeInCookies({ headerInverse });

  // Update HTML attribute immediately (no re-render needed)
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute(
      'data-header-inverse',
      String(headerInverse),
    );
  }
}

/**
 * Initialize theme on page load (sync HTML attributes with cookies)
 * Call this once when the app starts
 * Only updates attributes if they're not already set by SSR
 */
export function initializeTheme(): void {
  if (typeof document === 'undefined') return;

  const { themeSetting, headerInverse } = getThemeSettings();

  // Get current attributes set by SSR
  const currentThemeSetting =
    document.documentElement.getAttribute('data-theme-setting');
  const currentHeaderInverse = document.documentElement.getAttribute(
    'data-header-inverse',
  );

  // Only update if attributes are missing OR if cookies have changed since SSR
  // This prevents hydration mismatch while allowing cookie updates to take effect
  if (!currentThemeSetting) {
    document.documentElement.setAttribute('data-theme-setting', themeSetting);
  } else if (currentThemeSetting !== themeSetting) {
    // Cookie changed between SSR and hydration - log warning but don't update
    // to avoid hydration mismatch. The next navigation will use the new value.
    console.warn(
      'Theme cookie changed between SSR and hydration. ' +
        'Change will take effect on next navigation.',
    );
  }

  if (!currentHeaderInverse) {
    document.documentElement.setAttribute(
      'data-header-inverse',
      String(headerInverse),
    );
  } else if (currentHeaderInverse !== String(headerInverse)) {
    // Cookie changed between SSR and hydration - log warning but don't update
    console.warn(
      'Header inverse cookie changed between SSR and hydration. ' +
        'Change will take effect on next navigation.',
    );
  }
}
