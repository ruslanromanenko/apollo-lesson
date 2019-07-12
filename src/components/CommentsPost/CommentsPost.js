import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { getQueryCommentsPost } from "../../graphql/quearies";

const CommentsPost = ({ postId }) => (
  <Query query={getQueryCommentsPost(postId)} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <ul key="topPosts">
          {data.allComments.map(({ id, text, user }) => (
            <li key={id}>
              <Link to={`/comment/${id}`}>
                {user ? `${user.name}` : "incognito"}, {text ? text : "***"}
              </Link>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default CommentsPost;
