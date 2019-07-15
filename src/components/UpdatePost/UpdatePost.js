import React from "react";
import { Mutation, Query } from "react-apollo";
import classes from "./UpdatePost.module.css";
import { UPDATE_POST_MUTATION } from "../../graphql/mutations";
import { getQueryPost } from "../../graphql/quearies";

const UpdatePost = props => (
  <Query query={getQueryPost(props.match.params.postId)}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <Mutation mutation={UPDATE_POST_MUTATION}>
          {(updatePost, params) => {
            if (params.loading) return <p>Loading...</p>;
            if (params.error) return <p>Error :(</p>;
            let title, text;
            return (
              <form
                className={classes.UserData}
                onSubmit={e => {
                  e.preventDefault();
                  updatePost({
                    variables: {
                      id: props.match.params.postId,
                      text: text.value,
                      title: title.value
                    }
                  });
                }}
              >
                <label htmlFor="">
                  <span>Title</span>
                  <input
                    type="text"
                    ref={node => (title = node)}
                    defaultValue={data.Post.title}
                  />
                </label>
                <br />
                <label htmlFor="">
                  <span>Text</span>
                  <textarea
                    ref={node => (text = node)}
                    defaultValue={data.Post.text}
                  />
                </label>
                <br />
                <button type="submit">Submit</button>
              </form>
            );
          }}
        </Mutation>
      );
    }}
  </Query>
);

export default UpdatePost;
