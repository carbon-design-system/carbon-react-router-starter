/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { findAvailablePort } from '../utils/port.ts';

// Server configuration constants
// Extracted to avoid importing the full server during tests
export const preferredPort: number = Number(process.env['PORT']) || 5173;
export const base: string = process.env['BASE'] ?? '/';

// For backward compatibility with tests and synchronous code
// These will use the preferred port, not the actual port if it changes
export const port = preferredPort;
export const baseUrl = `http://localhost:${port}`;

export interface ServerConfig {
  port: number;
  baseUrl: string;
}

/**
 * Get an available port for the server.
 * If the preferred port is in use, it will find the next available port.
 *
 * @returns The available port and base URL
 * @throws {Error} If no available port can be found
 */
export async function getServerConfig(): Promise<ServerConfig> {
  try {
    const actualPort = await findAvailablePort(preferredPort);
    const actualBaseUrl = `http://localhost:${actualPort}`;
    return { port: actualPort, baseUrl: actualBaseUrl };
  } catch (error) {
    console.error('Failed to get server configuration:', error);
    throw new Error(
      `Unable to start server: ${error instanceof Error ? error.message : String(error)}. Please check if ports are available.`,
    );
  }
}
