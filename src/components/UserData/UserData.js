import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import classes from "./UserData.module.css";

const UserData = props => (
  <Query
    query={gql`
      query {
        User(id: "${props.match.params.userId}") {
          id
          name
          email
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div className={classes.UserData}>
          <span>
            <b>User name:</b> {data.User.name}
          </span>
          <br />
          <span>
            <b>User email:</b> {data.User.email}
          </span>
        </div>
      );
    }}
  </Query>
);

export default UserData;
