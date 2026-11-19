/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { test, expect, describe, vi, beforeEach } from 'vitest';
import { findAvailablePort } from '../utils/port';
import detectPort from 'detect-port';

// Mock the detect-port module
vi.mock('detect-port');

// detect-port is overloaded (promise and callback forms); the code under test uses the promise form
const detectMock = vi.mocked<(port?: number) => Promise<number>>(detectPort);

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
    detectMock.mockResolvedValue(preferredPort);

    const result = await findAvailablePort(preferredPort);

    expect(result).toBe(preferredPort);
    expect(detectPort).toHaveBeenCalledWith(preferredPort);
    expect(console.warn).not.toHaveBeenCalled();
  });

  test('returns an alternative port when preferred port is in use', async () => {
    const preferredPort = 5173;
    const alternativePort = 5174;
    detectMock.mockResolvedValue(alternativePort);

    const result = await findAvailablePort(preferredPort);

    expect(result).toBe(alternativePort);
    expect(detectPort).toHaveBeenCalledWith(preferredPort);
    expect(console.warn).toHaveBeenCalledWith(
      `⚠️  Port ${preferredPort} is in use, using port ${alternativePort} instead`,
    );
  });

  test('handles multiple port conflicts', async () => {
    const preferredPort = 3000;
    const alternativePort = 3002;
    detectMock.mockResolvedValue(alternativePort);

    const result = await findAvailablePort(preferredPort);

    expect(result).toBe(alternativePort);
    expect(console.warn).toHaveBeenCalledWith(
      `⚠️  Port ${preferredPort} is in use, using port ${alternativePort} instead`,
    );
  });

  test('throws error when port detection fails', async () => {
    const preferredPort = 5173;
    const error = new Error('Port detection failed');
    detectMock.mockRejectedValue(error);

    await expect(findAvailablePort(preferredPort)).rejects.toThrow('Failed to find available port');
    expect(console.error).toHaveBeenCalledWith('Error detecting available port:', error);
  });

  test('handles network errors gracefully', async () => {
    const preferredPort = 8080;
    const networkError = new Error('ECONNREFUSED');
    detectMock.mockRejectedValue(networkError);

    await expect(findAvailablePort(preferredPort)).rejects.toThrow('Failed to find available port');
    expect(console.error).toHaveBeenCalledWith('Error detecting available port:', networkError);
  });

  test('handles invalid port numbers', async () => {
    const invalidPort = -1;
    const error = new Error('Invalid port number');
    detectMock.mockRejectedValue(error);

    await expect(findAvailablePort(invalidPort)).rejects.toThrow('Failed to find available port');
  });

  test('works with high port numbers', async () => {
    const highPort = 65535;
    detectMock.mockResolvedValue(highPort);

    const result = await findAvailablePort(highPort);

    expect(result).toBe(highPort);
    expect(detectPort).toHaveBeenCalledWith(highPort);
  });

  test('works with low port numbers', async () => {
    const lowPort = 1024;
    detectMock.mockResolvedValue(lowPort);

    const result = await findAvailablePort(lowPort);

    expect(result).toBe(lowPort);
    expect(detectPort).toHaveBeenCalledWith(lowPort);
  });

  test('handles common development ports', async () => {
    const commonPorts = [3000, 5173, 8080, 4200, 5000];

    for (const port of commonPorts) {
      detectMock.mockResolvedValue(port);
      const result = await findAvailablePort(port);
      expect(result).toBe(port);
    }
  });

  test('handles timeout errors', async () => {
    const preferredPort = 5173;
    const timeoutError = new Error('Timeout');
    detectMock.mockRejectedValue(timeoutError);

    await expect(findAvailablePort(preferredPort)).rejects.toThrow('Failed to find available port');
    expect(console.error).toHaveBeenCalledWith('Error detecting available port:', timeoutError);
  });

  test('handles permission errors', async () => {
    const preferredPort = 80; // Privileged port
    const permissionError = new Error('EACCES: permission denied');
    detectMock.mockRejectedValue(permissionError);

    await expect(findAvailablePort(preferredPort)).rejects.toThrow('Failed to find available port');
    expect(console.error).toHaveBeenCalledWith('Error detecting available port:', permissionError);
  });

  test('logs warning only when port changes', async () => {
    const preferredPort = 5173;

    // First call - port available
    detectMock.mockResolvedValue(preferredPort);
    await findAvailablePort(preferredPort);
    expect(console.warn).not.toHaveBeenCalled();

    // Second call - port in use
    const alternativePort = 5174;
    detectMock.mockResolvedValue(alternativePort);
    await findAvailablePort(preferredPort);
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  test('handles concurrent port detection calls', async () => {
    const ports = [5173, 5174, 5175];
    detectMock.mockImplementation((port) => Promise.resolve(port ?? 0));

    const results = await Promise.all(ports.map((port) => findAvailablePort(port)));

    expect(results).toEqual(ports);
    expect(detectPort).toHaveBeenCalledTimes(3);
  });

  test('includes "Unknown error" in message when error has no message property', async () => {
    const preferredPort = 5173;
    detectMock.mockRejectedValue({});

    await expect(findAvailablePort(preferredPort)).rejects.toThrow('Failed to find available port: Unknown error');
  });
});
