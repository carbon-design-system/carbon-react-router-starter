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
import { baseUrl } from '../config/server-config.js';

/**
 * Helper function to get the base URL for API calls.
 *
 * @returns {string} The base URL for the server
 */
const getBaseUrl = () => {
  return baseUrl;
};

/**
 * Express route handler that fetches a blog post by ID.
 * Validates the post ID and calls the external API endpoint.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - Post ID to fetch
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response with post data or error
 *
 * @example
 * app.get('/api/post/:id', getPost);
 */
export const getPost = async (req, res) => {
  const { id } = req.params;

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

/**
 * Express route handler that fetches comments for a specific post.
 * Validates the postId query parameter and calls the external API endpoint.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.postId - Post ID to fetch comments for
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response with comments array or error
 *
 * @example
 * app.get('/api/comments', getComments);
 */
export const getComments = async (req, res) => {
  const { postId } = req.query;

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
