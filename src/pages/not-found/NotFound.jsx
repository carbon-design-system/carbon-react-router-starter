/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useLocation } from 'react-router';
import { PageLayout } from '../../layouts/page-layout';

const NotFound = () => {
  const location = useLocation();

  return (
    <PageLayout
      className="cs--not-found"
      fallback={<p>Loading not found page...</p>}
    >
      <h1>Page was not found.</h1>
      <p>
        Did not find what you were looking for? It's alway nice to help people
        back to safety.
      </p>
      <p>
        Guide the user back to your landing page or provide information based on
        the information they may have been looking for at path they entered "
        {location.pathname}".
      </p>
    </PageLayout>
  );
};

export default NotFound;
