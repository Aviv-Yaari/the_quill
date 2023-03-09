import Post from "@/types/Post";
import { getPostsFromDB } from "@/services/post.service";
import { useRouter } from "next/router";
import PostList from "@/components/PostList";
import { GridLayout } from "@/styles/helpers";
import LinkButton from "@/components/shared/LinkButton";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectUsername } from "@/store/slices/user.slice";
import { logout } from "@/store/slices/user.thunks";
import { raiseError } from "@/store/slices/app.slice";
import { requireAuthForGetServerSideProps } from "@/middleware/requireAuth";
import { GetServerSidePropsContext } from "next";
import { UserToken } from "@/types/User";

interface Props {
  posts: Post[];
}

export default function UserPage({ posts }: Props) {
  const router = useRouter();
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => router.push('/'))
      .catch(() => dispatch(raiseError('Could not log out')));
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

export const getServerSideProps = requireAuthForGetServerSideProps(
  async (context: GetServerSidePropsContext, user?: UserToken) => {
    const username = context.query.username as string;
    const posts = await getPostsFromDB(user?.id, { username });
    return { props: { posts } };
  }
);