import styled from "styled-components";

const Filters = () => {
  return (
    <Container>
      <div>
        <h2>Filter</h2>
        <Keywords>
          <label htmlFor="keywords">Keywords</label>
          <input id="keywords" name="keywords" type="text" />
        </Keywords>
        <div>
          <span>Tags</span>
        </div>
        <div>
          <span>Likes</span>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  padding-block: 2em;
  grid-row: 2;
  position: relative;
  >:first-child {
    position: sticky;
    top: 6em;
  }
`;

const Keywords = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Filters;