/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains client-side API functions that call our express.js backend routes
 */

/**
 * Fetches a blog post by ID from the backend API.
 *
 * @param {string|number} postId - The ID of the post to fetch
 * @returns {Promise<Object>} Promise resolving to the post data
 * @throws {Error} If the fetch request fails
 *
 * @example
 * const post = await getPost(1);
 * console.log(post.title);
 */
export const getPost = async (postId) => {
  try {
    const response = await fetch(`/api/post/${postId}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to load post: ', error);
  }
};

/**
 * Fetches comments for a specific post from the backend API.
 *
 * @param {string|number} postId - The ID of the post to fetch comments for
 * @returns {Promise<Array>} Promise resolving to array of comment objects
 * @throws {Error} If the fetch request fails
 *
 * @example
 * const comments = await getComments(1);
 * console.log(comments.length);
 */
export const getComments = async (postId) => {
  try {
    const response = await fetch(`/api/comments?postId=${postId}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to load comments: ', error);
  }
};
