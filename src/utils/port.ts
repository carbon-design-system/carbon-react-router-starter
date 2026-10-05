/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line import-x/no-named-as-default
import detect from 'detect-port';

/**
 * Find an available port, starting from the preferred port.
 * If the preferred port is in use, it will try the next available port.
 *
 * @param preferredPort - The preferred port to use
 * @returns The available port
 * @throws {Error} If port detection fails
 */
export async function findAvailablePort(preferredPort: number): Promise<number> {
  try {
    const availablePort = await detect(preferredPort);

    if (availablePort !== preferredPort) {
      console.warn(`⚠️  Port ${preferredPort} is in use, using port ${availablePort} instead`);
    }

    return availablePort;
  } catch (error) {
    console.error('Error detecting available port:', error);
    // Throw error instead of silently falling back to potentially unavailable port
    throw new Error(`Failed to find available port: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
