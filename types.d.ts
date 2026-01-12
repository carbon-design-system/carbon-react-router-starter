/**
 * Global type definitions for JSDoc in JavaScript files.
 * This file provides TypeScript type definitions without requiring TypeScript compilation.
 */

/// <reference types="react" />
/// <reference types="react-dom" />

declare global {
  /**
   * JSX namespace for React components.
   * Allows JSDoc @returns {JSX.Element} without TypeScript errors.
   */
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

export {};
