import React from "react";
import { Mutation } from "react-apollo";
import classes from "./SigninUser.module.css";
import { SIGNIN_USER_MUTATION } from "../../graphql/mutations";
import { getToken } from "../../services/token";
import { Link } from "react-router-dom";

class SigninUser extends React.Component {
  render() {
    return (
      <Mutation mutation={SIGNIN_USER_MUTATION}>
        {(signinUser, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;

          let email, password;
          return getToken() ? (
            <Link to="/sign-out"> Sign Out </Link>
          ) : (
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
                }).then(({ data }) => {
                  sessionStorage.setItem("token", data.signinUser.token);
                  this.props.history.push("/");
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
              {error && (
                <p style={{ color: "red" }}>
                  No user found with that information!!!
                </p>
              )}
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default SigninUser;
