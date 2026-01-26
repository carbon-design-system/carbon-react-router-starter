/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RenderToPipeableStreamOptions } from 'react-dom/server';
import type { Writable } from 'node:stream';

/**
 * Result object returned by the server-side render function.
 * Contains the rendered React stream and metadata needed for the HTTP response.
 */
export interface RenderResult {
  /** Pipeable stream that writes the rendered React content to the destination */
  pipe: (destination: Writable) => Writable;
  /** HTML string to inject into the document head (meta tags, etc.) */
  head: string;
  /** Function to abort the rendering stream if needed */
  abort: () => void;
  /** HTTP status code for the response (e.g., 200, 404, 500) */
  statusCode: number;
  /** HTML attributes string for theme settings (data-theme-setting, data-header-inverse) */
  themeAttr: string;
}

/**
 * Server-side render function signature.
 * Takes a URL and optional configuration, returns a RenderResult for streaming to the client.
 */
export type RenderFunction = (
  /** URL path to render (e.g., "/dashboard", "/users/123") */
  url: string,
  /** React DOM streaming options (onShellReady, onError, etc.) */
  options?: RenderToPipeableStreamOptions,
  /** Cookie string from the HTTP request for theme/settings extraction */
  cookies?: string,
) => RenderResult;
