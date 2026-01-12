import { getComments, getPost } from '../../../api/message.js';
import { Heading, Section, Tile, Stack, Layer } from '@carbon/react';
import { useEffect, useState } from 'react';

/**
 * Renders a single blog post and its comments.
 *
 * @param {Object} props
 * @param {number} [props.postId] - The ID of the post to display.
 *   If not provided, defaults to 1 and renders the first post.
 */
const PostComponent = ({ postId = 1 }) => {
  const [post, setPost] = useState(
    /** @type {{title?: string, body?: string} | undefined} */ (undefined),
  );
  const [comments, setComments] = useState([]);

  const loadPost = async (id) => {
    try {
      const post = await getPost(id);
      setPost(post);
    } catch {
      setPost({ title: 'Error', body: 'Failed to load message' });
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
    <Section as="article" level={3}>
      <Heading>Posts</Heading>
      <Tile>
        <Stack gap={6}>
          <Section as="article" level={3}>
            <Section level={4}>
              <Heading>{post?.title ?? 'Loading...'}</Heading>
              <p>{post?.body}</p>
            </Section>
          </Section>

          <Section as="article" level={5}>
            <Stack gap={3}>
              <Heading>Comments</Heading>
              <Section as="article" level={6}>
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
