/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import * as themeUtils from '../utils/theme';
import * as cookieUtils from '../utils/cookies';

// Mock the cookie utilities
vi.mock('../utils/cookies', () => ({
  getThemeFromCookies: vi.fn(),
  setThemeInCookies: vi.fn(),
}));

describe('theme utilities', () => {
  let mockDocument;

  beforeEach(() => {
    // Create a mock document object
    mockDocument = {
      documentElement: {
        setAttribute: vi.fn(),
        getAttribute: vi.fn(),
      },
    };

    // Replace global document with mock
    global.document = mockDocument;

    // Reset all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up
    delete global.document;
  });

  describe('getThemeSettings', () => {
    test('returns theme settings from cookies', () => {
      const mockThemeSettings = {
        themeSetting: 'dark',
        headerInverse: true,
      };

      cookieUtils.getThemeFromCookies.mockReturnValue(mockThemeSettings);

      const result = themeUtils.getThemeSettings();

      expect(result).toEqual(mockThemeSettings);
      expect(cookieUtils.getThemeFromCookies).toHaveBeenCalledTimes(1);
    });
  });

  describe('setThemeSetting', () => {
    test('updates cookie and HTML attribute', () => {
      themeUtils.setThemeSetting('dark');

      expect(cookieUtils.setThemeInCookies).toHaveBeenCalledWith({
        themeSetting: 'dark',
      });
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-setting',
        'dark',
      );
    });

    test('handles light theme', () => {
      themeUtils.setThemeSetting('light');

      expect(cookieUtils.setThemeInCookies).toHaveBeenCalledWith({
        themeSetting: 'light',
      });
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-setting',
        'light',
      );
    });

    test('handles system theme', () => {
      themeUtils.setThemeSetting('system');

      expect(cookieUtils.setThemeInCookies).toHaveBeenCalledWith({
        themeSetting: 'system',
      });
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-setting',
        'system',
      );
    });

    test('does not update HTML when document is undefined', () => {
      delete global.document;

      themeUtils.setThemeSetting('dark');

      expect(cookieUtils.setThemeInCookies).toHaveBeenCalledWith({
        themeSetting: 'dark',
      });
      // No error should be thrown
    });
  });

  describe('setHeaderInverse', () => {
    test('updates cookie and HTML attribute when true', () => {
      themeUtils.setHeaderInverse(true);

      expect(cookieUtils.setThemeInCookies).toHaveBeenCalledWith({
        headerInverse: true,
      });
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-header-inverse',
        'true',
      );
    });

    test('updates cookie and HTML attribute when false', () => {
      themeUtils.setHeaderInverse(false);

      expect(cookieUtils.setThemeInCookies).toHaveBeenCalledWith({
        headerInverse: false,
      });
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-header-inverse',
        'false',
      );
    });

    test('does not update HTML when document is undefined', () => {
      delete global.document;

      themeUtils.setHeaderInverse(true);

      expect(cookieUtils.setThemeInCookies).toHaveBeenCalledWith({
        headerInverse: true,
      });
      // No error should be thrown
    });
  });

  describe('initializeTheme', () => {
    beforeEach(() => {
      cookieUtils.getThemeFromCookies.mockReturnValue({
        themeSetting: 'dark',
        headerInverse: true,
      });
    });

    test('does nothing when document is undefined', () => {
      delete global.document;

      themeUtils.initializeTheme();

      expect(mockDocument.documentElement.setAttribute).not.toHaveBeenCalled();
    });

    test('sets attributes when they are not present', () => {
      mockDocument.documentElement.getAttribute.mockReturnValue(null);

      themeUtils.initializeTheme();

      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme-setting',
        'dark',
      );
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-header-inverse',
        'true',
      );
    });

    test('does not update when attributes match cookies', () => {
      mockDocument.documentElement.getAttribute.mockImplementation((attr) => {
        if (attr === 'data-theme-setting') return 'dark';
        if (attr === 'data-header-inverse') return 'true';
        return null;
      });

      themeUtils.initializeTheme();

      expect(mockDocument.documentElement.setAttribute).not.toHaveBeenCalled();
    });

    test('logs warning when theme setting changed between SSR and hydration', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation();

      mockDocument.documentElement.getAttribute.mockImplementation((attr) => {
        if (attr === 'data-theme-setting') return 'light';
        if (attr === 'data-header-inverse') return 'true';
        return null;
      });

      themeUtils.initializeTheme();

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Theme cookie changed between SSR and hydration',
        ),
      );
      expect(mockDocument.documentElement.setAttribute).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    test('logs warning when header inverse changed between SSR and hydration', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation();

      mockDocument.documentElement.getAttribute.mockImplementation((attr) => {
        if (attr === 'data-theme-setting') return 'dark';
        if (attr === 'data-header-inverse') return 'false';
        return null;
      });

      themeUtils.initializeTheme();

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Header inverse cookie changed between SSR and hydration',
        ),
      );
      expect(mockDocument.documentElement.setAttribute).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    test('sets only missing attributes', () => {
      mockDocument.documentElement.getAttribute.mockImplementation((attr) => {
        if (attr === 'data-theme-setting') return 'dark';
        if (attr === 'data-header-inverse') return null;
        return null;
      });

      themeUtils.initializeTheme();

      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledTimes(
        1,
      );
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-header-inverse',
        'true',
      );
    });
  });
});

// Made with Bob
