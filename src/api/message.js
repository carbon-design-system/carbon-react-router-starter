/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains client-side API functions that call our express.js backend routes
 */

export const getMessage = async () => {
  try {
    const response = await fetch('/api/message');
    const data = await response.json();
    return data.message;
  } catch (error) {
    throw new Error('Failed to load message: ', error);
  }
};
