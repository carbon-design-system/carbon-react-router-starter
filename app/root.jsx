/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router';
import { GlobalTheme, Theme } from '@carbon/react';
import { ThemeProvider, useThemeContext } from '../src/context/ThemeContext';

// Import global styles
import '../src/index.scss';

/**
 * Root layout component that wraps the entire application.
 * Provides document structure, theme management, and error boundaries.
 *
 * @see https://reactrouter.com/start/framework/routing#root-layout
 */
export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Theme wrapper component that applies Carbon Design System themes.
 * Uses the ThemeContext to determine which theme to apply.
 * Always renders to ensure client-side navigation works correctly.
 * Theme updates happen after localStorage is loaded to prevent flash.
 */
function ThemedApp() {
  const { themeMenu } = useThemeContext();

  return (
    <GlobalTheme theme={themeMenu}>
      <Theme theme={themeMenu}>
        <Outlet />
      </Theme>
    </GlobalTheme>
  );
}

/**
 * Root component that provides theme context to the entire application.
 * This is the entry point for all routes.
 *
 * @see https://reactrouter.com/start/framework/routing#root-route
 */
export default function Root() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

/**
 * Error boundary for the root route.
 * Handles both route errors and unexpected errors.
 *
 * @see https://reactrouter.com/start/framework/route-module#errorboundary
 */
export function ErrorBoundary({ error }) {
  let errorMessage = 'An unexpected error occurred';
  let errorDetails = null;

  if (isRouteErrorResponse(error)) {
    // Handle route-specific errors (404, etc.)
    errorMessage = `${error.status} ${error.statusText}`;
    errorDetails = error.data;
  } else if (error instanceof Error) {
    // Handle JavaScript errors
    errorMessage = error.message;
    errorDetails = error.stack;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Error - Carbon React Router</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ color: '#da1e28' }}>Application Error</h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>
            {errorMessage}
          </p>
          {errorDetails && (
            <details style={{ marginTop: '2rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Error Details
              </summary>
              <pre
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f4f4f4',
                  borderRadius: '4px',
                  overflow: 'auto',
                }}
              >
                {typeof errorDetails === 'string'
                  ? errorDetails
                  : JSON.stringify(errorDetails, null, 2)}
              </pre>
            </details>
          )}
        </div>
        <Scripts />
      </body>
    </html>
  );
}

// Made with Bob
