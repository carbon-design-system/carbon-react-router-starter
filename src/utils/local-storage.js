const localStorageKeys = {
  themeSetting: 'app-theme-setting',
  headerInverse: 'app-header-inverse',
};

/**
 * Check if we're running in a browser environment (not SSR)
 */
const isBrowser = typeof window !== 'undefined';

export const getLocalStorageValues = () => {
  // Return defaults during SSR
  if (!isBrowser) {
    return {
      themeSetting: 'system',
      headerInverse: false,
    };
  }

  const themeSetting =
    window.localStorage.getItem(localStorageKeys.themeSetting) || 'system';
  const headerInverse =
    window.localStorage.getItem(localStorageKeys.headerInverse) === 'true' ||
    false;

  return {
    themeSetting,
    headerInverse,
  };
};

export const setLocalStorageValues = (values) => {
  // Skip during SSR
  if (!isBrowser) {
    return;
  }

  if (values) {
    const keys = Object.keys(localStorageKeys);

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
