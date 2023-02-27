import Post from "@/types/Post";
import { FunctionComponent, useId } from "react";

interface Props {
    comments: Post['comments'];
}

const CommentList: FunctionComponent<Props> = ({ comments }) => {
  const id = useId();
  return (
    <div>
      {comments.map((comment) => <div key={id}>{comment.author}: {comment.body}</div>)}
    </div>
  );
};

export default CommentList;