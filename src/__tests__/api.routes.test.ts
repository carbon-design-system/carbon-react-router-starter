/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { getPost, getComments } from '../api/message';
import { server } from '../test/server';
import { setupBeforeAll, setupAfterEach, setupAfterAll } from '../test/setup';

// Client API -> MSW -> real route handlers (routes/routes.ts) -> mocked "external" API
beforeAll(() => setupBeforeAll(server));
afterEach(() => setupAfterEach(server));
afterAll(() => setupAfterAll(server));

describe('API routes in tests', () => {
  test('GET /api/post/:id returns the post from the external API', async () => {
    await expect(getPost(1)).resolves.toEqual({
      id: 1,
      title: 'Test post title',
      body: 'Test post body content',
      userId: 1,
    });
  });

  test('GET /api/post/:id rejects an invalid id', async () => {
    await expect(getPost('abc')).resolves.toEqual({ message: 'Invalid post id' });
  });

  test('GET /api/comments returns the comments for a post', async () => {
    const comments = await getComments(2);

    expect(comments).toHaveLength(2);
    expect(comments).toEqual(expect.arrayContaining([expect.objectContaining({ postId: 2 })]));
  });
});
