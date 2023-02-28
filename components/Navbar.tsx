import { AppLayout } from "@/styles/helpers";
import Link from "next/link";
import styled from "styled-components";


const Navbar = () => {
  const username = 'avivyaari';

  return (
    <Layout>
      <Container>
        <h1><Link href="/">The Quill</Link></h1>
        <Actions>
          <Link href="/post/create">Create a post</Link>
          <Link href={`/user/${username}`}>{username}</Link>
        </Actions>
      </Container>
    </Layout>
  );
};

const Layout = styled(AppLayout)`
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