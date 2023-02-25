import Post from "@/types/Post";
import { readMultipleValuesFromQuery } from "@/utils/general_utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

interface Props {
    post: Post;
}

const PostPreview: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  const isPostPage = router.pathname === '/post/[id]';
  const queryTags = readMultipleValuesFromQuery(router.query, 'tags');

  const toggleLike = () =>{
    axios.patch(`/api/post/${post.id}/like`);
  };
  
  return (
    <Container>
      <h2>
        {isPostPage ? post.title : <Link href={'/post/' + post.id}>{post.title}</Link>}
      </h2>
      <Subtitle>
        <Link href={'/user/' + post.author}>{post.author}</Link>
        <span>•</span>
        <button onClick={toggleLike}>{post.likes} ♥</button>
        <span>•</span>
        <ReadTime>{post.read_time} minutes</ReadTime>
        <span>•</span>
        <ul style={{ display: 'contents' }}>
          {post.tags?.map((tag, index) => <Tag key={tag} text={tag} isCurrent={!!queryTags?.includes(tag)} last={index === post.tags.length - 1} />)}
        </ul>
        <span>•</span>
        <CommentsCount>{post.comments?.length} comments</CommentsCount>
      </Subtitle>
      <p>{post.body}</p>
    </Container>
  );
};

const Tag = ({ text, isCurrent, last }: {text: string, isCurrent: boolean, last: boolean}) => {
  const content = text + (last ? '' : ',');
  return (
    <StyledTag isCurrent={isCurrent}>
      {isCurrent ? content : <Link href={'/?tags=' + text}>{content}</Link>}
    </StyledTag>
  );
};

const Container = styled.article`
  padding-block: 2em;
  border-block-end: 1px solid ${({ theme }) => theme.border.primary};
`;

const Subtitle = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
  margin-block-end: 1em;
`;

const Author = styled.span`
  
`;

const StyledTag = styled.li<{isCurrent: boolean}>`
  ${({ isCurrent, theme }) => isCurrent && css`color: ${theme.text.link}`} 
`;

const Likes = styled.span`
  
`;
const ReadTime = styled.span`
  
`;

const CommentsCount = styled.span`

`;

export default PostPreview;