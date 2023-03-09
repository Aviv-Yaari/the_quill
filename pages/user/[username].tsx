import Post from "@/types/Post";
import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import PostList from "@/components/PostList";
import { GridLayout } from "@/styles/helpers";
import LinkButton from "@/components/shared/LinkButton";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectUsername } from "@/store/slices/user.slice";
import { logout } from "@/store/slices/user.thunks";
import { raiseError } from "@/store/slices/app.slice";
import cookie from 'cookie';
import { authService } from "@/services/auth.service";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username as string;
  const { token } = cookie.parse(context.req.headers.cookie || '');
  const loggedInUser = authService.verifyToken(token);
  const posts = await getPostsFromDB(loggedInUser?.id, { username });
  return { props: { posts } };
};