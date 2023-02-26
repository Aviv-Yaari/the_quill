import { TagLabelAndValue } from "@/types/Tag";
import { useRef } from "react";
import styled from "styled-components";
import TagSelect from "./shared/TagSelect";

interface Props {
  allTags: TagLabelAndValue[];
  selectedTags?: TagLabelAndValue[];
  onFilter: (filters: { tags?: string[], keywords?: string }) => void;
  hideTagFilters?: boolean;
}

const Filters = ({ allTags, selectedTags, onFilter, hideTagFilters }: Props) => {
  const keywordsRef = useRef<HTMLInputElement>(null);
  return (
    <Container>
      <div>
        <h2>Filter</h2>
        <Keywords>
          <label htmlFor="keywords">Keywords</label>
          <input ref={keywordsRef} id="keywords" name="keywords" type="text" onChange={(ev) => onFilter({ tags: selectedTags?.map(tag => tag.label), keywords: ev.target.value })} />
        </Keywords>
        {allTags && !hideTagFilters && (
          <div>
            <span>Tags</span>
            <TagSelect 
              options={allTags} 
              onChange={(tags) => onFilter({ tags: tags.map(tag => tag.label), keywords: keywordsRef.current?.value })}
              value={selectedTags}
            />
          </div>)}
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
export type { Props as FilterProps };