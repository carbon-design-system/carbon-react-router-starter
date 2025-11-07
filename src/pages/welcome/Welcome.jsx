/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  CodeSnippet,
  Column,
  Grid,
  Heading,
  Tile,
  Section,
} from '@carbon/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getMessage } from '../../api/message.js';
import { Footer } from '../../components/footer/Footer';
import { WelcomeHeader } from './WelcomeHeader.jsx';
import { PageLayout } from '../../layouts/page-layout.jsx';

// The styles are imported into index.scss by default.
// Do the same unless you have a good reason not to.
// import './welcome.scss';

const Welcome = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const msg = await getMessage();
        setMessage(msg);
      } catch {
        setMessage(t('welcome.dataFetching.failed', 'Failed to load message'));
      }
    };

    loadMessage();
  }, [t]);

  return (
    <PageLayout
      className="cs--welcome"
      fallback={<p>Loading welcome page...</p>}
    >
      <WelcomeHeader />

      <Section as={Grid}>
        <Column sm={4} md={4} lg={8} xlg={4}>
          <Heading className="cs--welcome__heading">
            {t('welcome.runTemplate', '↳ Run the template')}
          </Heading>
        </Column>
        <Column sm={4} md={8} lg={8} xlg={8}>
          <p>{t('welcome.nodeRequirement', 'This code requires node v.20')}</p>
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
              <Heading className="cs--welcome__heading">
                {t('welcome.whatIsThis', '↳ What is this about?')}
              </Heading>
            </Column>
            {/* While the carbon documentation states that most containers should be
                  sized through the aspect ratios defined in the design language,
                  the practice shows a fixed height often works better. Choose a
                  height that is a multiple of one of the spacing tokens to keep the
                  vertical rhythm */}
            <Column sm={4} md={4} lg={8} xlg={4}>
              <Tile className="cs--welcome__tile cs--welcome__tile--highlight">
                <strong>{t('welcome.purpose.title', 'Purpose')}</strong>
                <br />
                <br />
                {t(
                  'welcome.purpose.description',
                  'This repository provides a simple example to help you get started with the Carbon Design System and React. It is designed to save time by offering a pre-configured foundation for your projects.',
                )}
              </Tile>
            </Column>
            <Column sm={4} md={4} lg={8} xlg={4}>
              <Tile className="cs--welcome__tile cs--welcome__tile--highlight">
                <strong>
                  {t('welcome.consistency.title', 'Stay consistent')}
                </strong>
                <br />
                <br />
                {t(
                  'welcome.consistency.description',
                  "Use this as a reference to ensure your project aligns with IBM's design standards. It is flexible enough to adapt to your needs while promoting a consistent user experience.",
                )}
              </Tile>
            </Column>
            <Column sm={4} md={4} lg={8} xlg={4}>
              <Tile className="cs--welcome__tile cs--welcome__tile--highlight">
                <strong>
                  {t('welcome.customize.title', 'Customize as needed')}
                </strong>
                <br />
                <br />
                {t(
                  'welcome.customize.description',
                  'This is meant to be a starting point and a living guide, not a fixed framework. You can modify the repository to fit your project requirements or use it as inspiration for your own approach.',
                )}
              </Tile>
            </Column>
          </Grid>
        </Column>
        <Column className="cs--welcome__features" sm={4} md={8} lg={16}>
          <Grid>
            <Column sm={2} md={4} lg={4}>
              <Heading className="cs--welcome__heading">
                {t('welcome.features', '↳ Features')}
              </Heading>
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
              <Heading className="cs--welcome__heading">
                {t(
                  'welcome.dataFetching.title',
                  '↳ An example of data fetching',
                )}
              </Heading>
            </Column>
            <Column
              sm={2}
              md={4}
              lg={12}
              className="cs--welcome__dynamic-message"
            >
              <p>
                {t(
                  'welcome.dataFetching.description',
                  'Below is a dynamically fetched message from an external API endpoint. This showcases how to perform data fetching while keeping components clean and separating network logic.',
                )}
              </p>
              <Tile>
                <strong>{t('welcome.dataFetching.message', 'Message:')}</strong>{' '}
                {message || t('welcome.dataFetching.loading', 'Loading...')}
              </Tile>
            </Column>
          </Grid>
        </Column>
        <Footer />
      </Section>
    </PageLayout>
  );
};

export default Welcome;
