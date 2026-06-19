/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Footer } from '../../components/footer/Footer';
import { WelcomeHeader } from './WelcomeHeader.jsx';
import { PageLayout } from '../../layouts/page-layout.jsx';
import { WelcomeRunSection } from './WelcomeRunSection';
import { WelcomeAboutSection } from './WelcomeAboutSection';
import { WelcomeFeaturesSection } from './WelcomeFeaturesSection';
import { WelcomeFetchingSection } from './WelcomeFetchingSection';

// The styles are imported into index.scss by default.
// Do the same unless you have a good reason not to.
// import './welcome.scss';

const Welcome = () => {
  return (
    <PageLayout
      className="cs--welcome"
      fallback={<p>Loading welcome page...</p>}
    >
      <WelcomeHeader />

      <WelcomeRunSection />

      <WelcomeAboutSection />

      <WelcomeFeaturesSection />

      <WelcomeFetchingSection />

      <Footer />
    </PageLayout>
  );
};

export default Welcome;
