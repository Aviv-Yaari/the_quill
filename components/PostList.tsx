import type Post from '@/types/Post';
import { readMultipleValuesFromQuery } from '@/utils/general_utils';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PostPreview from './PostPreview';

interface Props {
  posts: Post[];
}

const PostList = ({ posts }: Props) => {
  const router = useRouter();
  const tags = readMultipleValuesFromQuery(router.query, 'tags');

  return (
    <Container>
      {tags && <h2>Posts with tags: {tags.join(', ')}</h2>}
      {posts.map(post => <PostPreview key={post.id.toString()} post={post} />)}
    </Container>
  );
};

const Container = styled.section`
  grid-row: 2;
`;

export default PostList;