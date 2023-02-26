import { TagLabelAndValue } from "@/types/Tag";
import { useState } from "react";
import styled from "styled-components";
import TagSelect from "./shared/TagSelect";

interface Props {
  allTags: TagLabelAndValue[];
}

const Filters = ({ allTags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<TagLabelAndValue[]>();
  
  return (
    <Container>
      <div>
        <h2>Filter</h2>
        <Keywords>
          <label htmlFor="keywords">Keywords</label>
          <input id="keywords" name="keywords" type="text" />
        </Keywords>
        {allTags &&(
          <div>
            <span>Tags</span>
            <TagSelect 
              options={allTags} 
              onChange={(selected) => setSelectedTags([...selected])}
            />
          </div>)}
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