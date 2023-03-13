import { GetPostsFilters } from "@/types/Post";
import { TagLabelAndValue } from "@/types/Tag";
import { debounce } from "@/utils/general_utils";
import { ChangeEventHandler, useRef } from "react";
import styled from "styled-components";
import LinkButton from "./shared/LinkButton";
import TagSelect from "./TagSelect";

interface Props {
  allTags: TagLabelAndValue[];
  selectedTags?: TagLabelAndValue[];
  onFilter: (filters: { tags?: string[], keywords?: string, category?: 'top_rated' | 'most_recent' }) => void;
  hideTagFilters?: boolean;
  defaultKeywords?: string;
  category: GetPostsFilters['category'];
}

const Filters = ({ allTags, selectedTags, onFilter, hideTagFilters, defaultKeywords, category }: Props) => {
  const keywordsRef = useRef<HTMLInputElement>(null);
  const onKeywordsChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    debounce(() => onFilter({ keywords: ev.target.value }));
  };
  return (
    <Container>
      <h2>Posts</h2>
      <Keywords>
        <label htmlFor="keywords">Keywords</label>
        <input 
          ref={keywordsRef} 
          id="keywords" 
          name="keywords" 
          type="text" 
          defaultValue={defaultKeywords} 
          onChange={onKeywordsChange} />
      </Keywords>
      {allTags && !hideTagFilters && (
        <div>
          <span>Tags</span>
          <TagSelect 
            options={allTags} 
            onChange={(tags) => onFilter({ tags: tags.map(tag => (tag.label)) })}
            value={selectedTags}
          />
        </div>)}
      <Categories>
        <LinkButton isActive={category === 'top_rated'} onClick={() => onFilter({ category: 'top_rated' })}>Top rated</LinkButton>
        <span> | </span>
        <LinkButton isActive={category === 'most_recent'} onClick={() => onFilter({ category: 'most_recent' })}>Most recent</LinkButton>
      </Categories>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Keywords = styled.div`
  display: flex;
  flex-direction: column;
`;

const Categories = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export default Filters;
export type { Props as FilterProps };