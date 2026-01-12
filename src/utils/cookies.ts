/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ThemeSetting } from '../types/theme';

// Constants
const COOKIE_MAX_AGE_ONE_YEAR = 31536000; // 1 year in seconds

/**
 * Cookie options for setting cookies
 */
interface CookieOptions {
  maxAge?: number;
  path?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
}

/**
 * Theme values from cookies
 */
interface ThemeFromCookies {
  themeSetting: ThemeSetting;
  headerInverse: boolean;
}

/**
 * Theme values to set in cookies
 */
interface ThemeValues {
  themeSetting?: ThemeSetting;
  headerInverse?: boolean;
}

/**
 * Parse cookies from a cookie string (from document.cookie or request headers)
 * Handles edge cases like cookies with '=' in their values
 * @param cookieString - The cookie string to parse
 * @returns Object with cookie name-value pairs
 */
export function parseCookies(
  cookieString: string | undefined,
): Record<string, string> {
  if (!cookieString) return {};

  return cookieString.split(';').reduce(
    (cookies, cookie) => {
      const trimmed = cookie.trim();
      const equalsIndex = trimmed.indexOf('=');

      if (equalsIndex > 0) {
        const name = trimmed.substring(0, equalsIndex);
        const value = trimmed.substring(equalsIndex + 1);

        if (name && value) {
          try {
            cookies[name] = decodeURIComponent(value);
          } catch {
            // If decoding fails, use the raw value
            cookies[name] = value;
          }
        }
      }
      return cookies;
    },
    {} as Record<string, string>,
  );
}

/**
 * Get a cookie value by name (client-side only)
 * @param name - The cookie name
 * @returns The cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = parseCookies(document.cookie);
  return cookies[name] || null;
}

/**
 * Validate cookie value before setting
 * @param value - The cookie value to validate
 * @returns True if valid, false otherwise
 */
function isValidCookieValue(value: string): boolean {
  // Check for invalid characters in cookie values
  // Cookies cannot contain control characters, whitespace, or certain special chars
  // eslint-disable-next-line no-control-regex
  return typeof value === 'string' && !/[\x00-\x1F\x7F;,\s]/.test(value);
}

/**
 * Set a cookie (client-side only)
 * @param name - The cookie name
 * @param value - The cookie value
 * @param options - Cookie options
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): void {
  if (typeof document === 'undefined') return;

  // Validate cookie value before encoding
  const encodedValue = encodeURIComponent(value);
  if (!isValidCookieValue(encodedValue)) {
    console.warn(
      `Invalid cookie value for "${name}": contains invalid characters`,
    );
    return;
  }

  const {
    maxAge = COOKIE_MAX_AGE_ONE_YEAR,
    path = '/',
    sameSite = 'Lax',
    secure = window.location.protocol === 'https:',
  } = options;

  let cookieString = `${name}=${encodedValue}`;
  cookieString += `; Path=${path}`;
  cookieString += `; Max-Age=${maxAge}`;
  cookieString += `; SameSite=${sameSite}`;

  if (secure) {
    cookieString += '; Secure';
  }

  document.cookie = cookieString;
}

/**
 * Get theme values from cookies
 * @param cookieString - Optional cookie string (for server-side)
 * @returns Object with themeSetting and headerInverse values
 */
export function getThemeFromCookies(cookieString?: string): ThemeFromCookies {
  const cookies = cookieString
    ? parseCookies(cookieString)
    : parseCookies(typeof document !== 'undefined' ? document.cookie : '');

  const themeSetting = cookies['theme-setting'] || 'system';
  const headerInverse = cookies['header-inverse'] === 'true';

  // Validate theme setting value
  const validThemeSettings: ThemeSetting[] = ['system', 'light', 'dark'];
  const validatedThemeSetting = validThemeSettings.includes(
    themeSetting as ThemeSetting,
  )
    ? (themeSetting as ThemeSetting)
    : 'system';

  return {
    themeSetting: validatedThemeSetting,
    headerInverse,
  };
}

/**
 * Set theme values in cookies (client-side only)
 * @param values - Theme values to set
 */
export function setThemeInCookies(values: ThemeValues): void {
  if (values.themeSetting !== undefined) {
    // Validate theme setting before setting cookie
    const validThemeSettings: ThemeSetting[] = ['system', 'light', 'dark'];
    if (validThemeSettings.includes(values.themeSetting)) {
      setCookie('theme-setting', values.themeSetting);
    } else {
      console.warn(`Invalid theme setting: ${values.themeSetting}`);
    }
  }
  if (values.headerInverse !== undefined) {
    setCookie('header-inverse', String(values.headerInverse));
  }
}
