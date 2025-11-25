/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Server configuration constants
// Extracted to avoid importing the full server during tests
// Use 5173 for dev (Vite default), 3000 for production
export const port =
  process.env.PORT || (process.env.NODE_ENV === 'production' ? 3000 : 5173);
export const base = process.env.BASE || '/';
export const baseUrl = `http://localhost:${port}`;
