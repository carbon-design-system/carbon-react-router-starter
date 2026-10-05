/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Constants
const COOKIE_MAX_AGE_ONE_YEAR = 31536000; // 1 year in seconds

/**
 * Parse cookies from a cookie string (from document.cookie or request headers)
 * Handles edge cases like cookies with '=' in their values
 */
export function parseCookies(cookieString: string): Record<string, string> {
  if (!cookieString) return {};

  return cookieString.split(';').reduce<Record<string, string>>((cookies, cookie) => {
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
  }, {});
}

/**
 * Get a cookie value by name (client-side only)
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = parseCookies(document.cookie);
  return cookies[name] ?? null;
}

interface CookieOptions {
  maxAge?: number;
  path?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
}

/**
 * Validate cookie value before setting
 */
function isValidCookieValue(value: string): boolean {
  // Check for invalid characters in cookie values
  // Cookies cannot contain control characters, whitespace, or certain special chars
  // eslint-disable-next-line no-control-regex
  return typeof value === 'string' && !/[\x00-\x1F\x7F;,\s]/.test(value);
}

/**
 * Set a cookie (client-side only)
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') return;

  // Validate cookie value before encoding
  const encodedValue = encodeURIComponent(value);
  if (!isValidCookieValue(encodedValue)) {
    console.warn(`Invalid cookie value for "${name}": contains invalid characters`);
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

export interface ThemeCookieValues {
  themeSetting: string;
  headerInverse: boolean;
}

/**
 * Get theme values from cookies
 */
export function getThemeFromCookies(cookieString?: string): ThemeCookieValues {
  const cookies = cookieString
    ? parseCookies(cookieString)
    : parseCookies(typeof document !== 'undefined' ? document.cookie : '');

  const themeSetting = cookies['theme-setting'] ?? 'system';
  const headerInverse = cookies['header-inverse'] === 'true';

  // Validate theme setting value
  const validThemeSettings = ['system', 'light', 'dark'];
  const validatedThemeSetting = validThemeSettings.includes(themeSetting) ? themeSetting : 'system';

  return {
    themeSetting: validatedThemeSetting,
    headerInverse,
  };
}

interface SetThemeCookieValues {
  themeSetting?: string;
  headerInverse?: boolean;
}

/**
 * Set theme values in cookies (client-side only)
 */
export function setThemeInCookies(values: SetThemeCookieValues): void {
  if (values.themeSetting !== undefined) {
    // Validate theme setting before setting cookie
    const validThemeSettings = ['system', 'light', 'dark'];
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
