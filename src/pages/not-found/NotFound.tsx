/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CommonHeader } from '../../components/commonHeader/CommonHeader';
import { PageLayout } from '../../layouts/page-layout';
import { useLocation } from 'react-router';
import { FC } from 'react';

const NotFound: FC = () => {
  const location = useLocation();

  return (
    <PageLayout
      className="cs--not-found"
      fallback={<p>Loading not found page...</p>}
    >
      <CommonHeader
        title="Page not found"
        paragraphs={[
          'This is not the page you were looking for.',
          <>
            The route <em>&lsquo;{location.pathname}&rsquo;</em> is not
            recognized.
          </>,
          'Maintained by fed-at-ibm, a chapter of the OIC.',
        ]}
      />
    </PageLayout>
  );
};

export default NotFound;
