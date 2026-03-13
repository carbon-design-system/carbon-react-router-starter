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

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <PageLayout
      className="cs--not-found"
      fallback={<p>{t('notFound.loading', 'Loading not found page...')}</p>}
    >
      <CommonHeader
        title={t('notFound.title', 'Page not found')}
        paragraphs={[
          <>
            {t(
              'notFound.description',
              'This is not the page you were looking for.',
            )}
          </>,
          <>
            {t(
              'notFound.routeNotRecognized',
              "The route '{{pathname}}' is not recognized.",
              { pathname: location.pathname },
            )}
          </>,
          <>
            {t(
              'notFound.maintainer',
              'Maintained by fed-at-ibm, a chapter of the OIC.',
            )}
          </>,
        ]}
      />
    </PageLayout>
  );
};

export default NotFound;
