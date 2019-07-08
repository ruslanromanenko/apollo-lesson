import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_USER_MUTATION } from "../graphql/mutations";
import { QUERY_USERS } from "../graphql/quearies";

const CreateUser = props => (
  <Mutation
    mutation={CREATE_USER_MUTATION}
    update={(cache, { data }) => {
      console.log(data.createUser);
      try {
        const { allUsers } = cache.readQuery({
          query: QUERY_USERS
        });
        cache.writeQuery({
          query: QUERY_USERS,
          data: {
            allUsers: allUsers.push(data.createUser)
          }
        });
      } catch (e) {
        cache.writeQuery({
          query: QUERY_USERS,
          data: {
            allUsers: [data.createUser]
          }
        });
      }
    }}
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
