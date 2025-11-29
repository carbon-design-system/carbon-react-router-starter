/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseUrl } from '../../src/config/server-config.js';

/**
 * API route for fetching a single post
 * This is a resource route that returns JSON instead of rendering a component
 *
 * @see https://reactrouter.com/how-to/resource-routes
 */
export async function loader({ params }) {
  const { id } = params;

  // Validate that id is a positive integer
  if (!/^\d+$/.test(id)) {
    return Response.json({ message: 'Invalid post id' }, { status: 400 });
  }

  try {
    // Call the external API endpoint
    const response = await fetch(`${baseUrl}/api/external/post/${id}`);

    if (!response.ok) {
      const error = await response.json();
      return Response.json(error, { status: response.status });
    }

    const blogpost = await response.json();

    // Return the blogpost as JSON
    return Response.json(blogpost);
  } catch (error) {
    console.error('Error fetching post:', error);
    return Response.json({ message: 'Failed to fetch post' }, { status: 500 });
  }
}

// Made with Bob
