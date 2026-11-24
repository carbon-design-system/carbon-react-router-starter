/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Heading, Layer, Section, Stack, Tile } from '@carbon/react';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { getComments, getPost } from '../../../api/message';

export interface Post {
  id?: number;
  userId?: number;
  title?: string;
  body?: string;
}

export interface Comment {
  id: number;
  postId?: number;
  name?: string;
  email: string;
  body: string;
}

export interface PostComponentProps {
  /**
   * The ID of the post to display.
   * If not provided, defaults to 1 and renders the first post.
   */
  postId?: number;
}

/**
 * Renders a single blog post and its comments.
 */
const PostComponent = ({ postId = 1 }: PostComponentProps): ReactElement => {
  const [post, setPost] = useState<Post | string>();
  const [comments, setComments] = useState<Comment[]>([]);

  const loadPost = async (id: number): Promise<void> => {
    try {
      const post = (await getPost(id)) as Post;
      setPost(post);
    } catch {
      setPost('Failed to load message');
    }
  };

  const loadComments = async (id: number): Promise<void> => {
    try {
      const comments = (await getComments(id)) as Comment[];
      setComments(comments);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      await loadPost(postId);
      await loadComments(postId);
    };
    void loadData();
  }, [postId]);

  const loadedPost = typeof post === 'object' ? post : undefined;

  return (
    <Section>
      <Tile>
        <Heading>Blog data retrieval example</Heading>
        <Stack gap={3}>
          <Section as="article">
            <Section>
              <Heading>{loadedPost?.title ?? 'Loading...'}</Heading>
              <p>{loadedPost?.body}</p>
            </Section>
          </Section>

          <Section>
            <Stack gap={3}>
              <Heading>Comments</Heading>
              <Section as="div">
                <Stack gap={3}>
                  {Array.isArray(comments) &&
                    comments.map((comment) => (
                      <Layer key={comment.id}>
                        <Tile title={`Post from ${comment.email}`}>
                          <Heading>{`From ${comment.email}`}</Heading>
                          <p>{comment.body}</p>
                        </Tile>
                      </Layer>
                    ))}
                </Stack>
              </Section>
            </Stack>
          </Section>
        </Stack>
      </Tile>
    </Section>
  );
};

export default PostComponent;
