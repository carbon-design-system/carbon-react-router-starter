/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the functions that do async network requests
 * These handlers call our "external" API routes to simulate API-to-API communication
 */

/**
 * Get the base URL for the server
 * In production, this would be configured via environment variables
 */
import { base, port } from '../config/server-config.js';

const getBaseUrl = () => {
  return `${base}:${port}`;
};

export const getPost = async ({ params: { id } }, res) => {
  // Validate that id is a positive integer
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: 'Invalid post id' });
  }

  try {
    // Call our mock "external" API endpoint
    const response = await fetch(`${getBaseUrl()}/api/external/post/${id}`);

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const blogpost = await response.json();

    // Return the blogpost
    res.json(blogpost);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

export const getComments = async ({ query: { postId } }, res) => {
  if (!postId) {
    return res.status(400).json({ message: 'Missing postId parameter' });
  }

  try {
    // Call our mock "external" API endpoint
    const response = await fetch(
      `${getBaseUrl()}/api/external/comments?postId=${postId}`,
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const comments = await response.json();

    // Return the comments
    return res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

export default {
  getComments,
  getPost,
};
