/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Server configuration constants
// Extracted to avoid importing the full server during tests
export const port: number = Number(process.env.PORT) || 5173;
export const base: string = process.env.BASE || '/';
export const baseUrl: string = `http://localhost:${port}`;

// Made with Bob
