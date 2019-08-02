import React from "react";
import { Mutation } from "react-apollo";
import classes from "./CreateFile.module.css";
import { CREATE_FILE_MUTATION } from "../../graphql/mutations";
import { getUserId } from "../../services/sessionStorage";
import { getQueryCommentsPost } from "../../graphql/quearies";

const CreateFile = ({ postId }) => {
  return (
    <Mutation
      mutation={CREATE_FILE_MUTATION}
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
        let file;
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              createComment({
                variables: {
                  userId: getUserId(),
                  postId: postId,
                  text: file.value
                }
              });
            }}
            className={classes.CreateComment}
          >
            <label htmlFor="fileId">Chose file</label>
            <input type="file" id="fileId" ref={node => (file = node)} />
            <br />
          </form>
        );
      }}
    </Mutation>
  );
};

export default CreateFile;
