import Post from "@/types/Post";
import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import PostList from "@/components/PostList";
import { GridLayout } from "@/styles/helpers";

interface Props {
  posts: Post[];
}

export default function UserPage({ posts }: Props) {
  const router = useRouter();
  const { username } = router.query;

  return (
    <GridLayout>
      <h2>{username}</h2>
      <PostList posts={posts} />
    </GridLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username as string;
  const posts = await getPostsFromDB({ username });
  return { props: { posts } };
};