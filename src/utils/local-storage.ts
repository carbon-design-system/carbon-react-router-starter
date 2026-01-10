/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LocalStorageValues, ThemeSetting } from '../types/theme';

const localStorageKeys = {
  themeSetting: 'app-theme-setting',
  headerInverse: 'app-header-inverse',
} as const;

type LocalStorageKey = keyof typeof localStorageKeys;

export const getLocalStorageValues = (): LocalStorageValues => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return {
      themeSetting: 'system',
      headerInverse: false,
    };
  }

  const themeSetting =
    (window.localStorage.getItem(
      localStorageKeys.themeSetting,
    ) as ThemeSetting) || 'system';
  const headerInverse =
    window.localStorage.getItem(localStorageKeys.headerInverse) === 'true' ||
    false;

  return {
    themeSetting,
    headerInverse,
  };
};

export const setLocalStorageValues = (
  values?: Partial<LocalStorageValues>,
): void => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return;
  }

  if (values) {
    const keys = Object.keys(localStorageKeys) as LocalStorageKey[];

    keys.forEach((key) => {
      const value = values[key];
      // save boolean as string
      const processedValue =
        typeof value !== 'boolean' ? value : value ? 'true' : 'false';

      if (processedValue) {
        window.localStorage.setItem(localStorageKeys[key], processedValue);
      }
    });
  }
};

// Made with Bob
