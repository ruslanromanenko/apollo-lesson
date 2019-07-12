import React from "react";
import { Mutation, Query } from "react-apollo";
import classes from "./UpdateComment.module.css";
import {
  DELETE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION
} from "../../graphql/mutations";
import { getQueryComment } from "../../graphql/quearies";

const UpdateComments = props => (
  <Query query={getQueryComment(props.match.params.commentId)}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <React.Fragment>
          <Mutation mutation={UPDATE_COMMENT_MUTATION}>
            {(updateComment, params) => {
              if (params.loading) return <p>Loading...</p>;
              if (params.error) return <p>Error :(</p>;
              let text;
              console.log(params);
              return (
                <form
                  className={classes.UserData}
                  onSubmit={e => {
                    e.preventDefault();
                    updateComment({
                      variables: {
                        id: props.match.params.commentId,
                        text: text.value
                      }
                    });
                  }}
                >
                  <label htmlFor="">
                    <textarea
                      type="text"
                      ref={node => (text = node)}
                      defaultValue={data.Comment.text}
                    />
                  </label>
                  <br />
                  <button type="submit">Submit</button>
                </form>
              );
            }}
          </Mutation>
          <Mutation
            mutation={DELETE_COMMENT_MUTATION}
            onCompleted={data => {
              console.log(data);
              // props.history.push(`/user-data/${userId}`);
            }}
          >
            {(deleteComment, { loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return (
                <button
                  onClick={evt => {
                    evt.preventDefault();
                    deleteComment({
                      variables: {
                        id: props.match.params.commentId
                      }
                    });
                  }}
                >
                  delete
                </button>
              );
            }}
          </Mutation>
        </React.Fragment>
      );
    }}
  </Query>
);

export default UpdateComments;
