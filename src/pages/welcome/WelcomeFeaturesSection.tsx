/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WelcomeCallout } from './WelcomeCallout';
import { WelcomeFeatureTile } from './WelcomeFeatureTile';
import { FC } from 'react';

interface Feature {
  title: string;
  feature: string;
}

const features: Feature[] = [
  { title: 'Flexibility', feature: 'React 19' },
  { title: 'Feature 2', feature: 'Carbon Design v11' },
  { title: 'Feature 3', feature: 'Vite 6.0' },
];

export const WelcomeFeaturesSection: FC = () => {
  return (
    <WelcomeCallout className="cs--welcome__features" heading="Features">
      {features.map((item) => (
        <WelcomeFeatureTile key={item.feature} {...item} />
      ))}
    </WelcomeCallout>
  );
};

// Made with Bob
