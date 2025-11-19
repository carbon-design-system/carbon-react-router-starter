/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ComponentType } from 'react';

export interface CarbonRoute {
  virtualPath?: string;
  label: string;
  inHeader?: boolean;
  inSideNav?: boolean;
  separator?: boolean;
  icon?: ComponentType;
  subMenu?: RouteConfig[];
  inSubMenu?: boolean;
  href?: string;
}

export interface RouteConfig {
  path?: string;
  index?: boolean;
  element?: ComponentType;
  status?: number;
  carbon?: CarbonRoute;
}

export type RouteConfigArray = RouteConfig[];

// Made with Bob
