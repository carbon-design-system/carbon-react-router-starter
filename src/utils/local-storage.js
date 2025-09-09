const localStorageKeys = {
  themeSetting: 'app-theme-setting',
  headerInverse: 'app-header-inverse',
};

export const getLocalStorageValues = () => {
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
