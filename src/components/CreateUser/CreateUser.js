import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_USER_MUTATION } from "../../graphql/mutations";
import classes from "./CreateUser.module.css";

const CreateUser = props => (
  <Mutation mutation={CREATE_USER_MUTATION}>
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
          className={classes.CreateUserForm}
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
