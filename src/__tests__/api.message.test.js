/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getPost, getComments } from '../api/message';

describe('api/message client', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  describe('getPost', () => {
    test('calls the post endpoint with the id and returns the parsed body', async () => {
      const body = { id: 7, title: 'a post' };
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(body),
      });

      const result = await getPost(7);

      expect(global.fetch).toHaveBeenCalledWith('/api/post/7');
      expect(result).toEqual(body);
    });

    test('throws when the network call rejects', async () => {
      global.fetch.mockRejectedValueOnce(new Error('offline'));
      await expect(getPost(1)).rejects.toThrow(/Failed to load post/);
    });

    test('throws when the response body cannot be parsed', async () => {
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.reject(new Error('bad json')),
      });
      await expect(getPost(1)).rejects.toThrow(/Failed to load post/);
    });
  });

  describe('getComments', () => {
    test('calls the comments endpoint with postId as a query param', async () => {
      const body = [{ id: 1, body: 'nice' }];
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(body),
      });

      const result = await getComments(42);

      expect(global.fetch).toHaveBeenCalledWith('/api/comments?postId=42');
      expect(result).toEqual(body);
    });

    test('throws when the network call rejects', async () => {
      global.fetch.mockRejectedValueOnce(new Error('offline'));
      await expect(getComments(1)).rejects.toThrow(/Failed to load comments/);
    });
  });
});
