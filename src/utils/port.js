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
    // Fallback to preferred port if detection fails
    return preferredPort;
  }
}
