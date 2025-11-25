/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { usePrefersDarkScheme } from '@carbon/react';
import PropTypes from 'prop-types';
import {
  getLocalStorageValues,
  setLocalStorageValues,
} from '../utils/local-storage';

// Create the context with default values
const ThemeContext = createContext({
  themeSetting: 'system', // system, light, or dark
  setThemeSetting: () => {},
  themeMenuCompliment: false, // true or false
  setThemeMenuCompliment: () => {},
  theme: 'g10', // g10 or g100
  themeMenu: 'g10', // g10 or g100
  ready: false, // indicates if values have been initialized
});

export const ThemeProvider = ({ children }) => {
  const prefersDark = usePrefersDarkScheme();

  // Initialize with defaults for SSR
  const [themeSetting, setThemeSettingState] = useState('system');
  const [themeMenuCompliment, setThemeMenuComplimentState] = useState(false);
  const [ready, setReady] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Wrapper functions to update both state and local storage
  const setThemeSetting = useCallback((value) => {
    setThemeSettingState(value);
    setLocalStorageValues({ themeSetting: value });
  }, []);

  const setThemeMenuCompliment = useCallback((value) => {
    setThemeMenuComplimentState(value);
    setLocalStorageValues({ headerInverse: value });
  }, []);

  // Calculate the actual theme based on settings
  const calculateTheme = useCallback(() => {
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
    (mainTheme) => {
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

  // Load stored values from localStorage on mount (client-side only)
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Setting initialized on SSR is intentional
      setInitialized(true);
      return;
    }

    const storedValues = getLocalStorageValues();

    // Update state with stored values
    if (
      storedValues.themeSetting &&
      storedValues.themeSetting !== themeSetting
    ) {
      setThemeSettingState(storedValues.themeSetting);
    }

    if (
      storedValues.headerInverse !== undefined &&
      storedValues.headerInverse !== themeMenuCompliment
    ) {
      setThemeMenuComplimentState(storedValues.headerInverse);
    }

    // Mark as initialized after loading stored values

    setInitialized(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- Only run once on mount

  // Set ready after theme values have been updated
  useEffect(() => {
    if (initialized) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Setting ready after theme state updates is intentional to prevent flash
      setReady(true);
    }
  }, [initialized, themeSetting, themeMenuCompliment]);

  // Update the DOM when theme changes
  useEffect(() => {
    if (!ready) return; // Don't update DOM until ready

    const root = document.documentElement;

    // Remove any existing theme data attribute
    root.removeAttribute('cs--theme');

    // If not using system theme, add the appropriate data attribute
    if (themeSetting !== 'system') {
      root.setAttribute('cs--theme', theme);
    }
  }, [theme, themeSetting, ready]);

  const value = {
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

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the theme context
// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
