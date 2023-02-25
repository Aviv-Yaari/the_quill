import PostPreview from "@/components/PostPreview";
import Post from "@/types/Post";
import { getPostsFromDB } from "@/utils/post_utils";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  posts: Post[];
}

export default function UserPage({ posts }: Props) {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <h2>{username}</h2>
      {posts?.map(post => <PostPreview key={post.id as string} post={post} />)}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username as string;
  const posts = await getPostsFromDB({ username });
  return { props: { posts } };
};