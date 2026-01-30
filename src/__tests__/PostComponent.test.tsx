/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PostComponent from '../pages/welcome/post/PostComponent';
import * as messageApi from '../api/message';

// Mock the API module
vi.mock('../api/message');

describe('PostComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders post and comments successfully', async () => {
    // Mock successful API responses
    vi.mocked(messageApi.getPost).mockResolvedValueOnce({
      id: 1,
      title: 'Test Post Title',
      body: 'Test post body content',
      userId: 1,
    });

    vi.mocked(messageApi.getComments).mockResolvedValueOnce([
      {
        id: 1,
        postId: 1,
        name: 'Test Commenter',
        email: 'test@example.com',
        body: 'Test comment body',
      },
    ]);

    render(<PostComponent postId={1} />);

    // Wait for post to load
    await waitFor(() => {
      expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    });

    expect(screen.getByText('Test post body content')).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText('From test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test comment body')).toBeInTheDocument();
  });

  it('displays error notification when post fails to load (404)', async () => {
    // Mock API error
    vi.mocked(messageApi.getPost).mockRejectedValueOnce(
      new Error('Post not found'),
    );

    vi.mocked(messageApi.getComments).mockResolvedValueOnce([]);

    render(<PostComponent postId={99999} />);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText('Error loading post')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Failed to load post: Post not found'),
    ).toBeInTheDocument();

    // Post content should not be visible
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('displays error notification when post fails to load (500)', async () => {
    // Mock API error
    vi.mocked(messageApi.getPost).mockRejectedValueOnce(
      new Error('Internal server error'),
    );

    vi.mocked(messageApi.getComments).mockResolvedValueOnce([]);

    render(<PostComponent postId={1} />);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText('Error loading post')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Failed to load post: Internal server error'),
    ).toBeInTheDocument();
  });

  it('displays error notification for invalid post ID (400)', async () => {
    // Mock API error
    vi.mocked(messageApi.getPost).mockRejectedValueOnce(
      new Error('Invalid post id'),
    );

    vi.mocked(messageApi.getComments).mockResolvedValueOnce([]);

    render(<PostComponent postId={-1} />);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText('Error loading post')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Failed to load post: Invalid post id'),
    ).toBeInTheDocument();
  });

  it('renders post even when comments fail to load', async () => {
    // Mock successful post but failed comments
    vi.mocked(messageApi.getPost).mockResolvedValueOnce({
      id: 1,
      title: 'Test Post Title',
      body: 'Test post body content',
      userId: 1,
    });

    vi.mocked(messageApi.getComments).mockRejectedValueOnce(
      new Error('Failed to fetch comments'),
    );

    // Spy on console.error to verify it's called
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<PostComponent postId={1} />);

    // Wait for post to load
    await waitFor(() => {
      expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    });

    // Post should still be visible
    expect(screen.getByText('Test post body content')).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();

    // Error should be logged to console
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to load comments:',
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });

  it('renders with default postId of 1 when not provided', async () => {
    vi.mocked(messageApi.getPost).mockResolvedValueOnce({
      id: 1,
      title: 'Default Post',
      body: 'Default post body',
      userId: 1,
    });

    vi.mocked(messageApi.getComments).mockResolvedValueOnce([]);

    render(<PostComponent />);

    // Verify getPost was called with default ID of 1
    await waitFor(() => {
      expect(messageApi.getPost).toHaveBeenCalledWith(1);
    });

    expect(screen.getByText('Default Post')).toBeInTheDocument();
  });

  it('renders empty comments section when no comments exist', async () => {
    vi.mocked(messageApi.getPost).mockResolvedValueOnce({
      id: 1,
      title: 'Post Without Comments',
      body: 'This post has no comments',
      userId: 1,
    });

    vi.mocked(messageApi.getComments).mockResolvedValueOnce([]);

    render(<PostComponent postId={1} />);

    await waitFor(() => {
      expect(screen.getByText('Post Without Comments')).toBeInTheDocument();
    });

    // Comments heading should be visible but no comment tiles
    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.queryByText(/From .+@.+/)).not.toBeInTheDocument();
  });
});
