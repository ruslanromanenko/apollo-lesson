import React from "react";
import { getToken } from "../../services/sessionStorage";
import { Link } from "react-router-dom";

const RenderProperties = ({ isSignIn = true, children }) => {
  return (
    <React.Fragment>
      {getToken()
        ? children
        : isSignIn && (
            <React.Fragment>
              <Link to="/sign-in"> Sign In </Link>&nbsp;
              <Link to="/newUser"> Create User </Link>
            </React.Fragment>
          )}
    </React.Fragment>
  );
};
export default RenderProperties;
