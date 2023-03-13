import Post from "@/types/Post";
import Link from "next/link";
import { FormEventHandler } from "react";
import styled from "styled-components";
import CommentList from "./CommentList";
import TagList from "./TagList";
import { useAppDispatch } from "@/store";
import { raiseError } from "@/store/slices/app.slice";
import { addCommentToPost, togglePostLike } from "@/store/slices/posts.thunks";
import { formatDate } from "@/utils/general_utils";

interface Props {
    post: Post;
    isPostPage?: boolean;
    selectedTags?: string[];
}

const PostDetails: React.FC<Props> = ({ post, isPostPage, selectedTags = [] }) => {
  const dispatch = useAppDispatch();

  const toggleLike = () => {
    dispatch(togglePostLike(post))
      .unwrap()
      .catch(() => dispatch(raiseError("An error occured while liking/unliking a post")));
  };

  const addComment: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    try {
      if (!(ev.target instanceof HTMLFormElement)) return;
      const formData = new FormData(ev.target);
      const body = formData.get('body') as string;
      await dispatch(addCommentToPost({ body, postId: post.id })).unwrap();
      ev.target.reset();
    } catch (err) {
      console.error(err);
      dispatch(raiseError("Apologies! An error occurred while trying to add a comment"));
    }
  };

  return (
    <>
      <Container>
        <h2>
          {isPostPage ? post.title : <Link href={'/post/' + post.id}>{post.title}</Link>}
        </h2>
        <Subtitle>
          <Link href={'/user/' + post.author}>{post.author}</Link>
          <span>•</span>
          <span>{formatDate(post.timestamp)}</span>
          <span>•</span>
          <span>{post.read_time} minutes</span>
          <span>•</span>
          <TagList tags={post.tags} currentTags={selectedTags} />
        </Subtitle>
        <p>{post.body}</p>
        <Subtitle>
          <Likes isLikedByUser={post.isLikedByUser} onClick={toggleLike}>♥ {post.likes}</Likes>
          <span>•</span>
          <Link href={'/post/' + post.id + '#comments'}>{post.total_comments} comments</Link>
        </Subtitle>
        <CommentList postId={post.id} totalComments={post.total_comments} comments={post.comments} onAddComment={addComment} />
      </Container>
    </>
  );
};

const Container = styled.article`
  &:first-child {
    margin-top: 0;
  }
  background: ${({ theme }) => theme.background.secondary};
  margin-block: 3em;
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

const Likes = styled.button<{isLikedByUser: boolean}>`
  transition: color 200ms;
  ${({ isLikedByUser, theme }) => isLikedByUser && `color: ${theme.text.liked}`};
  &:hover {
    color: ${({ theme }) => theme.text.liked}; 
  }
`;

export default PostDetails;