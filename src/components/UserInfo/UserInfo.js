import React from "react";
import { Query } from "react-apollo";
import { getQueryUserData } from "../../graphql/quearies";
import { Link } from "react-router-dom";

const UserInfo = ({ userId }) => (
  <Query query={getQueryUserData(userId)}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div>
          <span>
            <b>Name:</b> {data.User.name}
          </span>
          <br />
          <span>
            <b>Email:</b> {data.User.email}
          </span>
          <br />
          <Link to={`/user/${data.User.id}/new-post`}>Add post</Link> &nbsp;
        </div>
      );
    }}
  </Query>
);

export default UserInfo;
