import { getComments, getPost } from '../../../api/message.js';
import { Heading, Layer, Section, Tile } from '@carbon/react';
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
      setPost('Failed to load comments');
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
        <Section as="article" level={3}>
          <Section level={4}>
            <Heading>{post?.title ?? 'Loading...'}</Heading>
            <div>{post?.body}</div>
          </Section>
        </Section>

        <Section as="article" level={3}>
          <Heading>Comments</Heading>
          <Section as="article" level={4}>
            <Layer level={1}>
              <Tile>
                {comments?.map((comment) => (
                  <Tile title={`Post from ${comment.email}`} key={comment.id}>
                    <Heading>{`From ${comment.email}`}</Heading>
                    <div>{comment.body}</div>
                  </Tile>
                ))}
              </Tile>
            </Layer>
          </Section>
        </Section>
      </Tile>
    </Section>
  );
};

export default PostComponent;
