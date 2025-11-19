/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RenderToPipeableStreamOptions } from 'react-dom/server';
import type { Writable } from 'node:stream';

export interface RenderResult {
  pipe: (destination: Writable) => Writable;
  head: string;
  abort: () => void;
  statusCode: number;
  themeAttr: string;
}

export type RenderFunction = (
  url: string,
  options?: RenderToPipeableStreamOptions,
  cookies?: string,
) => RenderResult;

// Made with Bob
