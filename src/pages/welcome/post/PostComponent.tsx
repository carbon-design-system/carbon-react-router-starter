import { getComments, getPost } from '../../../api/message';
import { Heading, Layer, Section, Stack, Tile } from '@carbon/react';
import { useEffect, useState, FC } from 'react';

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
  postId?: number;
}

/**
 * Renders a single blog post and its comments.
 *
 * @param props - Component props
 * @param props.postId - The ID of the post to display.
 *   If not provided, defaults to 1 and renders the first post.
 */
const PostComponent: FC<PostComponentProps> = ({ postId = 1 }) => {
  const [post, setPost] = useState<Post | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);

  const loadPost = async (id: number) => {
    try {
      const post = await getPost(id);
      setPost(post);
    } catch {
      setPost(undefined);
    }
  };

  const loadComments = async (id: number) => {
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
