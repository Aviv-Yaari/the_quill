import Post from "@/types/Post";
import { readMultipleValuesFromQuery } from "@/utils/general_utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import styled from "styled-components";
import CommentList from "./CommentList";
import TagList from "./TagList";
import userMock from '@/mocks/user.mock.json';
import { useAppDispatch } from "@/store";
import { raiseError } from "@/store/slices/app.slice";
import { togglePostLike } from "@/store/slices/posts.thunks";

interface Props {
    post: Post;
}

const PostPreview: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  const isPostPage = router.pathname === '/post/[id]'; // TODO: move to props
  const queryTags = readMultipleValuesFromQuery(router.query, 'tags'); // TODO: move to props
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(isPostPage ? post.comments.length : 3);

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
      const body = formData.get('body');
      if (!body) throw "Body is empty";
      await axios.post("/api/comment", { body, post_id: post.id });
      const newComment = { author: userMock.username, body: body as string };
      // setPost(post => ({ ...post, comments: [newComment, ...post.comments] }));// TODO: get real logged in user
      setLimit(limit => limit + 1);
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
          <span>{post.read_time} minutes</span>
          <span>•</span>
          <TagList tags={post.tags} currentTags={queryTags} />
        </Subtitle>
        <p>{post.body}</p>
        <Subtitle>
          <Likes isLikedByUser={post.isLikedByUser} onClick={toggleLike}>♥ {post.likes}</Likes>
          <span>•</span>
          <Link href={'/post/' + post.id + '#comments'}>{post.comments.length} comments</Link>
        </Subtitle>
        <CommentList comments={post.comments} limit={limit} onAddComment={addComment} />
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

const Likes = styled.button<{isLikedByUser: boolean}>`
  transition: color 200ms;
  ${({ isLikedByUser, theme }) => isLikedByUser && `color: ${theme.text.liked}`};
  &:hover {
    color: ${({ theme }) => theme.text.liked}; 
  }
`;

export default PostPreview;