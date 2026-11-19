/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useTranslation } from 'react-i18next';
import type { CarbonRouteType } from '../../routes/config';

/** Returns a function that resolves a route's translated label, falling back to its default label. */
export const useRouteLabel = () => {
  const { t } = useTranslation();
  return ({ labelKey, label }: CarbonRouteType): string => (labelKey ? t(labelKey, label) : label);
};
