import styled from "styled-components";

const Navbar = () => {
  return (
    <Container>
      <span>Create a post</span>
      <span>Username</span>
    </Container>
  )
};

const Container = styled.nav`
  grid-column: 2;
  align-self: center;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

export default Navbar;