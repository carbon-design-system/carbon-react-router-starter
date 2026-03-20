/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the functions that do async network requests
 * These handlers call our "external" API routes to simulate API-to-API communication
 */

/**
 * Store the base URL for the server
 * This is set when the server starts and the actual port is determined
 */
let serverBaseUrl = 'http://localhost:5173'; // Default fallback

/**
 * Set the base URL for the server
 * @param {string} url - The base URL to use
 */
export const setBaseUrl = (url) => {
  serverBaseUrl = url;
};

/**
 * Get the base URL for the server
 */
const getBaseUrl = () => {
  return serverBaseUrl;
};

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
