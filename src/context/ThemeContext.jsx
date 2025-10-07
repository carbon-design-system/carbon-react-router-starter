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
  const [ready, setReady] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);

  // Initialize state from local storage
  const storedValues = getLocalStorageValues();
  const [themeSetting, setThemeSettingState] = useState(
    storedValues.themeSetting || 'system',
  );
  const [themeMenuCompliment, setThemeMenuComplimentState] = useState(
    storedValues.headerInverse || false,
  );

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

  const [theme, setTheme] = useState(() => calculateTheme());
  const [themeMenu, setThemeMenu] = useState(() => {
    const initialTheme = calculateTheme();
    return calculateMenuTheme(initialTheme);
  });

  // Update themes when settings change
  useEffect(() => {
    const newTheme = calculateTheme();
    setReady(false);
    setTheme(newTheme);
    setThemeMenu(calculateMenuTheme(newTheme));
    setUpdateReady(true);

    // Update the document element with the appropriate theme data attribute
    const root = document.documentElement;

    // Remove any existing theme data attribute
    root.removeAttribute('cs--theme');

    // If not using system theme, add the appropriate data attribute
    if (themeSetting !== 'system') {
      root.setAttribute('cs--theme', newTheme);
    }
  }, [
    themeSetting,
    themeMenuCompliment,
    prefersDark,
    calculateTheme,
    calculateMenuTheme,
  ]);

  useEffect(() => {
    if (updateReady) {
      setReady(true);
      setUpdateReady(false);
    }
  }, [updateReady]);

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
