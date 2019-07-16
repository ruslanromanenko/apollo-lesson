import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { getQueryPostsUser } from "../../graphql/quearies";

const PostsUser = ({ userId }) => (
  <Query query={getQueryPostsUser(userId)} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <ul key="topPosts">
          {data.allPosts.map(({ id, text, user }) => (
            <li key={id}>
              <Link to={`/update-post/${id}`}>{text ? text : "***"}</Link>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);
export default PostsUser;
