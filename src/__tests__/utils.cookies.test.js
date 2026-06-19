/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  parseCookies,
  getCookie,
  setCookie,
  getThemeFromCookies,
  setThemeInCookies,
} from '../utils/cookies';

describe('cookie utilities', () => {
  describe('parseCookies', () => {
    test('parses simple cookie string', () => {
      const cookieString = 'name=value; another=test';
      const result = parseCookies(cookieString);

      expect(result).toEqual({
        name: 'value',
        another: 'test',
      });
    });

    test('handles empty cookie string', () => {
      const result = parseCookies('');
      expect(result).toEqual({});
    });

    test('handles null cookie string', () => {
      const result = parseCookies(null);
      expect(result).toEqual({});
    });

    test('handles undefined cookie string', () => {
      const result = parseCookies(undefined);
      expect(result).toEqual({});
    });

    test('handles cookies with equals signs in values', () => {
      const cookieString = 'token=abc=def=ghi';
      const result = parseCookies(cookieString);

      expect(result).toEqual({
        token: 'abc=def=ghi',
      });
    });

    test('handles URL-encoded cookie values', () => {
      const cookieString = 'name=John%20Doe; email=test%40example.com';
      const result = parseCookies(cookieString);

      expect(result).toEqual({
        name: 'John Doe',
        email: 'test@example.com',
      });
    });

    test('handles malformed URL-encoded values gracefully', () => {
      const cookieString = 'name=%E0%A4%A; valid=test';
      const result = parseCookies(cookieString);

      expect(result).toEqual({
        name: '%E0%A4%A',
        valid: 'test',
      });
    });

    test('ignores cookies without equals sign', () => {
      const cookieString = 'invalid; name=value';
      const result = parseCookies(cookieString);

      expect(result).toEqual({
        name: 'value',
      });
    });

    test('ignores cookies with empty name', () => {
      const cookieString = '=value; name=test';
      const result = parseCookies(cookieString);

      expect(result).toEqual({
        name: 'test',
      });
    });

    test('ignores cookies with empty value', () => {
      const cookieString = 'name=; valid=test';
      const result = parseCookies(cookieString);

      expect(result).toEqual({
        valid: 'test',
      });
    });

    test('handles cookies with spaces', () => {
      const cookieString = 'name=value; another=test';
      const result = parseCookies(cookieString);

      expect(result).toEqual({
        name: 'value',
        another: 'test',
      });
    });
  });

  describe('getCookie', () => {
    let mockDocument;

    beforeEach(() => {
      mockDocument = {
        cookie: 'name=value; theme=dark',
      };
      global.document = mockDocument;
    });

    afterEach(() => {
      delete global.document;
    });

    test('returns cookie value by name', () => {
      const result = getCookie('name');
      expect(result).toBe('value');
    });

    test('returns null for non-existent cookie', () => {
      const result = getCookie('nonexistent');
      expect(result).toBeNull();
    });

    test('returns null when document is undefined', () => {
      delete global.document;
      const result = getCookie('name');
      expect(result).toBeNull();
    });

    test('handles URL-encoded cookie values', () => {
      mockDocument.cookie = 'name=John%20Doe';
      const result = getCookie('name');
      expect(result).toBe('John Doe');
    });
  });

  describe('setCookie', () => {
    let mockDocument;
    let mockWindow;

    beforeEach(() => {
      mockDocument = {
        cookie: '',
      };
      mockWindow = {
        location: {
          protocol: 'https:',
        },
      };
      global.document = mockDocument;
      global.window = mockWindow;
    });

    afterEach(() => {
      delete global.document;
      delete global.window;
    });

    test('sets a cookie with default options', () => {
      setCookie('name', 'value');

      expect(mockDocument.cookie).toContain('name=value');
      expect(mockDocument.cookie).toContain('Path=/');
      expect(mockDocument.cookie).toContain('Max-Age=31536000');
      expect(mockDocument.cookie).toContain('SameSite=Lax');
      expect(mockDocument.cookie).toContain('Secure');
    });

    test('sets a cookie with custom options', () => {
      setCookie('name', 'value', {
        maxAge: 3600,
        path: '/custom',
        sameSite: 'Strict',
        secure: false,
      });

      expect(mockDocument.cookie).toContain('name=value');
      expect(mockDocument.cookie).toContain('Path=/custom');
      expect(mockDocument.cookie).toContain('Max-Age=3600');
      expect(mockDocument.cookie).toContain('SameSite=Strict');
      expect(mockDocument.cookie).not.toContain('Secure');
    });

    test('URL-encodes cookie value', () => {
      setCookie('name', 'John Doe');

      expect(mockDocument.cookie).toContain('name=John%20Doe');
    });

    test('does not set cookie when document is undefined', () => {
      delete global.document;

      setCookie('name', 'value');

      // No error should be thrown
    });

    test('does not set Secure flag on HTTP', () => {
      mockWindow.location.protocol = 'http:';

      setCookie('name', 'value');

      expect(mockDocument.cookie).not.toContain('Secure');
    });

    test('encodes special characters in cookie values', () => {
      setCookie('name', 'value; test');

      // The semicolon should be encoded
      expect(mockDocument.cookie).toContain('name=value%3B%20test');
    });
  });

  describe('getThemeFromCookies', () => {
    test('returns default values when no cookies', () => {
      const result = getThemeFromCookies('');

      expect(result).toEqual({
        themeSetting: 'system',
        headerInverse: false,
      });
    });

    test('returns theme settings from cookie string', () => {
      const cookieString = 'theme-setting=dark; header-inverse=true';
      const result = getThemeFromCookies(cookieString);

      expect(result).toEqual({
        themeSetting: 'dark',
        headerInverse: true,
      });
    });

    test('returns light theme setting', () => {
      const cookieString = 'theme-setting=light; header-inverse=false';
      const result = getThemeFromCookies(cookieString);

      expect(result).toEqual({
        themeSetting: 'light',
        headerInverse: false,
      });
    });

    test('validates theme setting and defaults to system for invalid values', () => {
      const cookieString = 'theme-setting=invalid; header-inverse=true';
      const result = getThemeFromCookies(cookieString);

      expect(result).toEqual({
        themeSetting: 'system',
        headerInverse: true,
      });
    });

    test('handles headerInverse as false when not "true"', () => {
      const cookieString = 'theme-setting=dark; header-inverse=false';
      const result = getThemeFromCookies(cookieString);

      expect(result).toEqual({
        themeSetting: 'dark',
        headerInverse: false,
      });
    });

    test('reads from document.cookie when no cookie string provided', () => {
      const mockDocument = {
        cookie: 'theme-setting=dark; header-inverse=true',
      };
      global.document = mockDocument;

      const result = getThemeFromCookies();

      expect(result).toEqual({
        themeSetting: 'dark',
        headerInverse: true,
      });

      delete global.document;
    });

    test('handles missing document gracefully', () => {
      const result = getThemeFromCookies();

      expect(result).toEqual({
        themeSetting: 'system',
        headerInverse: false,
      });
    });
  });

  describe('setThemeInCookies', () => {
    let mockDocument;
    let mockWindow;

    beforeEach(() => {
      mockDocument = {
        cookie: '',
      };
      mockWindow = {
        location: {
          protocol: 'https:',
        },
      };
      global.document = mockDocument;
      global.window = mockWindow;
    });

    afterEach(() => {
      delete global.document;
      delete global.window;
    });

    test('sets theme setting cookie', () => {
      setThemeInCookies({ themeSetting: 'dark' });

      expect(mockDocument.cookie).toContain('theme-setting=dark');
    });

    test('sets header inverse cookie', () => {
      setThemeInCookies({ headerInverse: true });

      expect(mockDocument.cookie).toContain('header-inverse=true');
    });

    test('sets both cookies sequentially', () => {
      // Note: In the actual implementation, each setCookie call overwrites document.cookie
      // So we need to test them separately
      setThemeInCookies({ themeSetting: 'light' });
      expect(mockDocument.cookie).toContain('theme-setting=light');

      setThemeInCookies({ headerInverse: false });
      expect(mockDocument.cookie).toContain('header-inverse=false');
    });

    test('validates theme setting and warns for invalid values', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation();

      setThemeInCookies({ themeSetting: 'invalid' });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid theme setting'),
      );
      expect(mockDocument.cookie).not.toContain('theme-setting=invalid');

      consoleWarnSpy.mockRestore();
    });

    test('accepts valid theme settings', () => {
      setThemeInCookies({ themeSetting: 'system' });
      expect(mockDocument.cookie).toContain('theme-setting=system');

      setThemeInCookies({ themeSetting: 'light' });
      expect(mockDocument.cookie).toContain('theme-setting=light');

      setThemeInCookies({ themeSetting: 'dark' });
      expect(mockDocument.cookie).toContain('theme-setting=dark');
    });

    test('does nothing when no values provided', () => {
      const initialCookie = mockDocument.cookie;
      setThemeInCookies({});

      expect(mockDocument.cookie).toBe(initialCookie);
    });
  });
});

// Made with Bob
