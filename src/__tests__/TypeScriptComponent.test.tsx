/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FC } from 'react';

/**
 * TypeScript React Component Integration Tests
 *
 * Verifies that TypeScript React components (.tsx) compile and render correctly.
 */

interface TestComponentProps {
  title: string;
  count: number;
}

const TestComponent: FC<TestComponentProps> = ({ title, count }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p data-testid="count">Count: {count}</p>
    </div>
  );
};

describe('TypeScript React Component Integration', () => {
  it('should compile, enforce prop types at compile time and render TSX components', () => {
    render(<TestComponent title="Test Title" count={100} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 100');
  });
});
