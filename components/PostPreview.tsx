import Post from "@/types/Post";
import { readMultipleValuesFromQuery } from "@/utils/general_utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled, { css } from "styled-components";
import CommentList from "./CommentList";
import Toast from "./shared/Toast";
import TagList from "./TagList";

interface Props {
    post: Post;
}

const PostPreview: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  const isPostPage = router.pathname === '/post/[id]';
  const queryTags = readMultipleValuesFromQuery(router.query, 'tags');
  const [likes, setLikes] = useState(post.likes); // TODO: move to redux
  const [isLikedByUser, setIsLikedByUser] = useState(post.isLikedByUser); // TODO: move to redux
  const [error, setError] = useState<string | null>(); // TODO: Use redux

  const toggleLike = async () => {
    try {
      const result = await axios.patch(`/api/post/${post.id}/${isLikedByUser ? 'unlike' : 'like'}`);
      if (result.data?.likes) {
        setLikes(result.data.likes.length);
        setIsLikedByUser(state => !state);
      }  
    } catch (error) {
      setError("Apologies! An error occurred");
    }
    
  };

  return (
    <Container>
      {error && <Toast onClose={() => setError(null)}>{error}</Toast>}
      <h2>
        {isPostPage ? post.title : <Link href={'/post/' + post.id}>{post.title}</Link>}
      </h2>
      <Subtitle>
        <Link href={'/user/' + post.author}>{post.author}</Link>
        <span>•</span>
        <ReadTime>{post.read_time} minutes</ReadTime>
        <span>•</span>
        <TagList tags={post.tags} currentTags={queryTags} />
      </Subtitle>
      <p>{post.body}</p>
      <Subtitle>
        <Likes isLikedByUser={isLikedByUser} onClick={toggleLike}>♥ {likes}</Likes>
        <span>•</span>
        <CommentsCount>{post.comments?.length} comments</CommentsCount>
      </Subtitle>
      <CommentList comments={post.comments} />
    </Container>
  );
};

const Container = styled.article`
  &:first-child {
    padding-top: 0
  }
  padding-block: 2em;
  border-block-end: 1px solid ${({ theme }) => theme.border.primary};
`;

const Subtitle = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
  margin-block: 1em;
`;

const Author = styled.span`
  
`;

const Likes = styled.button<{isLikedByUser: boolean}>`
  transition: color 200ms;
  ${({ isLikedByUser, theme }) => isLikedByUser && css`color: ${theme.text.liked}`};

  &:hover {
    color: ${({ theme }) => theme.text.liked}; 
  }
`;
const ReadTime = styled.span`
  
`;

const CommentsCount = styled.span`

`;

export default PostPreview;