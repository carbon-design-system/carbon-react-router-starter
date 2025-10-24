/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import {
  getLocalStorageValues,
  setLocalStorageValues,
} from '../utils/local-storage';

describe('local-storage utility', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value.toString();
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  // Setup and teardown
  beforeEach(() => {
    // Save the original localStorage
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Clear the mock localStorage before each test
    localStorageMock.clear();

    // Reset the mock function calls
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  describe('getLocalStorageValues', () => {
    test('returns default values when localStorage is empty', () => {
      const result = getLocalStorageValues();

      expect(result).toEqual({
        themeSetting: 'system',
        headerInverse: false,
      });

      expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'app-theme-setting',
      );
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'app-header-inverse',
      );
    });

    test('returns values from localStorage when available', () => {
      // Set up localStorage with values
      localStorageMock.setItem('app-theme-setting', 'dark');
      localStorageMock.setItem('app-header-inverse', 'true');

      // Clear the mock calls from setup
      localStorageMock.setItem.mockClear();

      const result = getLocalStorageValues();

      expect(result).toEqual({
        themeSetting: 'dark',
        headerInverse: true,
      });

      expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
    });

    test('correctly converts headerInverse string to boolean', () => {
      // Test with 'true' string
      localStorageMock.setItem('app-header-inverse', 'true');
      expect(getLocalStorageValues().headerInverse).toBe(true);

      // Test with 'false' string
      localStorageMock.setItem('app-header-inverse', 'false');
      expect(getLocalStorageValues().headerInverse).toBe(false);

      // Test with other string (should be false)
      localStorageMock.setItem('app-header-inverse', 'something');
      expect(getLocalStorageValues().headerInverse).toBe(false);
    });
  });

  describe('setLocalStorageValues', () => {
    test('saves values to localStorage', () => {
      setLocalStorageValues({
        themeSetting: 'dark',
        headerInverse: true,
      });

      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'app-theme-setting',
        'dark',
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'app-header-inverse',
        'true',
      );
    });

    test('converts boolean values to strings', () => {
      setLocalStorageValues({
        headerInverse: true,
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'app-header-inverse',
        'true',
      );

      setLocalStorageValues({
        headerInverse: false,
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'app-header-inverse',
        'false',
      );
    });

    test('only saves values for keys defined in localStorageKeys', () => {
      setLocalStorageValues({
        themeSetting: 'dark',
        headerInverse: true,
        unknownKey: 'value',
      });

      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
      expect(localStorageMock.setItem).not.toHaveBeenCalledWith(
        expect.anything(),
        'value',
      );
    });

    test('does not save undefined or null values', () => {
      setLocalStorageValues({
        themeSetting: undefined,
        headerInverse: null,
      });

      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    test('handles empty or undefined input', () => {
      // Empty object
      setLocalStorageValues({});
      expect(localStorageMock.setItem).not.toHaveBeenCalled();

      // Undefined
      setLocalStorageValues(undefined);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });
});

// Made with Bob
