/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Column as="footer" sm={4} md={8} lg={8} className="cs--footer">
      <AspectRatio ratio="16x9">
        <p>{t('footer.title', 'Footer')}</p>
        <p>{t('footer.copyright', 'Copyright IBM 2025')}</p>
      </AspectRatio>
    </Column>
  );
};
