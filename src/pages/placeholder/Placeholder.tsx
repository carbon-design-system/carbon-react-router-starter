/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CommonHeader } from '../../components/commonHeader/CommonHeader';
import { PageLayout } from '../../layouts/page-layout';
import { useLocation } from 'react-router';

const Placeholder = () => {
  const location = useLocation();

  return (
    <PageLayout
      className="cs--placeholder"
      fallback={<p>Loading placeholder page...</p>}
    >
      <CommonHeader
        title="This page is not ready yet"
        paragraphs={[
          'Generally not a good idea to have pages under construction.',
          'This page is here to help demonstrate the global navigation.',
          <>
            You are at the location served from route{' '}
            <em>&lsquo;{location.pathname}&rsquo;</em>.
          </>,
          'Maintained by fed-at-ibm, a chapter of the OIC.',
        ]}
      />
    </PageLayout>
  );
};

export default Placeholder;
