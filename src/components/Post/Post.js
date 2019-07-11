import React from "react";
import { Query } from "react-apollo";
import { getQueryPost } from "../../graphql/quearies";
import classes from "./Post.module.css";

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
        );
      }}
    </Query>
  );
};

export default Post;
