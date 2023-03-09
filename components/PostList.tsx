import type Post from '@/types/Post';
import styled from 'styled-components';
import PostDetails from './PostDetails';

interface Props {
  posts: Post[];
  isPostPage?: boolean;
  selectedTags?: string[];
}

const PostList = ({ posts, isPostPage, selectedTags }: Props) => {
  return (
    <Container>
      {!posts.length && <div>No posts found</div>}
      {posts.map(post => <PostDetails key={post.id.toString()} post={post} isPostPage={isPostPage} selectedTags={selectedTags} />)}
    </Container>
  );
};

const Container = styled.section`
`;

export default PostList;