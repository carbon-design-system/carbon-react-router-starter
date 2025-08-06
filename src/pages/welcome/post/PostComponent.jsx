import { getComments, getPost } from '../../../api/message.js';
import { Heading, Section, Tile } from '@carbon/react';
import { useEffect, useState } from 'react';

const PostComponent = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
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

    loadPost();
    loadComments();
  }, []);

  return (
    <Tile>
      <Section as="article" level={3}>
        <Heading>{post?.title ?? 'Loading...'}</Heading>
      </Section>
      <Section as="article" level={4}>
        <Heading>Comments</Heading>
        {comments?.map((comment) => (
          <Tile title={`Post from ${comment.email}`} key={comment.id}>
            <Heading>{`From ${comment.email}`}</Heading>
            <div>{comment.body}</div>
          </Tile>
        ))}
      </Section>
    </Tile>
  );
};

export default PostComponent;
