/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Mock external API route for fetching a single post
 * This simulates an external service response
 *
 * @see https://reactrouter.com/how-to/resource-routes
 */

// Mock database for posts
const mockPosts = {
  1: {
    id: 1,
    title: 'What is Carbon?',
    body: `
      This is just a sample post. Carbon is IBM's open source design system for products and digital experiences. 
      With the IBM Design Language as its foundation, the system consists of working code, design tools and resources, 
      human interface guidelines, and a vibrant community of contributors.`,
    userId: 1,
  },
  2: {
    id: 2,
    title: 'Getting started with React router',
    body: 'This is just a sample post. React Router is a standard library for routing in React applications.',
    userId: 1,
  },
  3: {
    id: 3,
    title: 'Building modern web applications',
    body: 'This is just a sample post. Modern web development requires understanding of various tools and frameworks.',
    userId: 2,
  },
};

export async function loader({ params }) {
  const { id } = params;

  // Validate that id is a positive integer
  if (!/^\d+$/.test(id)) {
    return Response.json({ message: 'Invalid post id' }, { status: 400 });
  }

  // Simulated network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const post = mockPosts[id];

  if (!post) {
    return Response.json({ message: 'Post not found' }, { status: 404 });
  }

  return Response.json(post);
}

// Made with Bob
