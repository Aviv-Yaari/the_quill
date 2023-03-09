import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import type Post from '@/types/Post';
import PostPreview from "@/components/PostPreview";
import { readSingleValueFromQuery } from "@/utils/general_utils";
import styled from "styled-components";
import { useEffect } from "react";
import { selectPostsData, updatePosts } from "@/store/slices/posts.slice";
import { useAppDispatch, useAppSelector } from "@/store";
import cookie from 'cookie';
import { authService } from "@/services/auth.service";

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
  const { token } = cookie.parse(context.req.headers.cookie || '');
  const loggedInUser = authService.verifyToken(token);
  const [post] = await getPostsFromDB(loggedInUser?.id, { postId: id });
  return { props: { post } };
};