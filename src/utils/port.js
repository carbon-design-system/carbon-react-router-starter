/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import detect from 'detect-port';

/**
 * Find an available port, starting from the preferred port.
 * If the preferred port is in use, it will try the next available port.
 *
 * @param {number} preferredPort - The preferred port to use
 * @returns {Promise<number>} The available port
 * @throws {Error} If port detection fails
 */
export async function findAvailablePort(preferredPort) {
  try {
    const availablePort = await detect(preferredPort);

    if (availablePort !== preferredPort) {
      console.warn(
        `⚠️  Port ${preferredPort} is in use, using port ${availablePort} instead`,
      );
    }

    return availablePort;
  } catch (error) {
    console.error('Error detecting available port:', error);
    // Throw error instead of silently falling back to potentially unavailable port
    throw new Error(
      `Failed to find available port: ${error.message || 'Unknown error'}`,
    );
  }
}
