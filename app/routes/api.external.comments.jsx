/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Mock external API route for fetching comments for a post
 * This simulates an external service response
 *
 * @see https://reactrouter.com/how-to/resource-routes
 */

// Mock database for comments
const mockComments = {
  1: [
    {
      id: 1,
      postId: 1,
      name: 'Great introduction!',
      email: 'user1@example.com',
      body: 'This is a really helpful overview of Carbon.',
    },
    {
      id: 2,
      postId: 1,
      name: 'Thanks for sharing',
      email: 'user2@example.com',
      body: 'Looking forward to learning more about Carbon.',
    },
  ],
  2: [
    {
      id: 3,
      postId: 2,
      name: 'Router questions',
      email: 'user3@example.com',
      body: 'How does this compare to other routing libraries?',
    },
  ],
  3: [
    {
      id: 4,
      postId: 3,
      name: 'Excellent article',
      email: 'user4@example.com',
      body: 'Very comprehensive guide to modern web development.',
    },
  ],
};

export async function loader({ request }) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');

  // Validate that postId is provided and is a positive integer
  if (!postId || !/^\d+$/.test(postId)) {
    return Response.json(
      { message: 'Invalid or missing postId' },
      { status: 400 },
    );
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const comments = mockComments[postId] || [];

  return Response.json(comments);
}

// Made with Bob
