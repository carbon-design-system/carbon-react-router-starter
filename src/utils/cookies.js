/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parse cookies from a cookie string (from document.cookie or request headers)
 * @param {string} cookieString - The cookie string to parse
 * @returns {Object} Object with cookie name-value pairs
 */
export function parseCookies(cookieString) {
  if (!cookieString) return {};

  return cookieString.split(';').reduce((cookies, cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
    return cookies;
  }, {});
}

/**
 * Get a cookie value by name (client-side only)
 * @param {string} name - The cookie name
 * @returns {string|null} The cookie value or null if not found
 */
export function getCookie(name) {
  if (typeof document === 'undefined') return null;

  const cookies = parseCookies(document.cookie);
  return cookies[name] || null;
}

/**
 * Set a cookie (client-side only)
 * @param {string} name - The cookie name
 * @param {string} value - The cookie value
 * @param {Object} options - Cookie options
 * @param {number} options.maxAge - Max age in seconds (default: 1 year)
 * @param {string} options.path - Cookie path (default: '/')
 * @param {string} options.sameSite - SameSite attribute (default: 'Lax')
 * @param {boolean} options.secure - Secure flag (default: false in dev, true in prod)
 */
export function setCookie(name, value, options = {}) {
  if (typeof document === 'undefined') return;

  const {
    maxAge = 31536000, // 1 year in seconds
    path = '/',
    sameSite = 'Lax',
    secure = window.location.protocol === 'https:',
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}`;
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
 * @returns {Object} Object with themeSetting and headerInverse values
 */
export function getThemeFromCookies(cookieString) {
  const cookies = cookieString
    ? parseCookies(cookieString)
    : parseCookies(typeof document !== 'undefined' ? document.cookie : '');

  return {
    themeSetting: cookies['theme-setting'] || 'system',
    headerInverse: cookies['header-inverse'] === 'true',
  };
}

/**
 * Set theme values in cookies (client-side only)
 * @param {Object} values - Theme values to set
 * @param {string} [values.themeSetting] - Theme setting (system, light, dark)
 * @param {boolean} [values.headerInverse] - Header inverse setting
 */
export function setThemeInCookies(values) {
  if (values.themeSetting !== undefined) {
    setCookie('theme-setting', values.themeSetting);
  }
  if (values.headerInverse !== undefined) {
    setCookie('header-inverse', String(values.headerInverse));
  }
}

// Made with Bob
