/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CommonHeader } from '../../components/commonHeader/CommonHeader';
import { PageLayout } from '../../layouts/page-layout';

import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

const Placeholder = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <PageLayout
      className="cs--placeholder"
      fallback={
        <p>{t('placeholder.loading', 'Loading placeholder page...')}</p>
      }
    >
      <CommonHeader
        title={t('placeholder.title', 'This page is not ready yet')}
        paragraphs={[
          <>
            {t(
              'placeholder.description1',
              'Generally not a good idea to have pages under construction.',
            )}
          </>,
          <>
            {t(
              'placeholder.description2',
              'This page is here to help demonstrate the global navigation.',
            )}
          </>,
          <>
            {t(
              'placeholder.routeInfo',
              "You are at the location served from route '{{pathname}}'.",
              { pathname: location.pathname },
            )}
          </>,
          <>
            {t(
              'placeholder.maintainer',
              'Maintained by fed-at-ibm, a chapter of the OIC.',
            )}
          </>,
        ]}
      />
    </PageLayout>
  );
};

export default Placeholder;
