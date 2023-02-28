import Post from "@/types/Post";
import { readMultipleValuesFromQuery } from "@/utils/general_utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import styled, { css } from "styled-components";
import CommentList from "./CommentList";
import LinkButton from "./shared/LinkButton";
import Toast from "./shared/Toast";
import TagList from "./TagList";
import userMock from '@/mocks/user.mock.json';

interface Props {
    post: Post;
}

const PostPreview: React.FC<Props> = ({ post: postFromProps }) => {
  const router = useRouter();
  const isPostPage = router.pathname === '/post/[id]'; // TODO: move to props
  const queryTags = readMultipleValuesFromQuery(router.query, 'tags'); // TODO: move to props
  const [post, setPost] = useState(postFromProps);
  const [error, setError] = useState<string | null>(); // TODO: Use redux
  const [showAddComment, setShowAddComment] = useState(false);
  
  const [limit, setLimit] = useState(isPostPage ? post.comments.length : 3);

  const toggleLike = async () => {
    try {
      const result = await axios.patch(`/api/post/${post.id}/${post.isLikedByUser ? 'unlike' : 'like'}`);
      if (result.data?.likes) {
        setPost(post => ({ ...post, likes: result.data.likes.length, isLikedByUser: !post.isLikedByUser }));
      }  
    } catch (error) {
      setError("Apologies! An error occurred while trying to like/unlike this post");
    }
  };

  const toggleShowAddComment = () => {
    setShowAddComment(state => !state);
  };

  const addComment: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    try {
      const formData = new FormData(ev.currentTarget);
      const body = formData.get('body');
      if (!body) throw "Body is empty";
      await axios.post("/api/comment", { body, post_id: post.id });
      setShowAddComment(false);
      const newComment = { author: userMock.username, body: body as string };
      setPost(post => ({ ...post, comments: [newComment, ...post.comments] }));// TODO: get real logged in user
      setLimit(limit => limit + 1);
    } catch (err) {
      setError("Apologies! An error occurred while trying to add a comment");
    }
  };

  return (
    <>
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
          <Likes isLikedByUser={post.isLikedByUser} onClick={toggleLike}>♥ {post.likes}</Likes>
          <span>•</span>
          <LinkButton onClick={toggleShowAddComment}>{post.comments.length} comments</LinkButton>
        </Subtitle>
        {post.comments.length > 0 && <CommentList comments={post.comments} limit={limit} showAddComment={showAddComment} onAddComment={addComment} />}
      </Container>
    </>
  );
};

const Container = styled.article`
  &:first-child {
    padding-top: 0
  }
  background: ${({ theme }) => theme.background.secondary};
  margin-block: 1em;
  padding: 1em;
  box-shadow: 1px 1px 2px 0px ${({ theme }) => theme.border.secondary};
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

const CommentsCount = styled.button`

`;

export default PostPreview;