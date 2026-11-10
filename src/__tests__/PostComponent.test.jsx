/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostComponent from '../pages/welcome/post/PostComponent';

vi.mock('../api/message.js', () => ({
  getPost: vi.fn(),
  getComments: vi.fn(),
}));

import { getPost, getComments } from '../api/message.js';

const mockPost = { id: 1, title: 'Test post title', body: 'Test post body content' };
const mockComments = [
  { id: 1, postId: 1, email: 'test1@example.com', body: 'Test comment 1 body' },
  { id: 2, postId: 1, email: 'test2@example.com', body: 'Test comment 2 body' },
];

beforeEach(() => {
  vi.clearAllMocks();
  getPost.mockResolvedValue(mockPost);
  getComments.mockResolvedValue(mockComments);
});

describe('PostComponent', () => {
  test('shows loading state before data arrives', () => {
    // Return a promise that never resolves so we can observe the initial state
    getPost.mockReturnValue(new Promise(() => {}));
    getComments.mockReturnValue(new Promise(() => {}));

    render(<PostComponent postId={1} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders the post title and body on successful load', async () => {
    render(<PostComponent postId={1} />);

    expect(await screen.findByText('Test post title')).toBeInTheDocument();
    expect(screen.getByText('Test post body content')).toBeInTheDocument();
  });

  test('renders comments on successful load', async () => {
    render(<PostComponent postId={1} />);

    expect(await screen.findByText('From test1@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test comment 1 body')).toBeInTheDocument();
    expect(screen.getByText('From test2@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test comment 2 body')).toBeInTheDocument();
  });

  test('keeps loading state when post fetch fails', async () => {
    getPost.mockRejectedValue(new Error('Network error'));

    render(<PostComponent postId={1} />);

    // post is set to the string 'Failed to load message' on error, but post?.title
    // is undefined so the heading falls back to 'Loading...'
    await screen.findByText('Loading...');
    expect(screen.queryByText('Test post title')).not.toBeInTheDocument();
  });

  test('renders no comments when comments fetch fails', async () => {
    getComments.mockRejectedValue(new Error('Network error'));

    render(<PostComponent postId={1} />);

    await screen.findByText('Test post title');
    expect(screen.queryByText(/From /)).not.toBeInTheDocument();
  });

  test('fetches using the provided postId prop', async () => {
    render(<PostComponent postId={7} />);

    await screen.findByText('Test post title');

    expect(getPost).toHaveBeenCalledWith(7);
    expect(getComments).toHaveBeenCalledWith(7);
  });

  test('re-fetches when postId prop changes', async () => {
    const { rerender } = render(<PostComponent postId={1} />);
    await screen.findByText('Test post title');

    rerender(<PostComponent postId={2} />);
    await screen.findByText('Test post title');

    expect(getPost).toHaveBeenCalledTimes(2);
    expect(getPost).toHaveBeenLastCalledWith(2);
  });
});
