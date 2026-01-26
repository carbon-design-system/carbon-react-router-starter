/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getPost, getComments } from '../api/message';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

describe('API Message Functions', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  // ===== getPost Tests =====

  it('getPost returns post data for valid post ID', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        title: 'Test Post',
        body: 'This is a test post',
        userId: 1,
      }),
    });

    const post = await getPost(1);

    expect(mockFetch).toHaveBeenCalledWith('/api/post/1');
    expect(post).toEqual({
      id: 1,
      title: 'Test Post',
      body: 'This is a test post',
      userId: 1,
    });
  });

  it('getPost throws error for non-existent post ID (404)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({ message: 'Post not found' }),
    });

    await expect(getPost(99999)).rejects.toThrow('Post not found');
    expect(mockFetch).toHaveBeenCalledWith('/api/post/99999');
  });

  it('getPost throws error for invalid post ID (400)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: async () => ({ message: 'Invalid post id' }),
    });

    await expect(getPost(-1)).rejects.toThrow('Invalid post id');
    expect(mockFetch).toHaveBeenCalledWith('/api/post/-1');
  });

  it('getPost throws error for server error (500)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({ message: 'Internal server error' }),
    });

    await expect(getPost(1)).rejects.toThrow('Internal server error');
  });

  it('getPost throws error with status text when no error message provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
      json: async () => {
        throw new Error('No JSON body');
      },
    });

    await expect(getPost(1)).rejects.toThrow(
      'HTTP error 503: Service Unavailable',
    );
  });

  // ===== getComments Tests =====

  it('getComments returns comments for valid post ID', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          postId: 1,
          name: 'Test Comment',
          email: 'test@example.com',
          body: 'This is a test comment',
        },
      ],
    });

    const comments = await getComments(1);

    expect(mockFetch).toHaveBeenCalledWith('/api/comments?postId=1');
    expect(comments).toEqual([
      {
        id: 1,
        postId: 1,
        name: 'Test Comment',
        email: 'test@example.com',
        body: 'This is a test comment',
      },
    ]);
  });

  it('getComments throws error for invalid post ID (400)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: async () => ({ message: 'Invalid or missing postId' }),
    });

    await expect(getComments(-1)).rejects.toThrow('Invalid or missing postId');
    expect(mockFetch).toHaveBeenCalledWith('/api/comments?postId=-1');
  });

  it('getComments throws error for server error (500)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({ message: 'Failed to fetch comments' }),
    });

    await expect(getComments(1)).rejects.toThrow('Failed to fetch comments');
  });

  it('getComments returns empty array for post with no comments', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const comments = await getComments(999);
    expect(mockFetch).toHaveBeenCalledWith('/api/comments?postId=999');
    expect(comments).toEqual([]);
  });
});
