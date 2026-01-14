/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type ThemeSetting = 'system' | 'light' | 'dark';
export type CarbonTheme = 'g10' | 'g100';

export interface ThemeContextValue {
  themeSetting: ThemeSetting;
  setThemeSetting: (value: ThemeSetting) => void;
  themeMenuCompliment: boolean;
  setThemeMenuCompliment: (value: boolean) => void;
  theme: CarbonTheme;
  themeMenu: CarbonTheme;
  ready: boolean;
}

export interface LocalStorageValues {
  themeSetting: ThemeSetting;
  headerInverse: boolean;
}
