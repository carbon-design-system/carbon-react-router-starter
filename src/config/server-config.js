/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Server configuration constants
// Extracted to avoid importing the full server during tests
export const port = process.env.PORT || 5173;
export const base = process.env.BASE || '/';
export const baseUrl = `http://localhost:${port}`;
