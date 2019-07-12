import React from "react";
import { Mutation, Query } from "react-apollo";
import { getQueryPost } from "../../graphql/quearies";
import classes from "./Post.module.css";

import { DELETE_POST_MUTATION } from "../../graphql/mutations";

const Coment = props => {
  return (
    <Query
      query={getQueryPost(props.match.params.postId)}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
          <React.Fragment>
            {data.Post === null ? (
              <span>Post not found!</span>
            ) : (
              <React.Fragment>
                <ul>
                  <li>
                    <b>Title:&nbsp;</b> {data.Post.title}
                  </li>
                  <li>
                    <b>Text:&nbsp;</b>
                    {data.Post.text}
                  </li>
                  {data.Post.user !== null && (
                    <li>
                      <b>Author:&nbsp;</b>
                      {data.Post.user.name}
                    </li>
                  )}
                </ul>
                <Mutation
                  mutation={DELETE_POST_MUTATION}
                  onCompleted={() => {
                    props.history.push("/all-posts");
                  }}
                >
                  {(deletePost, { loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                      <button
                        onClick={evt => {
                          evt.preventDefault();
                          deletePost({
                            variables: {
                              id: props.match.params.postId
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
            )}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Coment;
