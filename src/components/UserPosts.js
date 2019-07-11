import React from "react";
import { Query } from "react-apollo";
import { getQueryUserPosts } from "../graphql/quearies";

const UserPosts = props => (
  <Query query={getQueryUserPosts(props.match.params.userId)}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <React.Fragment>
          User: {data.User.name}
          <ul key="user">
            {data.User.posts.map(({ id, title, text }) => (
              <li key={id}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    }}
  </Query>
);

export default UserPosts;
