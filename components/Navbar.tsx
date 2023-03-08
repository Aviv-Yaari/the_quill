import { useAppSelector } from "@/store";
import { selectUsername } from "@/store/slices/user.slice";
import { AppWrapper } from "@/styles/helpers";
import Link from "next/link";
import styled from "styled-components";

const Navbar: React.FC = () => {
  const username = useAppSelector(selectUsername);
  return (
    <Layout>
      <Container>
        <h1><Link href="/">The Quill</Link></h1>
        <Actions>
          <Link href="/post/create">Create a post</Link>
          {username ? <Link href={`/user/${username}`}>{username}</Link> : <Link href="/login">Login</Link>}
        </Actions>
      </Container>
    </Layout>
  );
};

const Layout = styled(AppWrapper)`
  border-bottom: 1px dashed black;
  margin-bottom: 2em;
`;

const Container = styled.div`
 display: flex;
 justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  position: sticky;
  top: 0;

  a {
    color: inherit;
  } 
`;

const Actions = styled.div`
align-items: center;
  display: flex;
  gap: 16px;
`;

export default Navbar;