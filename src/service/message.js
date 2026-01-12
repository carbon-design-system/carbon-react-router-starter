/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the functions that do async network requests
 */

/**
 * Express route handler that fetches a sample message from an external API.
 * Currently uses JSONPlaceholder as a demo endpoint.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response with message or error
 *
 * @example
 * app.get('/api/message', getMessage);
 */
export const getMessage = async (req, res) => {
  try {
    const response = await fetch(
      // TODO: replace with actual endpoint URL
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    // The sample endpoint returns a blogpost
    const blogpost = await response.json();

    // Return the blogpost's title
    res.json({ message: blogpost.title });
  } catch {
    res.status(500).json({ message: 'Failed to fetch message' });
  }
};
