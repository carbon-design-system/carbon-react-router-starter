/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains client-side API functions that call our express.js backend routes
 */

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

export const getPost = async (postId: number): Promise<Post> => {
  try {
    const response = await fetch(`/api/post/${postId}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to load post: ${error}`);
  }
};

export const getComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await fetch(`/api/comments?postId=${postId}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to load comments: ${error}`);
  }
};
