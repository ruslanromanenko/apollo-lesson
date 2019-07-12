import React from "react";
import { Mutation } from "react-apollo";
import classes from "./CreateComment.module.css";
import { CREATE_COMMENT_MUTATION } from "../../graphql/mutations";
import { getUserId } from "../../services/sessionStorage";

const Comment = ({ postId }) => {
  return (
    <Mutation mutation={CREATE_COMMENT_MUTATION}>
      {(createComment, { loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        let text;
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              createComment({
                variables: {
                  userId: getUserId(),
                  postId: postId,
                  text: text.value
                }
              });
            }}
            className={classes.CreateComment}
          >
            <label htmlFor="commentId">Write a comment</label>
            <textarea id="commentId" ref={node => (text = node)} />
            <br />
            <button type="submit">Submit</button>
          </form>
        );
      }}
    </Mutation>
  );
};

export default Comment;
