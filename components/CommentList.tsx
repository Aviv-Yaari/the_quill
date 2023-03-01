import { useAppSelector } from "@/store";
import { selectIsAddCommentLoading } from "@/store/slices/posts.slice";
import Post from "@/types/Post";
import { FormEventHandler, FunctionComponent } from "react";
import styled from "styled-components";
import PrimaryButton from "./shared/PrimaryButton";

interface Props {
    comments: Post['comments'];
    onAddComment: FormEventHandler<HTMLFormElement>;
}

const CommentList: FunctionComponent<Props> = ({ comments, onAddComment }) => {
  const isAddCommentLoading = useAppSelector(selectIsAddCommentLoading);

  return (
    <Container>
      {comments.map((comment, index) => 
        index < 3 && <p key={index}>{comment.author}: {comment.body}</p>
      )}
      <AddComment onSubmit={onAddComment}>
        <input type="text" name="body" placeholder="Add a comment..." />
        <PrimaryButton isBusy={isAddCommentLoading}>Add</PrimaryButton>
      </AddComment>
    </Container>
  );
};

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