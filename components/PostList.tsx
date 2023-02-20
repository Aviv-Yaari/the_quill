import posts from '@/mocks/posts.json';
import styled from 'styled-components';
import PostPreview from './PostPreview';

const PostList = () => {
  return (
    <Container>
      {posts.map(post => <PostPreview key={post._id} post={post} />)}
    </Container>
  );
};

const Container = styled.section`
  grid-row: 2;
`;

export default PostList;