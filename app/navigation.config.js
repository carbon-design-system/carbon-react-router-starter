/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MagicWand, LogoGithub } from '@carbon/icons-react';

/**
 * Navigation configuration for Carbon UI Shell components.
 * This config is separate from routing to allow independent management
 * of navigation structure and route definitions.
 */

/**
 * Header navigation items
 * These appear in the top navigation bar
 */
export const headerNavigation = [
  {
    path: '/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/link-1',
    label: 'Link 1',
  },
  {
    path: '/link-2',
    label: 'Link 2',
  },
  {
    path: '/link-3',
    label: 'Link 3',
  },
  {
    path: '/link-4',
    label: 'Link 4',
    subMenu: [
      {
        path: '/link-4/sub-link-1',
        label: 'Sub-link 1',
      },
      {
        path: '/link-4/sub-link-2',
        label: 'Sub-link 2',
      },
      {
        path: '/link-4/sub-link-3',
        label: 'Sub-link 3',
      },
    ],
  },
];

/**
 * Side navigation items
 * These appear in the side panel navigation
 */
export const sideNavigation = [
  {
    path: '/getting-started',
    label: 'Getting Started',
    icon: MagicWand,
    href: 'https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#get-started',
    subMenu: [
      {
        path: '/getting-started/how',
        label: 'How does this work',
        href: 'https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#how-does-this-work',
      },
      {
        path: '/getting-started/up-to-date',
        label: 'Keeping this up to date',
        href: 'https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#keeping-this-up-to-date',
      },
      {
        path: '/getting-started/report',
        label: 'Report problems',
        href: 'https://github.com/carbon-design-system/carbon-react-router-starter?tab=readme-ov-file#report-problems',
      },
    ],
  },
  {
    path: '/github',
    label: 'GitHub',
    icon: LogoGithub,
    href: 'https://github.com/carbon-design-system/carbon-react-router-starter',
  },
];

/**
 * Helper function to get all navigation items (header + side)
 */
export const getAllNavigationItems = () => {
  return [...headerNavigation, ...sideNavigation];
};

/**
 * Helper function to find a navigation item by path
 */
export const findNavigationItem = (path) => {
  const allItems = getAllNavigationItems();

  for (const item of allItems) {
    if (item.path === path) {
      return item;
    }
    if (item.subMenu) {
      const subItem = item.subMenu.find((sub) => sub.path === path);
      if (subItem) {
        return subItem;
      }
    }
  }

  return null;
};

// Made with Bob
