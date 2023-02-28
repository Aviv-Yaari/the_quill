import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import type Post from '@/types/Post';
import PostPreview from "@/components/PostPreview";
import { readSingleValueFromQuery } from "@/utils/general_utils";
import { GridLayout } from "@/styles/helpers";
import styled from "styled-components";

interface Props {
    post: Post | undefined;
}

export default function PostPage({ post }: Props) {
  return (
    <GridLayout>
      <Container>
        {post && <PostPreview post={post} /> } {/* // TODO: fix onLike and onUnlike */}
      </Container>
    </GridLayout>
  );
};

const Container = styled.div`
  grid-column: 2;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {    
  const id = readSingleValueFromQuery(context.query, 'id');
  const posts = await getPostsFromDB({ postId: id });
  return { props: { post: posts[0] } };
};