import React from "react";
import { Mutation } from "react-apollo";
import classes from "./CreateComment.module.css";
import { CREATE_COMMENT_MUTATION } from "../../graphql/mutations";
import { getUserId } from "../../services/sessionStorage";
import { getQueryCommentsPost } from "../../graphql/quearies";

const CreateComment = ({ postId }) => {
  return (
    <Mutation
      mutation={CREATE_COMMENT_MUTATION}
      update={(cache, { data: { createComment } }) => {
        const { allComments } = cache.readQuery({
          query: getQueryCommentsPost(postId)
        });
        cache.writeQuery({
          query: getQueryCommentsPost(postId),
          data: {
            allComments: [...allComments, createComment]
          }
        });
      }}
    >
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

export default CreateComment;
