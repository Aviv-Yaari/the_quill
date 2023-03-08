import Post from "@/types/Post";
import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import PostList from "@/components/PostList";
import { GridLayout } from "@/styles/helpers";
import LinkButton from "@/components/shared/LinkButton";
import { useAppSelector } from "@/store";
import { selectUsername } from "@/store/slices/user.slice";

interface Props {
  posts: Post[];
}

export default function UserPage({ posts }: Props) {
  const router = useRouter();
  const username = useAppSelector(selectUsername);

  const handleLogout = () => {
    // TODO: implement this
  };

  return (
    <GridLayout>
      <section>
        <h2>{username}</h2>
        <LinkButton onClick={handleLogout}>Logout</LinkButton>
      </section>
      <PostList posts={posts} />
    </GridLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username as string;
  const posts = await getPostsFromDB({ username });
  return { props: { posts } };
};