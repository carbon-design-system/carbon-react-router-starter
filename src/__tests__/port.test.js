/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { test, expect, describe, vi, beforeEach } from 'vitest';
import { findAvailablePort } from '../utils/port';
import detect from 'detect-port';

// Mock the detect-port module
vi.mock('detect-port');

describe('findAvailablePort', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Reset console mocks
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('returns the preferred port when it is available', async () => {
    const preferredPort = 5173;
    detect.mockResolvedValue(preferredPort);

    const result = await findAvailablePort(preferredPort);

    expect(result).toBe(preferredPort);
    expect(detect).toHaveBeenCalledWith(preferredPort);
    expect(console.warn).not.toHaveBeenCalled();
  });

  test('returns an alternative port when preferred port is in use', async () => {
    const preferredPort = 5173;
    const alternativePort = 5174;
    detect.mockResolvedValue(alternativePort);

    const result = await findAvailablePort(preferredPort);

    expect(result).toBe(alternativePort);
    expect(detect).toHaveBeenCalledWith(preferredPort);
    expect(console.warn).toHaveBeenCalledWith(
      `⚠️  Port ${preferredPort} is in use, using port ${alternativePort} instead`,
    );
  });

  test('handles multiple port conflicts', async () => {
    const preferredPort = 3000;
    const alternativePort = 3002;
    detect.mockResolvedValue(alternativePort);

    const result = await findAvailablePort(preferredPort);

    expect(result).toBe(alternativePort);
    expect(console.warn).toHaveBeenCalledWith(
      `⚠️  Port ${preferredPort} is in use, using port ${alternativePort} instead`,
    );
  });

  test('throws error when port detection fails', async () => {
    const preferredPort = 5173;
    const error = new Error('Port detection failed');
    detect.mockRejectedValue(error);

    await expect(findAvailablePort(preferredPort)).rejects.toThrow(
      'Failed to find available port',
    );
    expect(console.error).toHaveBeenCalledWith(
      'Error detecting available port:',
      error,
    );
  });

  test('handles network errors gracefully', async () => {
    const preferredPort = 8080;
    const networkError = new Error('ECONNREFUSED');
    detect.mockRejectedValue(networkError);

    await expect(findAvailablePort(preferredPort)).rejects.toThrow(
      'Failed to find available port',
    );
    expect(console.error).toHaveBeenCalledWith(
      'Error detecting available port:',
      networkError,
    );
  });

  test('handles invalid port numbers', async () => {
    const invalidPort = -1;
    const error = new Error('Invalid port number');
    detect.mockRejectedValue(error);

    await expect(findAvailablePort(invalidPort)).rejects.toThrow(
      'Failed to find available port',
    );
  });

  test('works with high port numbers', async () => {
    const highPort = 65535;
    detect.mockResolvedValue(highPort);

    const result = await findAvailablePort(highPort);

    expect(result).toBe(highPort);
    expect(detect).toHaveBeenCalledWith(highPort);
  });

  test('works with low port numbers', async () => {
    const lowPort = 1024;
    detect.mockResolvedValue(lowPort);

    const result = await findAvailablePort(lowPort);

    expect(result).toBe(lowPort);
    expect(detect).toHaveBeenCalledWith(lowPort);
  });

  test('handles common development ports', async () => {
    const commonPorts = [3000, 5173, 8080, 4200, 5000];

    for (const port of commonPorts) {
      detect.mockResolvedValue(port);
      const result = await findAvailablePort(port);
      expect(result).toBe(port);
    }
  });

  test('handles timeout errors', async () => {
    const preferredPort = 5173;
    const timeoutError = new Error('Timeout');
    detect.mockRejectedValue(timeoutError);

    await expect(findAvailablePort(preferredPort)).rejects.toThrow(
      'Failed to find available port',
    );
    expect(console.error).toHaveBeenCalledWith(
      'Error detecting available port:',
      timeoutError,
    );
  });

  test('handles permission errors', async () => {
    const preferredPort = 80; // Privileged port
    const permissionError = new Error('EACCES: permission denied');
    detect.mockRejectedValue(permissionError);

    await expect(findAvailablePort(preferredPort)).rejects.toThrow(
      'Failed to find available port',
    );
    expect(console.error).toHaveBeenCalledWith(
      'Error detecting available port:',
      permissionError,
    );
  });

  test('logs warning only when port changes', async () => {
    const preferredPort = 5173;

    // First call - port available
    detect.mockResolvedValue(preferredPort);
    await findAvailablePort(preferredPort);
    expect(console.warn).not.toHaveBeenCalled();

    // Second call - port in use
    const alternativePort = 5174;
    detect.mockResolvedValue(alternativePort);
    await findAvailablePort(preferredPort);
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  test('handles undefined or null port gracefully', async () => {
    detect.mockRejectedValue(new Error('Invalid port'));

    await expect(findAvailablePort(undefined)).rejects.toThrow(
      'Failed to find available port',
    );
    await expect(findAvailablePort(null)).rejects.toThrow(
      'Failed to find available port',
    );
  });

  test('handles string port numbers', async () => {
    const portString = '5173';
    detect.mockResolvedValue(5173);

    const result = await findAvailablePort(portString);

    expect(result).toBe(5173);
    expect(detect).toHaveBeenCalledWith(portString);
  });

  test('handles concurrent port detection calls', async () => {
    const ports = [5173, 5174, 5175];
    detect.mockImplementation((port) => Promise.resolve(port));

    const results = await Promise.all(
      ports.map((port) => findAvailablePort(port)),
    );

    expect(results).toEqual(ports);
    expect(detect).toHaveBeenCalledTimes(3);
  });
});
