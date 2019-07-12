import React from "react";
import { Mutation, Query } from "react-apollo";
import { getQueryPost } from "../../graphql/quearies";
import classes from "./Post.module.css";

import { DELETE_POST_MUTATION } from "../../graphql/mutations";
import RenderProperties from "../RenderProperties/RenderProperties";
import CreateComment from "../CreateComment/CreateComment";
import CommentsPost from "../CommentsPost/CommentsPost";

const Post = props => {
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
              <div className={classes.Post}>
                <h3>Post</h3>
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
                <RenderProperties isSignIn={false}>
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
                </RenderProperties>

                <div>
                  <h3>Comments</h3>
                  <CommentsPost postId={props.match.params.postId} />
                </div>

                <RenderProperties isSignIn={false}>
                  <CreateComment postId={props.match.params.postId} />
                </RenderProperties>
              </div>
            )}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Post;
