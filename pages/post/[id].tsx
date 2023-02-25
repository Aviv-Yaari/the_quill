import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import type Post from '@/types/Post';
import PostPreview from "@/components/PostPreview";
import { readSingleValueFromQuery } from "@/utils/general_utils";

interface Props {
    post: Post | undefined;
}

export default function PostPage({ post }: Props) {
  return (
    <>
      {post && <PostPreview post={post} />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {    
  const id = readSingleValueFromQuery(context.query, 'id');
  const posts = await getPostsFromDB({ postId: id });
  return { props: { post: posts[0] } };
};