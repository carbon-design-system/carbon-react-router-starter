/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { usePrefersDarkScheme } from '@carbon/react';
import { useEffect, useState } from 'react';

export const useThemes = () => {
  const prefersDark = usePrefersDarkScheme();
  const [themeReady, setThemeReady] = useState(false);

  // Will not resolve to actual theme preferences until after first render
  // monitor themeReady to make use of primary and secondary theme.
  const [primaryTheme, setPrimaryTheme] = useState('g100');
  const [secondaryTheme, setSecondaryTheme] = useState('g90');

  useEffect(() => {
    if (prefersDark) {
      setPrimaryTheme('g100');
      setSecondaryTheme('g90');
    } else {
      setPrimaryTheme('g10');
      setSecondaryTheme('white');
    }
    setThemeReady(true);
  }, [prefersDark]);

  return { primaryTheme, secondaryTheme, themeReady };
};
