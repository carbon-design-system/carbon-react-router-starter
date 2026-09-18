/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';

vi.mock('../utils/port.js', () => ({
  findAvailablePort: vi.fn(),
}));

import { getServerConfig } from '../config/server-config';
import { findAvailablePort } from '../utils/port.js';

describe('getServerConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('returns port and baseUrl when port is available', async () => {
    findAvailablePort.mockResolvedValue(5173);

    const result = await getServerConfig();

    expect(result).toEqual({
      port: 5173,
      baseUrl: 'http://localhost:5173',
    });
  });

  test('returns alternative port and baseUrl when preferred port is in use', async () => {
    findAvailablePort.mockResolvedValue(5174);

    const result = await getServerConfig();

    expect(result).toEqual({
      port: 5174,
      baseUrl: 'http://localhost:5174',
    });
  });

  test('throws with descriptive message when port detection fails', async () => {
    const error = new Error('No ports available');
    findAvailablePort.mockRejectedValue(error);

    await expect(getServerConfig()).rejects.toThrow('Unable to start server');
    expect(console.error).toHaveBeenCalledWith('Failed to get server configuration:', error);
  });
});
