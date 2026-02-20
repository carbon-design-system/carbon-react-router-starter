/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageLayout } from '../../layouts/page-layout.jsx';
import { NewWelcomeHeader } from './NewWelcomeHeader.jsx';

// The styles are imported into index.scss by default.
// Do the same unless you have a good reason not to.
// import './new-welcome.scss';

const NewWelcome = () => {
  return (
    <PageLayout
      className="cs--new-welcome"
      fallback={<p>Loading new welcome page...</p>}
    >
      <PageLayout.Header>
        <NewWelcomeHeader />
      </PageLayout.Header>
    </PageLayout>
  );
};

export default NewWelcome;
