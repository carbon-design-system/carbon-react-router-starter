/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WelcomeCallout } from './WelcomeCallout';
import { WelcomeHighlightTile } from './WelcomeHighlightTile';

const aboutItems = [
  {
    title: 'Purpose',
    content: (
      <>
        This repository provides a simple example to help you get started with
        the Carbon Design System and React.
        <br />
        <br />
        It is designed to save time by offering a pre-configured foundation for
        your projects.
      </>
    ),
  },
  {
    title: 'Stay consistent',
    content: (
      <>
        Use this as a reference to ensure your project aligns with IBM's design
        standards.
        <br />
        <br />
        It is flexible enough to adapt to your needs while promoting a
        consistent user experience.
      </>
    ),
  },
  {
    title: 'Customize as needed',
    content: (
      <>
        This is meant to be a starting point and a living guide, not a fixed
        framework.
        <br />
        <br />
        You can modify the repository to fit your project requirements or use it
        as inspiration for your own approach.
      </>
    ),
  },
];

export const WelcomeAboutSection = () => {
  return (
    <WelcomeCallout
      className="cs--welcome__about"
      heading="What is this about?"
    >
      {aboutItems.map((item) => (
        <WelcomeHighlightTile key={item.title} title={item.title}>
          {item.content}
        </WelcomeHighlightTile>
      ))}
    </WelcomeCallout>
  );
};

// Made with Bob
