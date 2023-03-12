import { useAppDispatch, useAppSelector } from "@/store";
import { selectAddingCommentToPostID } from "@/store/slices/posts.slice";
import { getPostComments } from "@/store/slices/posts.thunks";
import Post from "@/types/Post";
import { formatDate } from "@/utils/general_utils";
import { FormEventHandler, FunctionComponent, useRef } from "react";
import styled from "styled-components";
import LinkButton from "./shared/LinkButton";
import PrimaryButton from "./shared/PrimaryButton";

interface Props {
    postId: string;
    comments: Post['comments'];
    totalComments: number;
    onAddComment: FormEventHandler<HTMLFormElement>;
}

const CommentList: FunctionComponent<Props> = ({ postId, comments, totalComments, onAddComment }) => {
  const page = useRef(1);
  const addingCommentToPostID = useAppSelector(selectAddingCommentToPostID);
  const dispatch = useAppDispatch();

  const handleLoadPreviousComments = async () => {
    await dispatch(getPostComments({ postId, page: page.current }));
    page.current ++;
  };

  return (
    <Container>
      {comments.map(comment => 
        <CommentContainer key={comment.id}>
          {comment.author}: {comment.body}
          <CommentDate>{formatDate(comment.timestamp)}</CommentDate>
        </CommentContainer>
      )}
      {comments.length < totalComments && <LinkButton onClick={handleLoadPreviousComments}>Load previous comments</LinkButton>}
      <AddComment onSubmit={onAddComment}>
        <input type="text" name="body" placeholder="Add a comment..." />
        <PrimaryButton isBusy={addingCommentToPostID === postId}>Add</PrimaryButton>
      </AddComment>
    </Container>
  );
};

const CommentContainer = styled.p`
  display: flex;
  justify-content: space-between;
`;

const CommentDate = styled.span`
  color: ${({ theme }) => theme.text.secondary}
`;

const Container = styled.section`
  border-block-start: 1px solid #aaa;
  padding-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const AddComment = styled.form`
  display: flex;
  gap: 10px;
  input {
    flex-grow: 1;
  }
`;

export default CommentList;