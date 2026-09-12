/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getMessage } from '../service/message';

describe('service/message getMessage', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    global.fetch = vi.fn();
  });

  test('returns the blogpost title from the upstream response', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ title: 'a sample title' }),
    });

    await getMessage(mockReq, mockRes);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'a sample title' });
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  test('responds 500 when fetch rejects', async () => {
    global.fetch.mockRejectedValueOnce(new Error('network down'));

    await getMessage(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Failed to fetch message',
    });
  });

  test('responds 500 when the upstream body cannot be parsed', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('bad json')),
    });

    await getMessage(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Failed to fetch message',
    });
  });
});
