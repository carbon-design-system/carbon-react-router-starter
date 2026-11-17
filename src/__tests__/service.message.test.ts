/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { getMessage } from '../service/message';

describe('service/message getMessage', () => {
  const mockReq = {};
  let mockRes: { status: Mock; json: Mock };
  let fetchMock: Mock;

  beforeEach(() => {
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('returns the blogpost title from the upstream response', async () => {
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ title: 'a sample title' }),
    });

    await getMessage(mockReq, mockRes);

    expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'a sample title' });
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  test('responds 500 when fetch rejects', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network down'));

    await getMessage(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Failed to fetch message',
    });
  });

  test('responds 500 when the upstream body cannot be parsed', async () => {
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.reject(new Error('bad json')),
    });

    await getMessage(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Failed to fetch message',
    });
  });
});
