import type Post from '@/types/Post';
import styled from 'styled-components';
import PostPreview from './PostPreview';

interface Props {
  posts: Post[];
}

const PostList = ({ posts }: Props) => {
  return (
    <Container>
      {posts.map(post => <PostPreview key={post.id.toString()} post={post} />)}
    </Container>
  );
};

const Container = styled.section`
`;

export default PostList;