/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Constants
const COOKIE_MAX_AGE_ONE_YEAR = 31536000; // 1 year in seconds

/**
 * Parse cookies from a cookie string (from document.cookie or request headers)
 * Handles edge cases like cookies with '=' in their values
 * @param {string} cookieString - The cookie string to parse
 * @returns {Record<string, string>} Object with cookie name-value pairs
 */
export function parseCookies(cookieString) {
  if (!cookieString) return {};

  return cookieString.split(';').reduce((cookies, cookie) => {
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
 * @param {string} name - The cookie name
 * @returns {string | null} The cookie value or null if not found
 */
export function getCookie(name) {
  if (typeof document === 'undefined') return null;

  const cookies = parseCookies(document.cookie);
  return cookies[name] || null;
}

/**
 * Validate cookie value before setting
 * @param {string} value - The cookie value to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidCookieValue(value) {
  // Check for invalid characters in cookie values
  // Cookies cannot contain control characters, whitespace, or certain special chars
  // eslint-disable-next-line no-control-regex
  return typeof value === 'string' && !/[\x00-\x1F\x7F;,\s]/.test(value);
}

/**
 * Set a cookie (client-side only)
 * @param {string} name - The cookie name
 * @param {string} value - The cookie value
 * @param {object} [options] - Cookie options
 * @param {number} [options.maxAge] - Max age in seconds (default: 1 year)
 * @param {string} [options.path] - Cookie path (default: '/')
 * @param {string} [options.sameSite] - SameSite attribute (default: 'Lax')
 * @param {boolean} [options.secure] - Secure flag (default: false in dev, true in prod)
 */
export function setCookie(name, value, options = {}) {
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
 * @param {string} [cookieString] - Optional cookie string (for server-side)
 * @returns {{ themeSetting: string, headerInverse: boolean }} Object with themeSetting and headerInverse values
 */
export function getThemeFromCookies(cookieString) {
  const cookies = cookieString
    ? parseCookies(cookieString)
    : parseCookies(typeof document !== 'undefined' ? document.cookie : '');

  const themeSetting = cookies['theme-setting'] || 'system';
  const headerInverse = cookies['header-inverse'] === 'true';

  // Validate theme setting value
  const validThemeSettings = ['system', 'light', 'dark'];
  const validatedThemeSetting = validThemeSettings.includes(themeSetting)
    ? themeSetting
    : 'system';

  return {
    themeSetting: validatedThemeSetting,
    headerInverse,
  };
}

/**
 * Set theme values in cookies (client-side only)
 * @param {object} values - Theme values to set
 * @param {string} [values.themeSetting] - Theme setting (system, light, dark)
 * @param {boolean} [values.headerInverse] - Header inverse setting
 */
export function setThemeInCookies(values) {
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
