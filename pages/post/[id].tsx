import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import type Post from '@/types/Post';
import PostPreview from "@/components/PostPreview";
import { readSingleValueFromQuery } from "@/utils/general_utils";
import styled from "styled-components";

interface Props {
    post: Post | undefined;
}

export default function PostPage({ post }: Props) {
  return (
    <Container>
      {post && <PostPreview post={post} isPostPage /> }
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  >:first-child {
    width: 100%;
    max-width: 768px;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {    
  const id = readSingleValueFromQuery(context.query, 'id');
  const posts = await getPostsFromDB({ postId: id });
  return { props: { post: posts[0] } };
};