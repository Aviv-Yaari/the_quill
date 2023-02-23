import { GridLayout } from "@/styles/helpers";
import Link from "next/link";
import styled from "styled-components";

const Navbar = () => {
  const username = 'avivyar';

  return (
    <Container>
      <h1><Link href="/">The Quill</Link></h1>
      <Actions>
        <Link href="/post/create">Create a post</Link>
        <Link href={`/user/${username}`}>{username}</Link>
      </Actions>
    </Container>
  );
};

const Container = styled(GridLayout)`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  position: sticky;
  top: 0;
  border-bottom: 1px dashed black;

  a {
    color: inherit;
  }
`;

const Actions = styled(GridLayout)`
  display: flex;
  gap: 16px;
  justify-self: flex-end;
`;

export default Navbar;