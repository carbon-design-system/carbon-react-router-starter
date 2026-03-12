/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getPost, getComments } from '../service/postHandlers';
import {
  getExternalPost,
  getExternalComments,
} from '../service/externalHandlers';

describe('postHandlers', () => {
  describe('getPost', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
      mockReq = {
        params: {},
      };
      mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      global.fetch = vi.fn();
    });

    test('validates post id is a positive integer', async () => {
      mockReq.params.id = 'invalid';

      await getPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid post id' });
    });

    test('rejects negative numbers', async () => {
      mockReq.params.id = '-1';

      await getPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid post id' });
    });

    test('rejects alphanumeric strings', async () => {
      mockReq.params.id = '123abc';

      await getPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid post id' });
    });

    test('handles fetch errors', async () => {
      mockReq.params.id = '1';
      global.fetch.mockRejectedValue(new Error('Network error'));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation();

      await getPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Failed to fetch post',
      });
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    test('handles non-ok responses', async () => {
      mockReq.params.id = '999';
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Post not found' }),
      });

      await getPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    test('returns post data on success', async () => {
      mockReq.params.id = '1';
      const mockPost = { id: 1, title: 'Test Post' };
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockPost,
      });

      await getPost(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockPost);
      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });

  describe('getComments', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
      mockReq = {
        query: {},
      };
      mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      global.fetch = vi.fn();
    });

    test('validates postId is provided', async () => {
      await getComments(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Missing postId parameter',
      });
    });

    test('handles fetch errors', async () => {
      mockReq.query.postId = '1';
      global.fetch.mockRejectedValue(new Error('Network error'));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation();

      await getComments(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Failed to fetch comments',
      });
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    test('handles non-ok responses', async () => {
      mockReq.query.postId = '999';
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Comments not found' }),
      });

      await getComments(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Comments not found',
      });
    });

    test('returns comments on success', async () => {
      mockReq.query.postId = '1';
      const mockComments = [{ id: 1, body: 'Test comment' }];
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockComments,
      });

      await getComments(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockComments);
      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });
});

describe('externalHandlers', () => {
  describe('getExternalPost', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
      mockReq = {
        params: {},
      };
      mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
    });

    test('validates post id is a positive integer', async () => {
      mockReq.params.id = 'invalid';

      await getExternalPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid post id' });
    });

    test('returns 404 for non-existent post', async () => {
      mockReq.params.id = '999';

      await getExternalPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    test('returns post data for valid id', async () => {
      mockReq.params.id = '1';

      await getExternalPost(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: expect.any(String),
          body: expect.any(String),
        }),
      );
    });
  });

  describe('getExternalComments', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
      mockReq = {
        query: {},
      };
      mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
    });

    test('validates postId is provided', async () => {
      await getExternalComments(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Invalid or missing postId',
      });
    });

    test('validates postId is a positive integer', async () => {
      mockReq.query.postId = 'invalid';

      await getExternalComments(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Invalid or missing postId',
      });
    });

    test('returns empty array for post with no comments', async () => {
      mockReq.query.postId = '999';

      await getExternalComments(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith([]);
    });

    test('returns comments for valid postId', async () => {
      mockReq.query.postId = '1';

      await getExternalComments(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            postId: 1,
            name: expect.any(String),
          }),
        ]),
      );
    });
  });
});

// Made with Bob
