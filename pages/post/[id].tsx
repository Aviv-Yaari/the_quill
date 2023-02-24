import { getPostsFromDB } from "@/utils/post_utils";
import { GetServerSideProps } from "next";
import type Post from '@/types/Post';
import PostPreview from "@/components/PostPreview";

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
  const { id } = context.query;  
  const posts = await getPostsFromDB(id as string);
  return { props: { post: posts[0] } };
};