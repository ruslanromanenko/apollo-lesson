import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CreateUser = props => (
  <Mutation
    mutation={gql`
      mutation createUser(
        $name: String!
        $authProvider: AuthProviderSignupData!
      ) {
        createUser(name: $name, authProvider: $authProvider) {
          id
          name
          email
        }
      }
    `}
  >
    {(createUser, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      let name, email, password;

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            createUser({
              variables: {
                authProvider: {
                  email: {
                    email: email.value,
                    password: password.value
                  }
                },
                name: name.value
              }
            });
          }}
        >
          <label>
            Name
            <input type="text" ref={node => (name = node)} />
          </label>
          <label>
            Email
            <input type="email" ref={node => (email = node)} />
          </label>
          <label>
            Password
            <input type="password" ref={node => (password = node)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      );
    }}
  </Mutation>
);

export default CreateUser;
