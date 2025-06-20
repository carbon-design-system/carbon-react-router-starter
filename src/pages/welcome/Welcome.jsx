/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CodeSnippet, Column, Grid, Tile } from '@carbon/react';
import { useEffect, useState } from 'react';

import { getMessage } from '../../api/message.js';
import { Footer } from '../../components/footer/Footer';
import { WelcomeHeader } from '../../components/welcomeHeader/WelcomeHeader';
import { PageLayout } from '../../layouts/page-layout.jsx';

// The styles are imported into index.scss by default.
// Do the same unless you have a good reason not to.
// import './welcome.scss';

const Welcome = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const msg = await getMessage();
        setMessage(msg);
      } catch {
        setMessage('Failed to load message');
      }
    };

    loadMessage();
  }, []);

  return (
    <PageLayout
      className="cs--welcome"
      fallback={<p>Loading welcome page...</p>}
    >
      <WelcomeHeader />
      <Grid>
        <Column sm={4} md={4} lg={8} xlg={4}>
          <h3 className="cs--welcome__heading">↳ Run the template</h3>
        </Column>
        <Column sm={4} md={8} lg={8} xlg={8}>
          <p>This code requires node v.20</p>
          <CodeSnippet type="single" feedback="Copied to clipboard">
            npm i
          </CodeSnippet>
          <CodeSnippet type="single" feedback="Copied to clipboard">
            npm run dev
          </CodeSnippet>
        </Column>

        <Column className="cs--welcome__about" sm={4} md={8} lg={16}>
          <Grid>
            <Column sm={4} md={4} lg={8} xlg={4}>
              <h3 className="cs--welcome__heading">↳ What is this about?</h3>
            </Column>
            {/* While the carbon documentation states that most containers should be
                  sized through the aspect ratios defined in the design language,
                  the practice shows a fixed height often works better. Choose a
                  height that is a multiple of one of the spacing tokens to keep the
                  vertical rhythm */}
            <Column sm={4} md={4} lg={8} xlg={4}>
              <Tile className="cs--welcome__tile cs--welcome__tile--highlight">
                <strong>Purpose</strong>
                <br />
                <br />
                This repository provides a simple example to help you get
                started with the Carbon Design System and React.
                <br />
                <br />
                It is designed to save time by offering a pre-configured
                foundation for your projects.
              </Tile>
            </Column>
            <Column sm={4} md={4} lg={8} xlg={4}>
              <Tile className="cs--welcome__tile cs--welcome__tile--highlight">
                <strong>Stay consistent</strong>
                <br />
                <br />
                Use this as a reference to ensure your project aligns with
                IBM&apos;s design standards.
                <br />
                <br />
                It is flexible enough to adapt to your needs while promoting a
                consistent user experience.
              </Tile>
            </Column>
            <Column sm={4} md={4} lg={8} xlg={4}>
              <Tile className="cs--welcome__tile cs--welcome__tile--highlight">
                <strong>Customize as needed</strong>
                <br />
                <br />
                This is meant to be a starting point and a living guide, not a
                fixed framework.
                <br />
                <br />
                You can modify the repository to fit your project requirements
                or use it as inspiration for your own approach.
              </Tile>
            </Column>
          </Grid>
        </Column>
        <Column className="cs--welcome__features" sm={4} md={8} lg={16}>
          <Grid>
            <Column sm={2} md={4} lg={4}>
              <h3 className="cs--welcome__heading">↳ Features</h3>
            </Column>
            <Column className="cs--welcome__tile" sm={2} md={4} lg={4}>
              <Tile title="Flexibility">
                <strong>React 19</strong>
              </Tile>
            </Column>
            <Column className="cs--welcome__tile" sm={2} md={4} lg={4}>
              <Tile title="Feature 2">
                <strong>Carbon Design v11</strong>
              </Tile>
            </Column>
            <Column className="cs--welcome__tile" sm={2} md={4} lg={4}>
              <Tile title="Feature 3">
                <strong>Vite 6.0</strong>
              </Tile>
            </Column>
          </Grid>
        </Column>
        <Column
          className="cs--welcome__fetching"
          lg={{ span: 16 }}
          md={{ span: 8 }}
          sm={4}
        >
          <Grid>
            <Column sm={2} md={4} lg={4}>
              <h3 className="cs--welcome__heading">
                ↳ An example of data fetching
              </h3>
            </Column>
            <Column
              sm={2}
              md={4}
              lg={12}
              className="cs--welcome__dynamic-message"
            >
              <p>
                Below is a dynamically fetched message from an external API
                endpoint. This showcases how to perform data fetching while
                keeping components clean and separating network logic.
              </p>
              <Tile>
                <strong>Message:</strong> {message || 'Loading...'}
              </Tile>
            </Column>
          </Grid>
        </Column>
        <Footer />
      </Grid>
    </PageLayout>
  );
};

export default Welcome;
