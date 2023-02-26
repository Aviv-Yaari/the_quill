import { TagLabelAndValue } from "@/types/Tag";
import styled from "styled-components";
import TagSelect from "./shared/TagSelect";

interface Props {
  allTags: TagLabelAndValue[];
  defaultTags: TagLabelAndValue[];
  onFilter: (filters: { tags?: string[] }) => void;
  hideTagFilters?: boolean;
}

const Filters = ({ allTags, defaultTags, onFilter, hideTagFilters }: Props) => {
  return (
    <Container>
      <div>
        <h2>Filter</h2>
        <Keywords>
          <label htmlFor="keywords">Keywords</label>
          <input id="keywords" name="keywords" type="text" />
        </Keywords>
        {allTags && !hideTagFilters && (
          <div>
            <span>Tags</span>
            <TagSelect 
              options={allTags} 
              onChange={(tags) => onFilter({ tags: tags.map(tag => tag.label) })}
              defaultValue={defaultTags}
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