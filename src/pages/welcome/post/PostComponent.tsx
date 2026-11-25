/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getComments, getPost } from '../../../api/message.ts';
import { Heading, Layer, Section, Stack, Tile } from '@carbon/react';
import { useEffect, useState } from 'react';

interface Post {
  id?: number | string;
  title?: string;
  body?: string;
}

interface Comment {
  id: number | string;
  email: string;
  body: string;
  postId?: number | string;
}

interface PostComponentProps {
  postId?: number | string;
}

/**
 * Renders a single blog post and its comments.
 */
const PostComponent = ({ postId = 1 }: PostComponentProps) => {
  const [post, setPost] = useState<Post | string>();
  const [comments, setComments] = useState<Comment[]>([]);

  const loadPost = async (id: number | string) => {
    try {
      const postData = (await getPost(id)) as Post;
      setPost(postData);
    } catch {
      setPost('Failed to load message');
    }
  };

  const loadComments = async (id: number | string) => {
    try {
      const commentsData = (await getComments(id)) as Comment[];
      setComments(commentsData);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadPost(postId);
      await loadComments(postId);
    };
    void loadData();
  }, [postId]);

  const postTitle = typeof post === 'object' && post?.title ? post.title : 'Loading...';
  const postBody = typeof post === 'object' ? post?.body : undefined;

  return (
    <Section>
      <Tile>
        <Heading>Blog data retrieval example</Heading>
        <Stack gap={3}>
          <Section as="article">
            <Section>
              <Heading>{postTitle}</Heading>
              <p>{postBody}</p>
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
