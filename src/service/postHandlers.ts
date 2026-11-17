/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Request, Response } from 'express';

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
 */
export const setBaseUrl = (url: string): void => {
  serverBaseUrl = url;
};

/**
 * Get the base URL for the server
 */
const getBaseUrl = (): string => {
  return serverBaseUrl;
};

export const getPost = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate that id is a positive integer
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ message: 'Invalid post id' });
    return;
  }

  try {
    // Call our mock "external" API endpoint
    const response = await fetch(`${getBaseUrl()}/api/external/post/${id}`);

    if (!response.ok) {
      const error: unknown = await response.json();
      res.status(response.status).json(error);
      return;
    }

    const blogpost: unknown = await response.json();

    // Return the blogpost
    res.json(blogpost);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

export const getComments = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.query;

  if (typeof postId !== 'string' || !postId) {
    res.status(400).json({ message: 'Missing postId parameter' });
    return;
  }

  try {
    // Call our mock "external" API endpoint
    const response = await fetch(`${getBaseUrl()}/api/external/comments?postId=${postId}`);

    if (!response.ok) {
      const error: unknown = await response.json();
      res.status(response.status).json(error);
      return;
    }

    const comments: unknown = await response.json();

    // Return the comments
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

export default {
  getComments,
  getPost,
};
