/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the functions that do async network requests
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
