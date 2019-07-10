import React from "react";
import { Link } from "react-router-dom";
import classes from "./Layout.module.css";

const Layout = ({ children }) => (
  <React.Fragment>
    <header>
      <nav>
        <Link to="/"> Home </Link>|<Link to="/posts"> Posts </Link>|
        <Link to="/newUser"> Create User </Link>|
        <Link to="/sign-in"> Sign In </Link>|
        <Link to="/sign-out"> Sign Out </Link>|
      </nav>
    </header>
    <main>{children}</main>
    <footer>Footer</footer>
  </React.Fragment>
);

export default Layout;
