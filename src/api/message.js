/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains client-side API functions that call our express.js backend routes
 */

export const getPost = async (postId) => {
  try {
    // TODO: handle production and development environments
    const response = await fetch(`http://localhost:5173/api/post/${postId}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to load post: ', error);
  }
};

export const getComments = async (postId) => {
  try {
    // TODO: handle production and development environments
    const response = await fetch(
      `http://localhost:5173/api/comments?postId=${postId}`,
    );
    return await response.json();
  } catch (error) {
    throw new Error('Failed to load comments: ', error);
  }
};
