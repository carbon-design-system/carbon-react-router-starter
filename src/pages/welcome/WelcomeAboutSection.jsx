/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useTranslation } from 'react-i18next';
import { WelcomeCallout } from './WelcomeCallout';
import { WelcomeHighlightTile } from './WelcomeHighlightTile';

export const WelcomeAboutSection = () => {
  const { t } = useTranslation();

  const aboutItems = [
    {
      key: 'purpose',
      title: t('welcome.about.purpose.title', 'Purpose'),
      content: t(
        'welcome.about.purpose.description',
        'This repository provides a simple example to help you get started with the Carbon Design System and React. It is designed to save time by offering a pre-configured foundation for your projects.',
      ),
    },
    {
      key: 'consistency',
      title: t('welcome.about.consistency.title', 'Stay consistent'),
      content: t(
        'welcome.about.consistency.description',
        "Use this as a reference to ensure your project aligns with IBM's design standards. It is flexible enough to adapt to your needs while promoting a consistent user experience.",
      ),
    },
    {
      key: 'customize',
      title: t('welcome.about.customize.title', 'Customize as needed'),
      content: t(
        'welcome.about.customize.description',
        'This is meant to be a starting point and a living guide, not a fixed framework. You can modify the repository to fit your project requirements or use it as inspiration for your own approach.',
      ),
    },
  ];

  return (
    <WelcomeCallout
      className="cs--welcome__about"
      heading={t('welcome.about.heading', 'What is this about?')}
    >
      {aboutItems.map((item) => (
        <WelcomeHighlightTile key={item.key} title={item.title}>
          {item.content}
        </WelcomeHighlightTile>
      ))}
    </WelcomeCallout>
  );
};
