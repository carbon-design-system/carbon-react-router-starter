/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Stack, UnorderedList, ListItem } from '@carbon/react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { WelcomeCallout } from './WelcomeCallout';
import PostComponent from './post/PostComponent';

export const WelcomeFetchingSection = () => {
  const { t } = useTranslation();

  return (
    <WelcomeCallout
      className="cs--welcome__fetching"
      heading={t('welcome.fetching.heading', 'An example of data fetching')}
    >
      <Column sm={4} md={4} lg={12} className="cs--welcome__dynamic-message">
        <Stack gap={3}>
          <p>
            {t(
              'welcome.fetching.intro',
              'Below is a dynamically fetched message from an external API endpoint. This showcases how to perform data fetching while keeping components clean and separating network logic. Here is how it works:',
            )}
          </p>
          <UnorderedList>
            <ListItem>
              <strong>{t('welcome.fetching.uiLayer', 'UI layer')}</strong> -{' '}
              {t(
                'welcome.fetching.uiLayerDesc',
                'PostComponent.jsx manages React state and renders the data using Carbon Design components',
              )}
            </ListItem>
            <ListItem>
              <strong>{t('welcome.fetching.apiLayer', 'API layer')}</strong> -{' '}
              {t(
                'welcome.fetching.apiLayerDesc',
                'Client-side functions in api/message.js handle HTTP requests to our Express backend',
              )}
            </ListItem>
            <ListItem>
              <strong>
                {t('welcome.fetching.serviceLayer', 'Service layer')}
              </strong>{' '}
              -{' '}
              {t(
                'welcome.fetching.serviceLayerDesc',
                'Server-side handlers in service/postHandlers.js proxy requests to external APIs.',
              )}
            </ListItem>
          </UnorderedList>
          <p>
            {t(
              'welcome.fetching.summary',
              'This pattern keeps your components focused on presentation while centralizing data fetching logic for reusability and testability.',
            )}
          </p>
        </Stack>
      </Column>
      <Column
        sm={4}
        md={8}
        lg={12}
        xlg={{
          span: 12,
          offset: 4,
        }}
        className="cs--welcome__dynamic-message"
      >
        <Suspense>
          <PostComponent postId={1} />
        </Suspense>
      </Column>
    </WelcomeCallout>
  );
};
