/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the functions that do async network requests
 */

export const getPost = async ({ params: { id } }, res) => {
  // Validate that id is a positive integer
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ message: 'Invalid post id' });
  }

  try {
    const response = await fetch(
      // TODO: replace with actual endpoint URL
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    // The sample endpoint returns a blogpost
    const blogpost = await response.json();

    // Return the blogpost's title
    res.json(blogpost);
  } catch {
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

export const getComments = async ({ query: { postId } }, res) => {
  try {
    const response = await fetch(
      // TODO: replace with actual endpoint URL
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
    );
    // The sample endpoint returns a blogpost
    const comments = await response.json();

    // Return the blogpost's title
    return res.json(comments);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

export default {
  getComments,
  getPost,
};
