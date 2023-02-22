import { TagLabelAndValue } from "@/types/Tag";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TagSelect from "./shared/TagSelect";

const Filters = () => {
  const [allTags, setAllTags] = useState<TagLabelAndValue[]>();
  const [selectedTags, setSelectedTags] = useState<TagLabelAndValue[]>();

  useEffect(() => { 
    axios.get('/api/tag').then(res => setAllTags(res.data));
  }, []);

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