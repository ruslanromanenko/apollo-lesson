import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import classes from "./UserData.module.css";
import { UPDATE_USER_MUTATION } from "../../graphql/mutations";

const UserData = props => (
  <Query
    query={gql`
      query {
        User(id: "${props.match.params.userId}") {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <Mutation mutation={UPDATE_USER_MUTATION}>
          {(updateUser, params) => {
            if (params.loading) return <p>Loading...</p>;
            if (params.error) return <p>Error :(</p>;
            let name;
            return (
              <form
                className={classes.UserData}
                onSubmit={e => {
                  e.preventDefault();
                  updateUser({
                    variables: {
                      id: props.match.params.userId,
                      name: name.value
                    }
                  });
                }}
              >
                <label htmlFor="">
                  <span>
                    <b>Name:</b> {data.User.name} &nbsp;
                  </span>
                  <input
                    type="text"
                    placeholder={data.User.name}
                    ref={node => (name = node)}
                    defaultValue={data.User.name}
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

export default UserData;
