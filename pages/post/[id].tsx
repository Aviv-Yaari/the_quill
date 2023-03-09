import { getPostsFromDB } from "@/services/post.service";
import type Post from '@/types/Post';
import PostPreview from "@/components/PostPreview";
import { readSingleValueFromQuery } from "@/utils/general_utils";
import styled from "styled-components";
import { useEffect } from "react";
import { selectPostsData, updatePosts } from "@/store/slices/posts.slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { requireAuthForGetServerSideProps } from "@/middleware/requireAuth";
import { GetServerSidePropsContext } from "next";
import { UserToken } from "@/types/User";
import Head from "next/head";

interface Props {
    post: Post;
}

export default function PostPage({ post: postFromProps }: Props) {
  const posts = useAppSelector(selectPostsData);
  const post = posts ? posts[0] : null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updatePosts([postFromProps]));
  }, [dispatch, postFromProps]);

  return (
    <>
      <Head><title>The Quill - {post?.title}</title></Head>
      <Container>
        {post && <PostPreview post={post} isPostPage /> }
      </Container>
    </>
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

export const getServerSideProps = requireAuthForGetServerSideProps(
  async (context: GetServerSidePropsContext, user?: UserToken) => { 
    const id = readSingleValueFromQuery(context.query, 'id');
    const [post] = await getPostsFromDB(user?.id, { postId: id });
    return { props: { post } };
  }
);