import { FunctionComponent } from "react";
import styled, { css } from "styled-components";

interface Props {
    tags: string[];
    currentTags: string[];
}

const TagList: FunctionComponent<Props> = ({ tags, currentTags }) => {
  const isLast = (index: number) => index === tags.length - 1;
  return (
    <ul style={{ display: 'contents' }}>
      {tags.map((tag, index) => 
        <StyledTag key={tag} isCurrent={!!currentTags?.includes(tag)}>
          {tag + (isLast(index) ? '' : ', ')}
        </StyledTag>
      )}
    </ul>
  );
};

const StyledTag = styled.li<{isCurrent: boolean}>`
  ${({ isCurrent, theme }) => isCurrent && css`
    color: ${theme.text.link}
  `};
`;

export default TagList;