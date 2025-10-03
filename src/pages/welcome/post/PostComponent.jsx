import { getComments, getPost } from '../../../api/message.js';
import { Heading, Section, Tile, Stack, Layer } from '@carbon/react';
import { useEffect, useState } from 'react';

const PostComponent = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  const loadPost = async () => {
    try {
      const post = await getPost(1);
      setPost(post);
    } catch {
      setPost('Failed to load message');
    }
  };

  const loadComments = async () => {
    try {
      const comments = await getComments(1);
      setComments(comments);
    } catch {
      setComments('Failed to load comments');
    }
  };

  useEffect(() => {
    loadPost();
    loadComments();
  }, []);

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
                  {comments?.map((comment) => (
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
