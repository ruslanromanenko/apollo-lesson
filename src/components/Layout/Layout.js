import React from "react";
import { Link } from "react-router-dom";
import classes from "./Layout.module.css";

const Layout = ({ children }) => (
  <React.Fragment>
    <header>
      <nav>
        <Link to="/">All Users</Link> | <Link to="/top-posts">Top Posts</Link>
        |&nbsp;
        <Link to="/all-posts">All Posts</Link> |&nbsp;
        <Link to="/create-user">Create User</Link> |&nbsp;
        <Link to="/sign-in">Sign In</Link> |&nbsp;
        <Link to="/sign-out">Sign Out</Link>
      </nav>
    </header>
    <main>{children}</main>
    <footer>Footer</footer>
  </React.Fragment>
);

export default Layout;
