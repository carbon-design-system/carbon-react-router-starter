/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { usePrefersDarkScheme } from '@carbon/react';
import {
  getLocalStorageValues,
  setLocalStorageValues,
} from '../utils/local-storage';
import { ThemeContextValue, ThemeSetting, CarbonTheme } from '../types/theme';

// Create the context with default values
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const prefersDark = usePrefersDarkScheme();
  const [ready, setReady] = useState(false);

  // Initialize state from local storage
  const storedValues = getLocalStorageValues();
  const [themeSetting, setThemeSettingState] = useState<ThemeSetting>(
    storedValues.themeSetting || 'system',
  );
  const [themeMenuCompliment, setThemeMenuComplimentState] = useState<boolean>(
    storedValues.headerInverse || false,
  );

  // Wrapper functions to update both state and local storage
  const setThemeSetting = useCallback((value: ThemeSetting) => {
    setThemeSettingState(value);
    setLocalStorageValues({ themeSetting: value });
  }, []);

  const setThemeMenuCompliment = useCallback((value: boolean) => {
    setThemeMenuComplimentState(value);
    setLocalStorageValues({ headerInverse: value });
  }, []);

  // Calculate the actual theme based on settings
  const calculateTheme = useCallback((): CarbonTheme => {
    if (themeSetting === 'light') {
      return 'g10';
    } else if (themeSetting === 'dark') {
      return 'g100';
    } else {
      // system setting - use browser preference
      return prefersDark ? 'g100' : 'g10';
    }
  }, [themeSetting, prefersDark]);

  // Calculate the menu theme based on settings and compliment option
  const calculateMenuTheme = useCallback(
    (mainTheme: CarbonTheme): CarbonTheme => {
      if (!themeMenuCompliment) {
        return mainTheme;
      }
      // If compliment is enabled, return the opposite theme
      return mainTheme === 'g10' ? 'g100' : 'g10';
    },
    [themeMenuCompliment],
  );

  // Calculate current theme based on settings
  const theme = calculateTheme();
  const themeMenu = calculateMenuTheme(theme);

  // Update the DOM when theme changes
  useEffect(() => {
    const root = document.documentElement;

    // Remove any existing theme data attribute
    root.removeAttribute('cs--theme');

    // If not using system theme, add the appropriate data attribute
    if (themeSetting !== 'system') {
      root.setAttribute('cs--theme', theme);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- will not cause this section to re-run
    setReady(true);
  }, [theme, themeSetting]);

  const value: ThemeContextValue = {
    themeSetting,
    setThemeSetting,
    themeMenuCompliment,
    setThemeMenuCompliment,
    theme,
    themeMenu,
    ready,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;

// Made with Bob
