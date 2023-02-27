import { TagLabelAndValue } from "@/types/Tag";
import { useRef } from "react";
import styled from "styled-components";
import TagSelect from "./TagSelect";

interface Props {
  allTags: TagLabelAndValue[];
  selectedTags?: TagLabelAndValue[];
  onFilter: (filters: { tags?: string[], keywords?: string }) => void;
  hideTagFilters?: boolean;
  defaultKeywords?: string;
}

const Filters = ({ allTags, selectedTags, onFilter, hideTagFilters, defaultKeywords }: Props) => {
  const keywordsRef = useRef<HTMLInputElement>(null);
  return (
    <Container>
      <h2>Posts</h2>
      <Keywords>
        <label htmlFor="keywords">Keywords</label>
        <input ref={keywordsRef} id="keywords" name="keywords" type="text" defaultValue={defaultKeywords} onChange={(ev) => onFilter({ tags: selectedTags?.map(tag => tag.label), keywords: ev.target.value })} />
      </Keywords>
      {allTags && !hideTagFilters && (
        <div>
          <span>Tags</span>
          <TagSelect 
            options={allTags} 
            onChange={(tags) => onFilter({ tags: tags.map(tag => (tag.label)), keywords: keywordsRef.current?.value })}
            value={selectedTags}
          />
        </div>)}
    </Container>
  );
};

const Container = styled.section`
`;

const Keywords = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Filters;
export type { Props as FilterProps };