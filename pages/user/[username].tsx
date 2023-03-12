import Post from "@/types/Post";
import { getPostsFromDB } from "@/services/post.service";
import { useRouter } from "next/router";
import PostList from "@/components/PostList";
import { GridLayout } from "@/styles/helpers";
import LinkButton from "@/components/shared/LinkButton";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectIsLoading, selectUsername } from "@/store/slices/user.slice";
import { logout } from "@/store/slices/user.thunks";
import { raiseError } from "@/store/slices/app.slice";
import { requireAuthForGetServerSideProps } from "@/middleware/requireAuth";
import { GetServerSidePropsContext } from "next";
import { UserToken } from "@/types/User";
import Head from "next/head";

interface Props {
  posts: Post[];
}

export default function UserPage({ posts }: Props) {
  const router = useRouter();
  const loggedInUsername = useAppSelector(selectUsername);
  const { username } = router.query;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => router.push('/'))
      .catch(() => dispatch(raiseError('Could not log out')));
  };

  return (
    <>
      <Head><title>The Quill - {username}</title></Head>
      <GridLayout>
        <section>
          <h2>{username}</h2>
          {username === loggedInUsername && 
          (isLoading ? <span>Logging out...</span> : <LinkButton onClick={handleLogout}>Logout</LinkButton>)}
        </section>
        <PostList posts={posts} />
      </GridLayout>
    </>
  );
}

export const getServerSideProps = requireAuthForGetServerSideProps(
  async (context: GetServerSidePropsContext, user?: UserToken) => {
    const username = context.query.username as string;
    const posts = await getPostsFromDB(user?.id, { username });
    return { props: { posts } };
  }
);