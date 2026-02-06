/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains mock "external" API handlers that simulate external services.
 * These are called by the main API handlers to demonstrate API-to-API communication.
 * Just for demonstration purposes.
 * You can remove/replace these with actual external API handlers in your actual application.
 */

import { Request, Response } from 'express';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// Mock database for posts
const mockPosts: Record<number, Post> = {
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

// Mock database for comments
const mockComments: Record<number, Comment[]> = {
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

/**
 * Mock external API handler for fetching a single post
 * Simulates an external service response
 */
export const getExternalPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  // Validate that id is a positive integer
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ message: 'Invalid post id' });
    return;
  }

  // Simulated network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  const post = mockPosts[parseInt(id, 10)];

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  res.json(post);
};

/**
 * Mock external API handler for fetching comments for a post
 * Simulates an external service response
 */
export const getExternalComments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { postId } = req.query;

  // Validate that postId is provided and is a positive integer
  if (!postId || typeof postId !== 'string' || !/^\d+$/.test(postId)) {
    res.status(400).json({ message: 'Invalid or missing postId' });
    return;
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const comments = mockComments[parseInt(postId, 10)] || [];

  res.json(comments);
};

export default {
  getExternalComments,
  getExternalPost,
};
