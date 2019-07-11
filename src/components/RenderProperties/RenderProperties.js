import React from "react";
import { getToken } from "../../services/token";
import { Link } from "react-router-dom";

const RenderProperties = ({ children }) => (
  <React.Fragment>
    {getToken() ? (
      children
    ) : (
      <React.Fragment>
        <Link to="/sign-in"> Sign In </Link>&nbsp;
        <Link to="/newUser"> Create User </Link>
      </React.Fragment>
    )}
  </React.Fragment>
);
export default RenderProperties;
