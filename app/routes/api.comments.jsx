/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseUrl } from '../../src/config/server-config.js';

/**
 * API route for fetching comments for a post
 * This is a resource route that returns JSON instead of rendering a component
 *
 * @see https://reactrouter.com/how-to/resource-routes
 */
export async function loader({ request }) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');

  if (!postId) {
    return Response.json(
      { message: 'Missing postId parameter' },
      { status: 400 },
    );
  }

  try {
    // Call the external API endpoint
    const response = await fetch(
      `${baseUrl}/api/external/comments?postId=${postId}`,
    );

    if (!response.ok) {
      const error = await response.json();
      return Response.json(error, { status: response.status });
    }

    const comments = await response.json();

    // Return the comments as JSON
    return Response.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return Response.json(
      { message: 'Failed to fetch comments' },
      { status: 500 },
    );
  }
}

// Made with Bob
