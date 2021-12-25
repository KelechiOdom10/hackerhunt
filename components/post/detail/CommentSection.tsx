import React from "react";
import { Comment } from "../../../apollo/generated/graphql";

type Props = {
  comment: Comment;
};
function CommentSection({ comment }: Props) {
  return <div>{comment.id}</div>;
}

export default CommentSection;
