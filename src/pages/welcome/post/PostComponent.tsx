import { getComments, getPost } from '../../../api/message';
import {
  Heading,
  InlineNotification,
  Layer,
  Section,
  Stack,
  Tile,
} from '@carbon/react';
import { useEffect, useState } from 'react';

interface Post {
  title: string;
  body: string;
}

interface Comment {
  id: number;
  email: string;
  body: string;
}

interface PostComponentProps {
  /**
   * The ID of the post to display.
   * If not provided, defaults to 1 and renders the first post.
   */
  postId?: number;
}

/**
 * Renders a single blog post and its comments.
 */
const PostComponent = ({ postId = 1 }: PostComponentProps) => {
  const [post, setPost] = useState<Post | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | undefined>();

  const loadPost = async (id: number) => {
    try {
      setError(undefined);
      const post = await getPost(id);
      setPost(post);
    } catch (err) {
      setError(
        `Failed to load post: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
      setPost(undefined);
    }
  };

  const loadComments = async (id: number) => {
    try {
      const comments = await getComments(id);
      setComments(comments);
    } catch (err) {
      // Don't override post error, just log comment error
      console.error('Failed to load comments:', err);
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
          {error ? (
            <InlineNotification
              kind="error"
              title="Error loading post"
              subtitle={error}
              lowContrast
              hideCloseButton
            />
          ) : (
            <>
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
            </>
          )}
        </Stack>
      </Tile>
    </Section>
  );
};

export default PostComponent;
