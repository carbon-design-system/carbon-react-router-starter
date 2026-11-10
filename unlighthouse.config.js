/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineUnlighthouseConfig } from 'unlighthouse/config';

export default defineUnlighthouseConfig({
  urls: ['/', '/dashboard'],
  scanner: {
    device: 'desktop',
  },
});
