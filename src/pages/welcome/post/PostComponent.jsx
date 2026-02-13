/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getComments, getPost } from '../../../api/message.js';
import { Heading, Grid, Layer, Section, Stack, Tile } from '@carbon/react';
import { useEffect, useState } from 'react';

/**
 * Renders a single blog post and its comments.
 *
 * @param {Object} props
 * @param {number} [props.postId] - The ID of the post to display.
 *   If not provided, defaults to 1 and renders the first post.
 */
const PostComponent = ({ postId = 1 }) => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  const loadPost = async (id) => {
    try {
      const post = await getPost(id);
      setPost(post);
    } catch {
      setPost('Failed to load message');
    }
  };

  const loadComments = async (id) => {
    try {
      const comments = await getComments(id);
      setComments(comments);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadPost(postId);
      await loadComments(postId);
    };
    loadData();
  }, [postId]);

  return (
    <Section>
      <Tile>
        <Heading>Blog data retrieval example</Heading>
        <Stack gap={3}>
          <Section as="article">
            <Section>
              <Heading>{post?.title ?? 'Loading...'}</Heading>
              <p>{post?.body}</p>
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
