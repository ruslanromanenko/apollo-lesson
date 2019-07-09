import React from "react";
import { Mutation } from "react-apollo";
import classes from "./SigninUser.module.css";
import { SIGNIN_USER_MUTATION } from "../../graphql/mutations";

const SigninUser = props => (
  <Mutation mutation={SIGNIN_USER_MUTATION}>
    {(signinUser, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      let email, password;
      console.log(data);
      return (
        <form
          className={classes.SigninUser}
          onSubmit={e => {
            e.preventDefault();
            signinUser({
              variables: {
                email: {
                  email: email.value,
                  password: password.value
                }
              }
            });
          }}
        >
          <label htmlFor="">
            <span>{<b>Email</b>}</span>
            <input type="email" ref={node => (email = node)} />
          </label>
          <br />{" "}
          <label htmlFor="">
            <span>{<b>Password</b>}</span>
            <input type="password" ref={node => (password = node)} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      );
    }}
  </Mutation>
);

export default SigninUser;
