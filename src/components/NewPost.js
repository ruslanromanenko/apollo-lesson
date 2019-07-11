import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_POST_MUTATION } from "../graphql/mutations";

const NewPost = props => (
  <Mutation mutation={CREATE_POST_MUTATION}>
    {(createPost, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      let userId, title, text;

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            createPost({
              variables: {
                userId: userId.value,
                title: title.value,
                text: text.value
              }
            });
          }}
        >
          <input
            type="hidden"
            value={props.match.params.userId}
            ref={node => (userId = node)}
          />
          <label>
            Title
            <input type="text" ref={node => (title = node)} />
          </label>
          <label>
            Text
            <textarea ref={node => (text = node)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      );
    }}
  </Mutation>
);

export default NewPost;
